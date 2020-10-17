import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from 'app/entities/type-materiel/type-materiel.reducer';

import { IEmploye } from 'app/shared/model/employe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import countries from '../../../../content/countries';
import * as Icon from 'react-feather';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const TypeMaterielCreate = (props: any) => {
  const { modalOpen, handleClose, typeMaterielEntity, loading, updating } = props;
  const [isNew, setIsNew] = useState(typeMaterielEntity === undefined);

  //   const handleClose = () => {
  //     props.history.push('/fournisseur' + props.location.search);
  //   };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      // props.getEntity(props.match.params.id);
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
        ...typeMaterielEntity,
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
    <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.depot.home.createOrEditLabel">Create or edit a Depot</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : typeMaterielEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            <Col md={12}>
              <AvGroup>
                <Label id="typeLabel" for="type-materiel-type">
                  <Translate contentKey="ibamApp.typeMateriel.type">Type</Translate>
                </Label>
                <AvField
                  id="type-materiel-type"
                  type="text"
                  name="type"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
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
  //   typeMaterielEntity: storeState.typeMateriel.entity,
  loading: storeState.typeMateriel.loading,
  updating: storeState.typeMateriel.updating,
  updateSuccess: storeState.typeMateriel.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TypeMaterielCreate);
