import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import * as Icon from 'react-feather';

import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/bon-commande/bon-commande.reducer';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

// export interface IBonCommandeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonCommandeCreate = (props: any) => {
      const [fournisseurId, setFournisseurId] = useState('0');
      const [projetId, setProjetId] = useState('0');
      const [isNew, setIsNew] = useState(props.bonCommandeEntity.id === undefined);

      const { modalOpen, handleClose, bonCommandeEntity, fournisseurs, projets, loading, updating } = props;

      let d = new Date();
      useEffect(() => {
            if (props.updateSuccess) {
                  handleClose();
            }
      }, [props.updateSuccess]);

      useEffect(() => {
            if (isNew) {
                  props.reset();
            } else {
                  props.getEntity(bonCommandeEntity.id);
            }

            props.getFournisseurs();
            props.getProjets();
      }, []);

      const saveEntity = (event, errors, values) => {
            if (errors.length === 0) {
                  const entity = {
                        ...bonCommandeEntity,
                        ...values,
                  };

                  if (isNew) {
                        props.createEntity(entity);
                  } else {
                        props.updateEntity(entity);
                  }
                  handleClose();
            }
      };

      return (
            <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
                  <ModalHeader toggle={() => handleClose()}>
                        <Translate contentKey="ibamApp.bonCommande.home.createOrEditLabel">Create or edit a BonCommande</Translate>
                  </ModalHeader>
                  {/* <AddTodo /> */}
                  <AvForm model={isNew ? {} : bonCommandeEntity} onSubmit={saveEntity}>
                        <ModalBody>
                              <Row>
                                    {/* {!isNew ? (
              <Col md={12}>
                <AvGroup>
                  <Label for="bon-commande-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="avancement-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>{' '}
              </Col>
            ) : null} */}
                                    <Col md={12}>
                                          <AvGroup>
                                                <Label id="remarquesLabel" for="bon-commande-remarques">
                                                      <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate>
                                                </Label>
                                                <AvField id="bon-commande-remarques" type="text" name="remarques" />
                                          </AvGroup>
                                    </Col>{' '}
                                    <Col md={12}>
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
                                                            required: { value: true, errorMessage: translate('entity.validation.required') },
                                                      }}
                                                />
                                          </AvGroup>
                                    </Col>{' '}
                                    <Col md={12}>
                                          <AvGroup check>
                                                <Label id="valideLabel">
                                                      <AvInput id="bon-commande-valide" type="checkbox" className="form-check-input" name="valide" />
                                                      <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate>
                                                </Label>
                                                <AvInput id="avancement-contenuCompteRendu" type="textarea" name="contenuCompteRendu" />
                                          </AvGroup>
                                    </Col>{' '}
                                    <Col md={12}>
                                          <AvGroup>
                                                <Label for="bon-commande-fournisseur">
                                                      <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate>
                                                </Label>
                                                <AvInput id="bon-commande-fournisseur" type="select" className="form-control" name="fournisseur.id">
                                                      <option value="" key="0" />
                                                      {fournisseurs
                                                            ? fournisseurs.map(otherEntity => (
                                                                  <option value={otherEntity.id} key={otherEntity.id}>
                                                                        {otherEntity.id}
                                                                  </option>
                                                            ))
                                                            : null}
                                                </AvInput>
                                          </AvGroup>
                                    </Col>
                                    <Col md={12}>

                                          <AvGroup>
                                                <Label for="bon-commande-projet">
                                                      <Translate contentKey="ibamApp.bonCommande.projet">Projet</Translate>
                                                </Label>
                                                <AvInput
                                                      id="bon-commande-projet"
                                                      type="select"
                                                      className="form-control"
                                                      name="projet.id"
                                                      value={isNew ? projets[0] && projets[0].id : bonCommandeEntity.projet?.id}
                                                      required
                                                >
                                                      {projets
                                                            ? projets.map(otherEntity => (
                                                                  <option value={otherEntity.id} key={otherEntity.id}>
                                                                        {otherEntity.libelle}
                                                                  </option>
                                                            ))
                                                            : null}
                                                </AvInput>
                                                <AvFeedback>
                                                      <Translate contentKey="entity.validation.required">This field is required.</Translate>
                                                </AvFeedback>
                                          </AvGroup>
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
                              <Button onClick={() => handleClose()} color="warning" className="mr-1" type="button">
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
      fournisseurs: storeState.fournisseur.entities,
      projets: storeState.projet.entities,
      // bonCommandeEntity: storeState.bonCommande.entity,
      loading: storeState.bonCommande.loading,
      updating: storeState.bonCommande.updating,
      updateSuccess: storeState.bonCommande.updateSuccess,
});

const mapDispatchToProps = {
      getFournisseurs,
      getProjets,
      getEntity,
      updateEntity,
      createEntity,
      reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonCommandeCreate);
