import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './fournisseur.reducer';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFournisseurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FournisseurUpdate = (props: IFournisseurUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fournisseurEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/fournisseur' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...fournisseurEntity,
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
          <h2 id="ibamApp.fournisseur.home.createOrEditLabel">
            <Translate contentKey="ibamApp.fournisseur.home.createOrEditLabel">Create or edit a Fournisseur</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fournisseurEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="fournisseur-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="fournisseur-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomCommercialLabel" for="fournisseur-nomCommercial">
                  <Translate contentKey="ibamApp.fournisseur.nomCommercial">Nom Commercial</Translate>
                </Label>
                <AvField
                  id="fournisseur-nomCommercial"
                  type="text"
                  name="nomCommercial"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="fournisseur-type">
                  <Translate contentKey="ibamApp.fournisseur.type">Type</Translate>
                </Label>
                <AvField id="fournisseur-type" type="text" name="type" />
              </AvGroup>
              <AvGroup>
                <Label id="faxLabel" for="fournisseur-fax">
                  <Translate contentKey="ibamApp.fournisseur.fax">Fax</Translate>
                </Label>
                <AvField id="fournisseur-fax" type="text" name="fax" />
              </AvGroup>
              <AvGroup>
                <Label id="nomLabel" for="fournisseur-nom">
                  <Translate contentKey="ibamApp.fournisseur.nom">Nom</Translate>
                </Label>
                <AvField id="fournisseur-nom" type="text" name="nom" />
              </AvGroup>
              <AvGroup>
                <Label id="prenomLabel" for="fournisseur-prenom">
                  <Translate contentKey="ibamApp.fournisseur.prenom">Prenom</Translate>
                </Label>
                <AvField id="fournisseur-prenom" type="text" name="prenom" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="fournisseur-email">
                  <Translate contentKey="ibamApp.fournisseur.email">Email</Translate>
                </Label>
                <AvField id="fournisseur-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="telLabel" for="fournisseur-tel">
                  <Translate contentKey="ibamApp.fournisseur.tel">Tel</Translate>
                </Label>
                <AvField id="fournisseur-tel" type="text" name="tel" />
              </AvGroup>
              <AvGroup>
                <Label id="adresseLabel" for="fournisseur-adresse">
                  <Translate contentKey="ibamApp.fournisseur.adresse">Adresse</Translate>
                </Label>
                <AvField
                  id="fournisseur-adresse"
                  type="text"
                  name="adresse"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="fournisseur-description">
                  <Translate contentKey="ibamApp.fournisseur.description">Description</Translate>
                </Label>
                <AvField id="fournisseur-description" type="text" name="description" />
              </AvGroup>
              {/* <AvGroup>
                <Label id="userModifLabel" for="fournisseur-userModif">
                  <Translate contentKey="ibamApp.fournisseur.userModif">User Modif</Translate>
                </Label>
                <AvField id="fournisseur-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="fournisseur-dateModif">
                  <Translate contentKey="ibamApp.fournisseur.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="fournisseur-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup> */}
              <Button tag={Link} id="cancel-save" to="/fournisseur" replace color="info">
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
  fournisseurEntity: storeState.fournisseur.entity,
  loading: storeState.fournisseur.loading,
  updating: storeState.fournisseur.updating,
  updateSuccess: storeState.fournisseur.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FournisseurUpdate);
