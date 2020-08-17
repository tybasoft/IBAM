import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMateriel } from 'app/shared/model/materiel.model';
import { getEntities as getMateriels } from 'app/entities/materiel/materiel.reducer';
import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transfert-materiel.reducer';
import { ITransfertMateriel } from 'app/shared/model/transfert-materiel.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransfertMaterielUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransfertMaterielUpdate = (props: ITransfertMaterielUpdateProps) => {
  const [materielId, setMaterielId] = useState('0');
  const [projetId, setProjetId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transfertMaterielEntity, materiels, projets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transfert-materiel' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMateriels();
    props.getProjets();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...transfertMaterielEntity,
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
          <h2 id="ibamApp.transfertMateriel.home.createOrEditLabel">
            <Translate contentKey="ibamApp.transfertMateriel.home.createOrEditLabel">Create or edit a TransfertMateriel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transfertMaterielEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transfert-materiel-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="transfert-materiel-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="referenceLabel" for="transfert-materiel-reference">
                  <Translate contentKey="ibamApp.transfertMateriel.reference">Reference</Translate>
                </Label>
                <AvField
                  id="transfert-materiel-reference"
                  type="text"
                  name="reference"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateTransfertLabel" for="transfert-materiel-dateTransfert">
                  <Translate contentKey="ibamApp.transfertMateriel.dateTransfert">Date Transfert</Translate>
                </Label>
                <AvField
                  id="transfert-materiel-dateTransfert"
                  type="date"
                  className="form-control"
                  name="dateTransfert"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commentaireLabel" for="transfert-materiel-commentaire">
                  <Translate contentKey="ibamApp.transfertMateriel.commentaire">Commentaire</Translate>
                </Label>
                <AvField id="transfert-materiel-commentaire" type="text" name="commentaire" />
              </AvGroup>
              <AvGroup>
                <Label id="userModifLabel" for="transfert-materiel-userModif">
                  <Translate contentKey="ibamApp.transfertMateriel.userModif">User Modif</Translate>
                </Label>
                <AvField id="transfert-materiel-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="transfert-materiel-dateModif">
                  <Translate contentKey="ibamApp.transfertMateriel.dateModif">Date Modif</Translate>
                </Label>
                <AvField id="transfert-materiel-dateModif" type="date" className="form-control" name="dateModif" />
              </AvGroup>
              <AvGroup>
                <Label for="transfert-materiel-materiel">
                  <Translate contentKey="ibamApp.transfertMateriel.materiel">Materiel</Translate>
                </Label>
                <AvInput id="transfert-materiel-materiel" type="select" className="form-control" name="materiel.id">
                  <option value="" key="0" />
                  {materiels
                    ? materiels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="transfert-materiel-projet">
                  <Translate contentKey="ibamApp.transfertMateriel.projet">Projet</Translate>
                </Label>
                <AvInput id="transfert-materiel-projet" type="select" className="form-control" name="projet.id">
                  <option value="" key="0" />
                  {projets
                    ? projets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/transfert-materiel" replace color="info">
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
  materiels: storeState.materiel.entities,
  projets: storeState.projet.entities,
  transfertMaterielEntity: storeState.transfertMateriel.entity,
  loading: storeState.transfertMateriel.loading,
  updating: storeState.transfertMateriel.updating,
  updateSuccess: storeState.transfertMateriel.updateSuccess
});

const mapDispatchToProps = {
  getMateriels,
  getProjets,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransfertMaterielUpdate);
