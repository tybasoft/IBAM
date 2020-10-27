import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter, Table } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import * as Icon from 'react-feather';

import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { IImage } from 'app/shared/model/image.model';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/bon-reception/bon-reception.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export const BonReceptionCreate = (props: any) => {
  const [projetId, setProjetId] = useState('0');
  const [isNew, setIsNew] = useState(props.bonReceptionEntity.id === undefined);

  const [fournisseurId, setFournisseurId] = useState('0');
  const [imageId, setImageId] = useState('0');

  const { modalOpen, handleClose, bonReceptionEntity, fournisseurs, images, projets, loading, updating } = props;

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(bonReceptionEntity.id);
    }

    props.getFournisseurs();
    props.getImages();
    props.getProjets();
  }, []);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bonReceptionEntity,
        ...values
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
        <Translate contentKey="ibamApp.bonReception.home.createOrEditLabel">Create or edit a BonReception</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : bonReceptionEntity} onSubmit={saveEntity}>
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
              </Col>
            ) : null}
            <Col md={12}>
              <AvGroup>
                <Label id="livreurLabel" for="bon-reception-livreur">
                  <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate>
                </Label>
                <AvField id="bon-reception-livreur" type="text" name="livreur" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="remarquesLabel" for="bon-reception-remarques">
                  <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
                </Label>
                <AvField id="bon-reception-remarques" type="text" name="remarques" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="dateLivraisonLabel" for="bon-reception-dateLivraison">
                  <Translate contentKey="ibamApp.bonReception.dateLivraison">Date Livraison</Translate>
                </Label>
                <AvField
                  id="bon-reception-dateLivraison"
                  type="date"
                  className="form-control"
                  name="dateLivraison"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
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
              <AvGroup>
                <Label id="dateModifLabel" for="bon-reception-dateModif">
                  <Translate contentKey="ibamApp.bonReception.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="bon-reception-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label for="bon-reception-fournisseur">
                  <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate>
                </Label>
                <AvInput id="bon-reception-fournisseur" type="select" className="form-control" name="fournisseur.id">
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
                <Label for="bon-reception-image">
                  <Translate contentKey="ibamApp.bonReception.image">Image</Translate>
                </Label>
                <AvInput id="bon-reception-image" type="select" className="form-control" name="image.id">
                  <option value="" key="0" />
                  {images
                    ? images.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="bon-reception-projet">
                  <Translate contentKey="ibamApp.bonReception.projet">Projet</Translate>
                </Label>
                <AvInput
                  id="bon-reception-projet"
                  type="select"
                  className="form-control"
                  name="projet.id"
                  value={isNew ? projets[0] && projets[0].id : bonReceptionEntity.projet?.id}
                  required
                >
                  {projets
                    ? projets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
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
  images: storeState.image.entities,
  projets: storeState.projet.entities,
  // bonReceptionEntity: storeState.bonReception.entity,
  loading: storeState.bonReception.loading,
  updating: storeState.bonReception.updating,
  updateSuccess: storeState.bonReception.updateSuccess
});

const mapDispatchToProps = {
  getFournisseurs,
  getImages,
  getProjets,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonReceptionCreate);
