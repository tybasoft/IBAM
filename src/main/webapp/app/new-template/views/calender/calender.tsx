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
import { getEntity, updateEntity,getEntities, createEntity, reset } from '../../../entities/planification/planification.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { IPlanification } from 'app/shared/model/planification.model';
import { mapIdList } from 'app/shared/util/entity-utils';
import Select from 'react-select';

import { handleAddEvent } from '../../redux/actions/calenderAction/calenderAction';

ReactBigCalender.momentLocalizer(moment);
const allViews = Object.keys(ReactBigCalender.Views).map(k => ReactBigCalender.Views[k]);
interface IState {
  playOrPause?: string;
}
var employeOptions=[];

class Calender extends Component<any, any> {
  
 constructor(props) {
super(props)
const { planificationEntity, employes, loading, updating } = props;

this.state = {
  modal: false,
  debut: null,
  fin: null,
  nom: "ma tache",
  description: "description de tache",
  start: new Date(),
  end: new Date(),
  eventTitle: 'Enter Your Title',
  events: [],
  isNew: !props.match.params || !props.match.params.id,
  employes:[]
};
}
 loadEmployes = async () =>{
  var employePaload = await getEmployes().payload;
  employePaload.data.map((employe) => {
  employeOptions.push({'value':employe,'label':employe.nom})
});
}
componentDidMount = async () => {
  this.loadEmployes();
  const payload = await getEntities().payload;
  payload.data.map((item)=>{
    let new_item = {
      title: item.nom_tache,
      start: item.date_debut,
      end: item.date_fin,
      allDay: true
    }
    let param = {
      eventTitle: item.nom_tache,
      start: item.date_debut,
      end: item.date_fin
        }
    this.state.events.push(new_item)
    handleAddEvent(param, this.state.events);

  })



}

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
    this.setState(prevState => ({
      start: date._d
    }));
     this.state.debut = convertDateTimeToServer(document.getElementById("date_debut").value);
  };

  handleEndDateTimeChange = date => {
    this.setState(prevState => ({
      end: date._d
    }));
     this.state.fin = convertDateTimeToServer(document.getElementById("date_fin").value);

  };
  handleEmployeChange = emp => {
    let employe_list=[];
    emp.map((item)=>{
      employe_list.push(item.value);

    })
    this.state.employes = employe_list;
    console.log(this.state.employes)


  }

  handleSubmit = () => {
    const { handleAddEvent } = this.props;
   //const debut = convertDateTimeToServer(document.getElementById("date_debut"));
    //const fin = convertDateTimeToServer(document.getElementById("date_fin"));
    this.state.nom = document.getElementById("nom_tache").value;
    this.state.description = document.getElementById("description_tache").value;
    console.log(this.state.events)
     const entity: IPlanification= {
      date_debut:this.state.debut,
      date_fin:this.state.fin,
      nom_tache:this.state.nom,
      description_tache:this.state.description,
      employes:this.state.employes

    };
    createEntity(entity);
    let param = {
      start: this.state.debut,
      eventTitle:this.state.nom,
      end: this.state.fin
      
    };
     console.log(this.state.events);
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
        //handleAddEvent(param, events);
      }
    );
    this.toggleModal();
  };

  handleSlotSelect = slotInfo => {
    this.toggleModal();
    this.setState(prevState => ({
      start: slotInfo.start,
      end: slotInfo.end,
      eventTitle: 'Enter Your Title'
    }));
  };

  render() {
    const { calender } = this.props;
    const { modal, eventTitle, start, end } = this.state;


    return (
      <Fragment>
        <Modal isOpen={modal} toggle={this.toggleModal}>
        <form className="form-group">

          <ModalBody>


            <label>Nom de la tache</label>
            <Input value={eventTitle} id="nom_tache" onChange={this.handleChange} />

            <div>
                <label>Description tache</label>
                <textarea className="form-control" id="description_tache" ></textarea>
              </div>
              <div>
                <label>Date debut</label>
                <input className="form-control" id="date_debut" type="datetime-local" onChange={this.handleStartDateTimeChange} defaultValue={calender.startDate} value={start} />
              </div>
              <div>
                <label>Date de fin</label>
                <input className="form-control" id="date_fin" type="datetime-local" onChange={this.handleEndDateTimeChange} defaultValue={calender.startDate} value={end} />
              </div>
              <div>
              <label for="mail">Employe concerné</label>
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
                events={calender.events}
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

const mapStateToProps = state => ({
  calender: state.calender
});
const mapDispatchToProps = {
  getEmployes,
  getEntity,
  updateEntity,
};

export default connect(mapStateToProps, { handleAddEvent })(Calender);
