import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImage } from 'app/shared/model/image.model';
import { getEntities as getImages } from 'app/entities/image/image.reducer';
import { getEntity, updateEntity, createEntity, reset } from './entreprise.reducer';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEntrepriseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntrepriseUpdate = (props: IEntrepriseUpdateProps) => {
  const [imageId, setImageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { entrepriseEntity, images, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/entreprise');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...entrepriseEntity,
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
          <h2 id="ibamApp.entreprise.home.createOrEditLabel">
            <Translate contentKey="ibamApp.entreprise.home.createOrEditLabel">Create or edit a Entreprise</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : entrepriseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="entreprise-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="entreprise-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="entiteJuridiqueLabel" for="entreprise-entiteJuridique">
                  <Translate contentKey="ibamApp.entreprise.entiteJuridique">Entite Juridique</Translate>
                </Label>
                <AvField id="entreprise-entiteJuridique" type="text" name="entiteJuridique" />
              </AvGroup>
              <AvGroup>
                <Label id="nomCommercialLabel" for="entreprise-nomCommercial">
                  <Translate contentKey="ibamApp.entreprise.nomCommercial">Nom Commercial</Translate>
                </Label>
                <AvField
                  id="entreprise-nomCommercial"
                  type="text"
                  name="nomCommercial"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLabel" for="entreprise-adresse">
                  <Translate contentKey="ibamApp.entreprise.adresse">Adresse</Translate>
                </Label>
                <AvField id="entreprise-adresse" type="text" name="adresse" />
              </AvGroup>
              <AvGroup>
                <Label id="capitalLabel" for="entreprise-capital">
                  <Translate contentKey="ibamApp.entreprise.capital">Capital</Translate>
                </Label>
                <AvField id="entreprise-capital" type="text" name="capital" />
              </AvGroup>
              <AvGroup>
                <Label id="directionLabel" for="entreprise-direction">
                  <Translate contentKey="ibamApp.entreprise.direction">Direction</Translate>
                </Label>
                <AvField id="entreprise-direction" type="text" name="direction" />
              </AvGroup>
              <AvGroup>
                <Label id="activiteLabel" for="entreprise-activite">
                  <Translate contentKey="ibamApp.entreprise.activite">Activite</Translate>
                </Label>
                <AvField id="entreprise-activite" type="text" name="activite" />
              </AvGroup>
              <AvGroup>
                <Label id="telephoneLabel" for="entreprise-telephone">
                  <Translate contentKey="ibamApp.entreprise.telephone">Telephone</Translate>
                </Label>
                <AvField id="entreprise-telephone" type="text" name="telephone" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="entreprise-email">
                  <Translate contentKey="ibamApp.entreprise.email">Email</Translate>
                </Label>
                <AvField id="entreprise-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="entreprise-userModif">
                  <Translate contentKey="ibamApp.entreprise.userModif">User Modif</Translate>
                </Label>
                <AvField id="entreprise-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="entreprise-dateModif">
                  <Translate contentKey="ibamApp.entreprise.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="entreprise-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="entreprise-image">
                  <Translate contentKey="ibamApp.entreprise.image">Image</Translate>
                </Label>
                <AvInput id="entreprise-image" type="select" className="form-control" name="image.id">
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
              <Button tag={Link} id="cancel-save" to="/entreprise" replace color="info">
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
  images: storeState.image.entities,
  entrepriseEntity: storeState.entreprise.entity,
  loading: storeState.entreprise.loading,
  updating: storeState.entreprise.updating,
  updateSuccess: storeState.entreprise.updateSuccess
});

const mapDispatchToProps = {
  getImages,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntrepriseUpdate);
