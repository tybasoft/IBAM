/* eslint-disable */
// import external modules
import React, { Fragment, Component } from 'react';
import { Row, Col, Modal, ModalBody, ModalFooter, Button, Input, Card, CardBody } from 'reactstrap';
import ReactBigCalender from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import {
  getEntity,
  updateEntity,
  getEmployeTasks,
  getEntities,
  createEntity,
  reset
} from '../../../entities/planification/planification.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { IPlanification } from 'app/shared/model/planification.model';
import { getEntities as getProjectEntities } from '../../../entities/projet/projet.reducer';

import { mapIdList } from 'app/shared/util/entity-utils';
import Select from 'react-select';

import { handleAddEvent } from '../../redux/actions/calenderAction/calenderAction';
import { IRootState } from 'app/shared/reducers';

ReactBigCalender.momentLocalizer(moment);
const allViews = Object.keys(ReactBigCalender.Views).map(k => ReactBigCalender.Views[k]);
interface IState {
  playOrPause?: string;
}
var employeOptions = [];

class Calender extends Component<any, any> {
  constructor(props) {
    super(props);
    const { planificationEntity, employesList, loading, updating } = props;
    this.props.getEmployes();

    this.state = {
      modal: false,
      debut: null,
      fin: null,
      availability: 0,
      nom: 'ma tache',
      description: 'description de tache',
      start: new Date(),
      end: new Date(),
      eventTitle: 'Enter Your Title',
      events: [],
      isNew: !props.match.params || !props.match.params.id,
      employes: []
    };
  }
  loadEmployes = async () => {
    var employePaload = this.props.employesList;
    employePaload.data.map(employe => {
      employeOptions.push({ value: employe, label: employe.nom });
    });
  };
  componentDidMount = async () => {
    this.loadEmployes();
    const payload = this.props.employesList;
    payload.data.map(item => {
      let new_item = {
        title: item.nom_tache,
        start: item.date_debut,
        end: item.date_fin,
        allDay: true
      };
      let param = {
        eventTitle: item.nom_tache,
        start: item.date_debut,
        end: item.date_fin
      };
      this.state.events.push(new_item);
      handleAddEvent(param, this.state.events);
    });
  };

  toggleModal = () => {
    this.setState((prevState: any) => ({
      modal: !prevState.modal
    }));
  };

  handleChange = e => {
    this.setState({
      eventTitle: e.target.value
    });
  };

  handleStartDateTimeChange = date => {
    this.setState({
      ...this.state,
      start: date._d,
      debut: convertDateTimeToServer((document.getElementById('date_debut') as HTMLInputElement).value)
    });
    // this.state.debut = convertDateTimeToServer(document.getElementById('date_debut').value);
  };

  handleEndDateTimeChange = date => {
    this.setState({
      ...this.state,
      end: date._d,
      fin: convertDateTimeToServer((document.getElementById('date_fin') as HTMLInputElement).value)
    });
  };
  handleEmployeChange = emp => {
    let score = 0;
    this.availability = 0;
    let employe_list = [];

    emp.map(async (item, index) => {
      employe_list.push(item.value);
      const employe_task = await getEmployeTasks(item.value.id);

      for (const task of employe_task.data) {
        if (
          this.checkAvailability(
            task.date_debut,
            task.date_fin,
            (document.getElementById('date_debut') as HTMLInputElement).value,
            (document.getElementById('date_fin') as HTMLInputElement).value
          ) > 0
        ) {
          score = 1;
          document.getElementById('availability').className = 'text-danger';
          document.getElementById('availability').textContent =
            "L'employe " +
            item.value.nom +
            "n'est pas disponible pour la date sélectionné, si vous souhaitez, vous pouvez le sélectionner comme même.";
          break;
        }
      }
    });
    this.setState({ ...this.state, employes: employe_list });
    // this.state.employes = employe_list;

    if (score == 0) {
      document.getElementById('availability').className = 'invisible';
    }
  };

  handleSubmit = () => {
    const { handleAddEvent } = this.props;
    //const debut = convertDateTimeToServer(document.getElementById("date_debut"));
    //const fin = convertDateTimeToServer(document.getElementById("date_fin"));
    this.setState({
      ...this.state,
      nom: (document.getElementById('nom_tache') as HTMLInputElement).value,
      description: (document.getElementById('description_tache') as HTMLInputElement).value
    });
    // this.state.nom = document.getElementById('nom_tache').value;
    console.log(this.state.events);
    const entity: IPlanification = {
      date_debut: this.state.debut,
      date_fin: this.state.fin,
      nom_tache: this.state.nom,
      description_tache: this.state.description,
      employes: this.state.employes
    };
    createEntity(entity);
    let param = {
      start: this.state.debut,
      eventTitle: this.state.nom,
      end: this.state.fin
    };
    handleAddEvent(param, this.state.events);
    console.log(this.state.events);

    this.setState(
      prevState => {
        const { start, eventTitle, end, events } = this.state;
        return {
          events: [
            ...events,
            {
              title: this.state.nom,
              allDay: true,
              start: this.state.debut,
              end: this.state.fin
            }
          ]
        };
      },
      () => {
        const { start, end, eventTitle, events } = this.state;
        let param = {
          start,
          eventTitle,
          end
        };
        handleAddEvent(param, events);
      }
    );
    this.toggleModal();
  };

  handleSlotSelect = slotInfo => {
    console.log('slot info');
    this.toggleModal();
    this.setState(prevState => ({
      start: slotInfo.start,
      end: slotInfo.end,
      eventTitle: 'Enter Your Title'
    }));
  };
  condition_for_end = false;
  condition_for_start = false;
  availability = 0;
  checkAvailability = (date_debut_tache_x, date_fin_tache_x, date_debut_selectionne, date_fin_selectionne) => {
    this.condition_for_start = date_debut_selectionne >= date_debut_tache_x && date_debut_selectionne <= date_fin_tache_x;
    this.condition_for_end = date_fin_selectionne >= date_debut_tache_x && date_debut_selectionne <= date_fin_tache_x;

    if (this.condition_for_start || this.condition_for_end) {
      return (this.availability += 1);
    }
  };

  async render() {
    const { calender } = this.props;
    const { modal, eventTitle, start, end } = this.state;
    //  var projects = await getProjectEntities().payload;

    return (
      <Fragment>
        <Modal isOpen={modal} toggle={this.toggleModal}>
          <form className="form-group">
            <ModalBody>
              <label>Nom de la tache</label>
              <Input value={eventTitle} id="nom_tache" onChange={this.handleChange} />

              <div>
                <label>Description tache</label>
                <textarea className="form-control" id="description_tache"></textarea>
              </div>
              <div>
                <label>Date debut</label>
                <input
                  className="form-control"
                  id="date_debut"
                  type="datetime-local"
                  onChange={this.handleStartDateTimeChange}
                  defaultValue={calender.startDate}
                  value={start}
                />
              </div>
              <div>
                <label>Date de fin</label>
                <input
                  className="form-control"
                  id="date_fin"
                  type="datetime-local"
                  onChange={this.handleEndDateTimeChange}
                  defaultValue={calender.startDate}
                  value={end}
                />
              </div>
              <div>
                <label>Projet concérné</label>
                <select id="projet" className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                <label htmlFor="mail">Employe concerné</label>
                <Select
                  id="mail_array"
                  // defaultValue={emailOptions[0]}
                  isMulti
                  name="colors"
                  options={employeOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.handleEmployeChange}
                />
                <span className="invisible" id="availability">
                  L'employe n'est pas valable
                </span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModal}>
                Cancel
              </Button>
              <Button color="success" onClick={this.handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        <Row>
          <Col xs="12">
            <div className="content-header">Calendar</div>
            <p className="content-sub-header">
              <a href="https://github.com/intljusticemission/react-big-calendar" target="_blank" rel="noopener noreferrer">
                React Big Calendar
              </a>{' '}
              is gcal/outlook like calendar component. This is the most advanced example having various features. This example lists all the
              events on the calendar with Add new event functionality.
              <a href="https://github.com/intljusticemission/react-big-calendar" target="_blank" rel="noopener noreferrer">
                <img src="https://img.shields.io/github/stars/intljusticemission/react-big-calendar.svg?style=social" alt="Stars" />
                <img src="https://img.shields.io/npm/dm/react-big-calendar.svg" alt="Downloads" />
              </a>
            </p>
          </Col>
        </Row>

        <Card>
          <CardBody>
            <div style={{ height: 700 }}>
              <ReactBigCalender
                events={this.state.events}
                views={allViews}
                step={60}
                defaultDate={new Date()}
                selectable={true}
                onSelectSlot={this.handleSlotSelect}
              />
            </div>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  calender: state.calender,
  employesList: state.employe
});
const mapDispatchToProps = {
  getEmployes,
  getEntity,
  updateEntity
};

export default connect(mapStateToProps, { handleAddEvent, getEmployes })(Calender);
