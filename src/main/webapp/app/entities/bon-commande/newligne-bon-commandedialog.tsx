import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Link, RouteComponentProps, Redirect} from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {Translate, ICrudGetAction, ICrudDeleteAction, translate} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Label,Table } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { useHistory } from 'react-router-dom';



import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { IRootState } from 'app/shared/reducers';
import {getEntity, deleteEntity, updateEntity, createEntity, reset} from './bon-commande.reducer';
import {getEntities as getDepots} from "app/entities/depot/depot.reducer";
import {getEntities as getFournisseurs} from "app/entities/fournisseur/fournisseur.reducer";
import {getEntities as getMateriau} from "app/entities/materiau/materiau.reducer";
import {getEntities as getProjects} from "app/entities/projet/projet.reducer";
import {getEntities as getMateriels} from "app/entities/materiel/materiel.reducer";
import {getEntitiesById as getLigneBonCommande} from "app/entities/ligne-bon-commande/ligne-bon-commande.reducer";
import {getEntity as getOneMateriel} from "app/entities/materiel/materiel.reducer";
import {getEntity as getOneMateriau} from "app/entities/materiau/materiau.reducer";
import {ModalContent} from "semantic-ui-react";
import LigneBonCommande from "app/entities/ligne-bon-commande/ligne-bon-commande";
import LigneBonCommandeComponentsPage
  from "../../../../../test/javascript/e2e/entities/ligne-bon-commande/ligne-bon-commande.page-object";
import {ILigneBonCommande} from "app/shared/model/ligne-bon-commande.model";
import materiel from "app/entities/materiel/materiel";
import materiau from "app/entities/materiau/materiau";
import value from "*.json";

export interface IBonCommandeDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewLigneBonCommandeDialog = (props: IBonCommandeDeleteDialogProps) => {
  const [depotId, setDepotId] = useState('0');
  const [materielObj, setMaterielObj] = useState({id: "1"});
  const [materiauObj, setMateriauObj] = useState({id: "1"});
  const [newLines, setNewLines] = useState([]);

  // let [isOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [bigmodal, setBigModal] = useState(true);
  const history = useHistory();


  const tab = [
    { materiau: 'mat 1', quantity: 212 },
    {  materiau: 'mat 2', quantity: 150 }];

  // let ligne = new LigneBonCommande();



  const [fournisseurId, setFournisseurId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  useEffect(() => {
    // props.getEntity(props.match.params.id);
  }, []);




  const state = {
    tasks: []
  }

  const addTask = (task) => {
    const tasks = [...this.state.tasks];
    this.setState({tasks: this.state.tasks.concat(task)});
  }


  const handleClose = () => {
    setModal(false);

    // props.history.push('/bon-commande' + props.location.search);
  };
  const handleShow = () => {
    // isOpen=true;
    setModal(true);
    console.warn("Clicked on handleShow : "+modal)

  };

  const handleCloseBig = () => {
    setBigModal(false);

    // props.history.push('/bon-commande' + props.location.search);
  };
  const handleShowBig = () => {
    // isOpen=true;
    setBigModal(true);
    console.warn("Clicked on handleShow : "+modal)

  };


  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
      // const lines = getLigneBonCommande(props.match.params.id);
      // console.warn(lines);
      // newLines.push(props.getLigneBonCommande(props.match.params.id));
      props.getLigneBonCommande(props.match.params.id);
      // setNewLines(getLigneBonCommande(props.match.params.id));

    }

    props.getDepots();
    props.getFournisseurs();
    props.getMateriau();
    props.getMateriels();
    props.getProjects();

    // console.warn("TESTTTST");
    // console.warn(ligneBonCommandeList1);
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmAdd = () => {
    props.deleteEntity(props.bonCommandeEntity.id);
  };

  const saveEntity = (event, errors, values) => {
    values.ligneBonComs=newLines;
    if (errors.length === 0) {
      const entity = {
        ...bonCommandeEntity,
        ...values
      };
      console.warn(values);
      values.ligneBonComs = newLines;

      if (isNew) {
        props.createEntity(entity);
        // window.history.go("/");
        // this.history.pushState(null, 'bon-commande');
          handleCloseBig();

        history.push("/bon-commande");
      } else {
        props.updateEntity(entity);
        // window.history.back();
        handleCloseBig();
        history.push("/bon-commande");
        window.location.reload(false);


      }

    }

  };
  // const deleteMateriau = (data,number) => {
  //   console.warn("Delete Materiau : " + data + " and number :"+number);
  //   // newLines.splice(data);
  //   console.warn(newLines);
  // };

  const saveMateriau = (event, errors, values) => {
    console.warn("Add to table Materiau");
    if (errors.length === 0) {
      const entity = {
        // ...bonCommandeEntity,
        ...ligneBonComs,
        ...values
      };
      newLines.push({materiel:{id:values.materiel} ,materiau:{id:values.materiau},quantite:values.quantity});
      console.warn(newLines);
      setModal(false);
    }
  };


  // const toggle = () => setModal(!modal);
  const {ligneBonCommandeList,materiels,ligneBonComs,ligneBonCom,bonCommandeEntity,projets, materiaus ,depots, fournisseurs, loading, updating } = props;

  return (
    <div>

      <Modal size="lg" style={{maxWidth: '900px', width: '100%'}}  isOpen={bigmodal} toggle={handleClose} >

        <ModalHeader toggle={handleClose} >
          <Translate contentKey="ibamApp.bonCommande.home.createOrEditLabelLigne">Create or edit a BonCommande</Translate>
        </ModalHeader>
        <div>
          {/*<Row className="justify-content-center">
            <Col md="8">
              <h2 id="ibamApp.bonCommande.home.createOrEditLabel">
                <Translate contentKey="ibamApp.bonCommande.home.createOrEditLabel">Create or edit a BonCommande</Translate>
              </h2>
            </Col>
          </Row>*/}
          <Row  className="justify-content-center">
            <Col md="11">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={isNew ? {} : bonCommandeEntity} onSubmit={saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="bon-commande-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="bon-commande-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <ModalBody id="ibamApp.bonCommande.delete.question">
                    <AvGroup>
                      <Label id="dateCreationLabel" for="bon-commande-dateCreation">
                        <Translate contentKey="ibamApp.bonCommande.dateCreation">Date Creation</Translate>
                      </Label>
                      <AvField
                        id="bon-commande-dateCreation"
                        type="date"
                        className="form-control"
                        name="dateCreation"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') }
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label id="datePrevLivLabel" for="bon-commande-datePrevLiv">
                        <Translate contentKey="ibamApp.bonCommande.datePrevLiv">Date Prev Liv</Translate>
                      </Label>
                      <AvField id="bon-commande-datePrevLiv" type="date" className="form-control" name="datePrevLiv" />
                    </AvGroup>
                    <AvGroup>
                      <Label for="bon-commande-projet">
                        <Translate contentKey="ibamApp.bonCommande.project">projet</Translate>
                      </Label>
                      <AvInput id="bon-commande-projet" type="select" className="form-control" name="projet.id">
                        <option value="" key="0" />
                        {projets
                          ? projets.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.libelle}
                            </option>
                          ))
                          : null}
                      </AvInput>
                    </AvGroup>

                    <AvGroup>
                      <Label for="bon-commande-fournisseur">
                        <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate>
                      </Label>
                      <AvInput id="bon-commande-fournisseur" type="select" className="form-control" name="fournisseur.id">
                        <option value="" key="0" />
                        {fournisseurs
                          ? fournisseurs.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.nomCommercial}
                            </option>
                          ))
                          : null}
                      </AvInput>
                    </AvGroup>
                    <AvGroup check>
                      <Label id="valideLabel">
                        <AvInput id="bon-commande-valide" type="checkbox" className="form-check-input" name="valide" />
                        <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate>
                      </Label>
                    </AvGroup>
                    <AvGroup>
                      <Label id="remarquesLabel" for="bon-commande-remarques">
                        <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate>
                      </Label>
                      <AvField id="bon-commande-remarques" type="text" name="remarques" />
                    </AvGroup>

                    <Button
                      tag={Link}
                      color="primary"
                      size="sm"
                      onClick={handleShow}
                    >
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="ibamApp.bonCommande.newline">add</Translate>
                        </span>
                    </Button>
                    <Table responsive>
                      <thead>
                      <tr>
                        {/* <th className="hand" >
                          <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                        </th>*/}
                        <th className="hand">
                          <Translate contentKey="ibamApp.ligneBonCommande.quantite">Quantite</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonCommande.materiausAndMateriels">Materiaus/Materiels</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                      </thead>
                      <tbody>
                      {ligneBonCommandeList.map((data, i) => (
                        <tr key={`entity-${i}`}>
                          {/*<td>
                            <Button tag={Link}  color="link" size="sm">
                              {data.id}
                            </Button>
                          </td>*/}
                          <td>{data.quantite}</td>
                          <td>
                            {data.materiel.libelle} {data.materiau.libelle}
                          </td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">
                              {/*<Button
                                tag={Link}
                                color="primary"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                              </Button>*/}
                              <Button
                                tag={Link}
                                color="danger"
                                size="sm"

                              >
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </Table>
                  </ModalBody>
                  <ModalFooter>
                    <Button tag={Link} id="cancel-save" to="/bon-commande" replace color="info">
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                    </Button>
                    &nbsp;
                    <Button   color="primary" id="save-entity"  type="submit"  >
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
                  </ModalFooter>
                </AvForm>
              )}

            </Col>
          </Row>
        </div>
        {/*<ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button color="primary" id="save-entity" type="submit" disabled={saveEntity}>
          <FontAwesomeIcon icon="save" />
          &nbsp;
          <Translate contentKey="entity.action.save">Save</Translate>
        </Button>
        <Button id="jhi-confirm-delete-bonCommande" color="primary" onClick={confirmAdd()}>
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ibamApp.bonCommande.add">Create</Translate>
        </Button>
      </ModalFooter>*/}
      </Modal>

      {/******************************** Second Modal ********************************/}

      <Modal isOpen={modal} toggle={handleShow}>
        <ModalHeader>
          <Translate contentKey="ibamApp.bonCommande.home.createOrEditLabelLigne">Add</Translate>
        </ModalHeader>
        <AvForm onSubmit={saveMateriau}>
          <ModalBody id="ibamApp.bonCommande.delete.question">
            {!isNew ? (
              <AvGroup>
                <Label for="bon-commande-id">
                  <Translate contentKey="global.field.id">ID</Translate>
                </Label>
                <AvInput id="bon-commande-id" type="text" className="form-control" name="id" required readOnly />
              </AvGroup>
            ) : null}
            <ModalBody id="ibamApp.bonCommande.delete.question">

              <AvGroup>
                <Label for="bon-commande-depot">
                  <Translate contentKey="ibamApp.bonCommande.materiau">Materiau</Translate>
                </Label>
                <AvInput id="bon-commande-depot" type="select" className="form-control" name="materiau">
                  <option value="" key="0" />
                  {materiaus
                    ? materiaus.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.libelle}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bon-commande-materiel">
                  <Translate contentKey="ibamApp.bonCommande.materiel">Materiel</Translate>
                </Label>
                <AvInput id="bon-commande-materiel" type="select" className="form-control" name="materiel">
                  <option value="" key="0"  />
                  {materiels
                    ? materiels.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.libelle}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="remarquesLabel" for="bon-commande-remarques">
                  <Translate contentKey="ibamApp.bonCommande.quantity">Quantite</Translate>
                </Label>
                <AvField id="bon-commande-remarques" type="number" name="quantity" />
              </AvGroup>
            </ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button id="cancel-save" to="/bon-commande" replace color="info" onClick={handleClose}>
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
            </Button>
            &nbsp;
            <Button  color="primary" to="/bon-commande" id="save-entity" type="submit"  >
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>

    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  depots: storeState.depot.entities,
  projets: storeState.projet.entities,
  materiaus: storeState.materiau.entities,
  materiels: storeState.materiel.entities,
  ligneBonComs : storeState.bonCommande.entity.ligneBonComs,
  ligneBonCom : storeState.ligneBonCommande.entity,
  // tab : storeState.ligneBonCommande.entities,
  // materiau: storeState.materiau.entity,
  // materiel: storeState.materiel.entity,
  fournisseurs: storeState.fournisseur.entities,
  bonCommandeEntity: storeState.bonCommande.entity,
  loading: storeState.bonCommande.loading,
  updating: storeState.bonCommande.updating,
  updateSuccess: storeState.bonCommande.updateSuccess,
  ligneBonCommandeList: storeState.ligneBonCommande.entities,
  totalItems: storeState.ligneBonCommande.totalItems,
  // ligneBonCommandeList: storeState.ligneBonCommande.entities,
  // ligneBonCommandeList1: storeState.bonCommande.entity.ligneBonComs,

  // materielEntity: materiel,
  // materiauEntity: storeState.materiau.entity,

});

const mapDispatchToProps = {
  getEntity,
  deleteEntity ,
  getDepots,
  getFournisseurs,
  getMateriau,
  getLigneBonCommande,
  getMateriels,
  getOneMateriel,
  getOneMateriau,
  getProjects,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewLigneBonCommandeDialog);
