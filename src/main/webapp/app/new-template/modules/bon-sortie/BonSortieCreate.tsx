import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
} from "reactstrap";
import {
  AvFeedback,
  AvForm,
  AvGroup,
  AvInput,
  AvField,
} from "availity-reactstrap-validation";
import {
  Translate,
  translate,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
} from "react-jhipster";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRootState } from "app/shared/reducers";
import * as Icon from "react-feather";

import { IProjet } from "app/shared/model/projet.model";
import { getEntities as getProjets } from "app/entities/projet/projet.reducer";
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from "app/entities/bon-sortie/bon-sortie.reducer";
import {getEntities as getMateriau} from "app/entities/materiau/materiau.reducer";
import {getEntities as getMateriels} from "app/entities/materiel/materiel.reducer";
import { IBonSortie } from "app/shared/model/bon-sortie.model";
import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from "app/shared/util/date-utils";
import { mapIdList } from "app/shared/util/entity-utils";

export interface IBonSortieUpdateProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export const BonSortieCreate = (props: any) => {
  const [projetId, setProjetId] = useState("0");
  const [isNew, setIsNew] = useState(props.bonSortieEntity.id === undefined);

  const [errorMessage, seterrorMessage] = useState("");
  const [imageID, setimageID] = useState(null);
  const [imageDeleted, setimageDeleted] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [bigmodal, setBigModal] = useState(true);
  const [materielObj, setMaterielObj] = useState({ id: "1" });
  const [materiauObj, setMateriauObj] = useState({ id: "1" });
  const [newLines, setNewLines] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const history = useHistory();
  const [typeLigne, setTypeLigne] = React.useState("materiel");
  const [disableMateriel, setDisableMateriel] = useState();
  const [disableMateriau, setDisableMateriau] = useState();
  const {
    modalOpen,
    handleClose,
    bonSortieEntity,
    projets,
    materiels,
    materiaus,
    loading,
    updating,
  } = props;

  const handleChange = (event) => {
    setTypeLigne(event.target.value);
  };
  const handleShow = () => {
    // isOpen=true;
    setModal(true);
    console.warn("Clicked on handleShow : " + modal);
  };

  const handleCloseBig = () => {
    setBigModal(false);

    // props.history.push('/bon-commande' + props.location.search);
  };
  const handleShowBig = () => {
    // isOpen=true;
    setBigModal(true);
    console.warn("Clicked on handleShow : " + modal);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(bonSortieEntity.id);
    }

    props.getProjets();
    props.getMateriau();
    props.getMateriels();
  }, []);

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
        handleClose();
      } else {
        props.updateEntity(entity);
        handleCloseBig();
      }
      handleClose();
    }
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.bonReception.home.createOrEditLabel">
          Create or edit a BonCommande
        </Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : bonSortieEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
                                {!isNew ? (
                                      <Col md={12}>
                                            <AvGroup>
                                                  <Label for="bon-reception-id">
                                                        <Translate contentKey="global.field.id">ID</Translate>
                                                  </Label>
                                                  <AvInput id="bon-reception-id" type="text" className="form-control" name="id" required readOnly />
                                            </AvGroup>
                                      </Col>) : null}
                                    <Col md={12}>
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
                                    </Col>{' '}
                                    <Col md={12}>
                                          <AvGroup>
      <Label id="dateCreationLabel" for="bon-sortie-dateCreation">
                        <Translate contentKey="ibamApp.bonSortie.dateCreation">Date Creation</Translate>
                      </Label>
                      <AvField id="bon-sortie-dateCreation" type="date" className="form-control" name="dateCreation" />
                                          </AvGroup>
                                    </Col>{' '}
                                    <Col md={12}>
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
                                    </Col>
                                    <Col md={12}>

                                         <AvGroup>
                      <Label id="remarquesLabel" for="bon-reception-remarques">
                        <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
                      </Label>
                      <AvField id="bon-reception-remarques" type="text" name="remarques" />
                    </AvGroup>
                                    </Col>
                                    <Col md={12}>
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
                                    
                                    </Col>
                                    {/* <Button tag={Link} id="cancel-save" to="/avancement" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button color="primary" id="save-entity" type="submit" disabled={updating}>
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button> */}
          </Row>
        </ModalBody>
        <ModalFooter>
          {/* <div className="form-actions"> */}
          <Button
            onClick={() => handleClose()}
            color="warning"
            className="mr-1"
            type="button"
          >
            <Icon.X size={16} className="mr-2" color="#FFF" />
            <Translate contentKey="entity.action.cancel">Entreprises</Translate>
          </Button>
          <Button color="primary" type="submit">
            <Icon.CheckSquare size={16} className="mr-2" color="#FFF" />
            <Translate contentKey="entity.action.save">Entreprises</Translate>
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  projets: storeState.projet.entities,
  // bonSortieEntity: storeState.bonSortie.entity,
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

export default connect(mapStateToProps, mapDispatchToProps)(BonSortieCreate);
