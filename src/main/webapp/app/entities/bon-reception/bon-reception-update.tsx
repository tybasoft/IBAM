import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepot } from 'app/shared/model/depot.model';
import { getEntities as getDepots } from 'app/entities/depot/depot.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { getEntities as getFournisseurs } from 'app/entities/fournisseur/fournisseur.reducer';
import { IImage } from 'app/shared/model/image.model';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bon-reception.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBonReceptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonReceptionUpdate = (props: IBonReceptionUpdateProps) => {
  const [depotId, setDepotId] = useState('0');
  const [fournisseurId, setFournisseurId] = useState('0');
  const [imageId, setImageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bonReceptionEntity, depots, fournisseurs, images, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bon-reception' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDepots();
    props.getFournisseurs();
    props.getImages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

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
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ibamApp.bonReception.home.createOrEditLabel">
            <Translate contentKey="ibamApp.bonReception.home.createOrEditLabel">Create or edit a BonReception</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bonReceptionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bon-reception-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bon-reception-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="livreurLabel" for="bon-reception-livreur">
                  <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate>
                </Label>
                <AvField id="bon-reception-livreur" type="text" name="livreur" />
              </AvGroup>
              <AvGroup>
                <Label id="remarquesLabel" for="bon-reception-remarques">
                  <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
                </Label>
                <AvField id="bon-reception-remarques" type="text" name="remarques" />
              </AvGroup>
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
              <AvGroup>
                <Label id="userModifLabel" for="bon-reception-userModif">
                  <Translate contentKey="ibamApp.bonReception.userModif">User Modif</Translate>
                </Label>
                <AvField id="bon-reception-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="bon-reception-dateModif">
                  <Translate contentKey="ibamApp.bonReception.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="bon-reception-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="bon-reception-depot">
                  <Translate contentKey="ibamApp.bonReception.depot">Depot</Translate>
                </Label>
                <AvInput id="bon-reception-depot" type="select" className="form-control" name="depot.id">
                  <option value="" key="0" />
                  {depots
                    ? depots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
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
              <Button tag={Link} id="cancel-save" to="/bon-reception" replace color="info">
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
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  depots: storeState.depot.entities,
  fournisseurs: storeState.fournisseur.entities,
  images: storeState.image.entities,
  bonReceptionEntity: storeState.bonReception.entity,
  loading: storeState.bonReception.loading,
  updating: storeState.bonReception.updating,
  updateSuccess: storeState.bonReception.updateSuccess
});

const mapDispatchToProps = {
  getDepots,
  getFournisseurs,
  getImages,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonReceptionUpdate);
