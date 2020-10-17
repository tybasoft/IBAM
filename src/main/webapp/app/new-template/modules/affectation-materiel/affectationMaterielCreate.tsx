import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProjet } from 'app/shared/model/projet.model';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { getEntities as getMateriels } from 'app/entities/materiel/materiel.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/affectation-materiels/affectation-materiels.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import countries from '../../../../content/countries';
import * as Icon from 'react-feather';

// export interface IEmployeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AffectationMaterielsCreate = (props: any) => {
  const [projetId, setProjetId] = useState('0');
  const [materielId, setMaterielId] = useState('0');
  const [isNew, setIsNew] = useState(props.affectationMaterielsEntity === undefined);

  const { modalOpen, handleClose, affectationMaterielsEntity, projets, materiels, loading, updating } = props;

  //   const handleClose = () => {
  //     props.history.push('/affectation-materiels' + props.location.search);
  //   };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      // props.getEntity(props.match.params.id);
    }

    props.getProjets();
    props.getMateriels();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...affectationMaterielsEntity,
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
        <Translate contentKey="ibamApp.projet.home.createLabel">Entreprises</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : affectationMaterielsEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            <Col md={12}>
              <AvGroup>
                <Label id="dateDebutLabel" for="affectation-materiels-dateDebut">
                  <Translate contentKey="ibamApp.affectationMateriels.dateDebut">Date Debut</Translate>
                </Label>
                <AvField
                  id="affectation-materiels-dateDebut"
                  type="date"
                  className="form-control"
                  name="dateDebut"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="dateFinLabel" for="affectation-materiels-dateFin">
                  <Translate contentKey="ibamApp.affectationMateriels.dateFin">Date Fin</Translate>
                </Label>
                <AvField id="affectation-materiels-dateFin" type="date" className="form-control" name="dateFin" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label id="descriptionLabel" for="affectation-materiels-description">
                  <Translate contentKey="ibamApp.affectationMateriels.description">Description</Translate>
                </Label>
                <AvField id="affectation-materiels-description" type="text" name="description" />
              </AvGroup>
            </Col>
            <Col md={12}>
              <AvGroup>
                <Label for="affectation-materiels-projet">
                  <Translate contentKey="ibamApp.affectationMateriels.projet">Projet</Translate>
                </Label>
                <AvInput
                  id="affectation-materiels-projet"
                  type="select"
                  className="form-control"
                  name="projet.id"
                  value={isNew ? projets[0] && projets[0].id : affectationMaterielsEntity.projet?.id}
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
            <Col md={12}>
              <AvGroup>
                <Label for="affectation-materiels-materiel">
                  <Translate contentKey="ibamApp.affectationMateriels.materiel">Materiel</Translate>
                </Label>
                <AvInput
                  id="affectation-materiels-materiel"
                  type="select"
                  className="form-control"
                  name="materiel.id"
                  value={isNew ? materiels[0] && materiels[0].id : affectationMaterielsEntity.materiel?.id}
                  required
                >
                  {materiels
                    ? materiels.map(otherEntity => (
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
  projets: storeState.projet.entities,
  materiels: storeState.materiel.entities,
  // affectationMaterielsEntity: storeState.affectationMateriels.entity,
  loading: storeState.affectationMateriels.loading,
  updating: storeState.affectationMateriels.updating,
  updateSuccess: storeState.affectationMateriels.updateSuccess
});

const mapDispatchToProps = {
  getProjets,
  getMateriels,
  getEntity,
  updateEntity,
  createEntity,
  reset
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationMaterielsCreate);
