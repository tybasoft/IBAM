import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Link, RouteComponentProps, useHistory} from 'react-router-dom';
import { Button, Row, Col, Label,Table } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bon-sortie.reducer';
import { IBonSortie } from 'app/shared/model/bon-sortie.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {getEntities as getMateriau} from "app/entities/materiau/materiau.reducer";
import {getEntities as getMateriels} from "app/entities/materiel/materiel.reducer";

export interface IBonSortieUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonSortieUpdate = (props: IBonSortieUpdateProps) => {
  const [projetId, setProjetId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [errorMessage, seterrorMessage] = useState('');
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [bigmodal, setBigModal] = useState(true);
  const [materielObj, setMaterielObj] = useState({id: "1"});
  const [materiauObj, setMateriauObj] = useState({id: "1"});
  const [newLines, setNewLines] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const history = useHistory();
  const [typeLigne, setTypeLigne] = React.useState('materiel');
  const [disableMateriel, setDisableMateriel] = useState();
  const [disableMateriau, setDisableMateriau] = useState();
  const { bonSortieEntity,projets,materiels ,materiaus , loading, updating } = props;
  const handleClose = () => {
    setModal(false);

    // props.history.push('/bon-commande' + props.location.search);
  };
  const handleChange = (event) => {
    setTypeLigne(event.target.value);
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
    }

    props.getProjets();
    props.getMateriau();
    props.getMateriels();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.ligneBonSortie = newLines;

    if (errors.length === 0) {
      const entity = {
        ...bonSortieEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
        handleCloseBig();
        history.push("/bon-reception");
      } else {
        props.updateEntity(entity);
        handleCloseBig();
        history.push("/bon-reception");
        window.location.reload(false);
      }
    }
  };
  const saveMateriau = (event, errors, values) => {
    console.warn("Add to table Materiau");
    if (errors.length === 0) {
      const entity = {
        // ...bonCommandeEntity,
        // ...ligneBonComs,
        ...values
      };
      newLines.push({materiel:{id:values.materiel} ,
        materiau:{id:values.materiau},quantite:values.quantity,
        prixHt:values.prixHt , type:typeLigne});
      // newLines.push({materiel: {id: "3"}, materiau:null, quantite: "1", prixHt: "120", currency: "CDF", type: "materiel"});
      console.warn(newLines);
      setModal(false);

    }
  };


  return (
    <div>

      <Modal size="lg" style={{maxWidth: '900px', width: '100%'}}  isOpen={bigmodal} toggle={handleClose} >

        <ModalHeader toggle={handleClose} >
          <Translate contentKey="ibamApp.bonReception.home.createOrEditLabel">Create or edit a BonCommande</Translate>
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
                <AvForm model={isNew ? {} : bonSortieEntity} onSubmit={saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="bon-reception-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="bon-reception-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <ModalBody id="ibamApp.bonCommande.delete.question">

                    <AvGroup>
                      <Label id="dateSortieLabel" for="bon-sortie-dateSortie">
                        <Translate contentKey="ibamApp.bonSortie.dateSortie">Date Sortie</Translate>
                      </Label>
                      <AvField
                        id="bon-sortie-dateSortie"
                        type="date"
                        className="form-control"
                        name="dateSortie"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label id="dateCreationLabel" for="bon-sortie-dateCreation">
                        <Translate contentKey="ibamApp.bonSortie.dateCreation">Date Creation</Translate>
                      </Label>
                      <AvField id="bon-sortie-dateCreation" type="date" className="form-control" name="dateCreation" />
                    </AvGroup>
                    <AvGroup>
                      <Label for="bon-reception-depot">
                        <Translate contentKey="ibamApp.bonReception.projet">Projet</Translate>
                      </Label>
                      <AvInput id="bon-reception-depot" type="select" className="form-control" name="projet.id">
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
                      <Label id="remarquesLabel" for="bon-reception-remarques">
                        <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
                      </Label>
                      <AvField id="bon-reception-remarques" type="text" name="remarques" />
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
                        <th className="hand">
                          <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix HT</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th>
                          <Translate contentKey="ibamApp.bonCommande.materiausAndMateriels">Materiaus/Materiels</Translate> <FontAwesomeIcon icon="sort" />
                        </th>
                        <th />
                      </tr>
                      </thead>
                      <tbody>
                      {newLines.map((data, i) => (
                        <tr key={`entity-${i}`}>

                          <td>{data.quantite}</td>
                          <td>{data.prixHt}</td>
                          <td>{data.materiau.id ? data.materiau.id : ''} {data.materiel.id ? data.materiel.id : ''}</td>
                          <td className="text-right">
                            <div className="btn-group flex-btn-group-container">

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
                    <Button tag={Link} id="cancel-save" to="/bon-sortie" replace color="info">
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
            <ModalBody id="ibamApp.bonCommande.delete.question">
              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup aria-label="type" name="type" value={typeLigne} onChange={handleChange}>
                  <FormControlLabel value="materiel" control={<Radio />} label="Materiel" />
                  <FormControlLabel value="materiau" control={<Radio />} label="Materiau" />
                  {/*<FormControlLabel value="both" control={<Radio />} label="Les deux" />*/}
                </RadioGroup>
              </FormControl>
              {typeLigne==='materiau'  ? (
                <AvGroup>
                  <Label for="bon-commande-depot">
                    <Translate contentKey="ibamApp.bonCommande.materiau">Materiau</Translate>
                  </Label>
                  <AvInput id="bon-commande-depot" type="select" className="form-control" name="materiau"  disabled={disableMateriau}>
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
              ) : null}
              {typeLigne==='materiel'  ? (
                <AvGroup>
                  <Label for="bon-commande-materiel" >
                    <Translate contentKey="ibamApp.bonCommande.materiel">Materiel</Translate>
                  </Label>
                  <AvInput id="bon-commande-materiel" type="select" className="form-control" name="materiel" >
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
              ) : null}
              {/*<AvGroup>
                <Label for="bon-commande-currency">
                  <Translate contentKey="ibamApp.bonReception.currency">Currency</Translate>
                </Label>
                <AvInput id="bon-commande-materiel" type="select" className="form-control" name="currency">
                  <option value="" key="0"  />
                  {currenciesList
                    ? currenciesList.map(otherEntity => (
                      <option value={otherEntity.currencyCode} key={otherEntity.numericCode}>
                        {otherEntity.currencyCode}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>*/}
              <AvGroup>
                <Label id="prixHtLabel" for="ligne-bon-reception-prixHt">
                  <Translate contentKey="ibamApp.ligneBonReception.prixHt">Prix Ht</Translate>
                </Label>
                <AvField id="ligne-bon-reception-prixHt" type="text" name="prixHt" />
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
  projets: storeState.projet.entities,
  bonSortieEntity: storeState.bonSortie.entity,
  loading: storeState.bonSortie.loading,
  updating: storeState.bonSortie.updating,
  updateSuccess: storeState.bonSortie.updateSuccess,
  materiaus: storeState.materiau.entities,
  materiels: storeState.materiel.entities,
});

const mapDispatchToProps = {
  getProjets,
  getEntity,
  updateEntity,
  createEntity,
  getMateriels,
  getMateriau,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonSortieUpdate);
