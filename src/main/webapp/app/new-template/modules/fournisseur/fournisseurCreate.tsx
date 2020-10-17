import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from 'app/entities/fournisseur/fournisseur.reducer';

import { IEmploye } from 'app/shared/model/employe.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import countries from '../../../../content/countries';
import * as Icon from 'react-feather';

// export interface IEmployeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FournisseurCreate = (props: any) => {
  const { modalOpen, handleClose, fournisseurEntity, loading, updating } = props;
  const [isNew, setIsNew] = useState(fournisseurEntity === undefined);

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
        ...fournisseurEntity,
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
        <Translate contentKey="ibamApp.fournisseur.home.createOrEditLabel">Create or edit a Fournisseur</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : fournisseurEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="typeLabel" for="fournisseur-type">
                  <Translate contentKey="ibamApp.fournisseur.type">Type</Translate>
                </Label>
                <AvField id="fournisseur-type" type="text" name="type" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="faxLabel" for="fournisseur-fax">
                  <Translate contentKey="ibamApp.fournisseur.fax">Fax</Translate>
                </Label>
                <AvField id="fournisseur-fax" type="text" name="fax" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="nomLabel" for="fournisseur-nom">
                  <Translate contentKey="ibamApp.fournisseur.nom">Nom</Translate>
                </Label>
                <AvField id="fournisseur-nom" type="text" name="nom" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="prenomLabel" for="fournisseur-prenom">
                  <Translate contentKey="ibamApp.fournisseur.prenom">Prenom</Translate>
                </Label>
                <AvField id="fournisseur-prenom" type="text" name="prenom" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="emailLabel" for="fournisseur-email">
                  <Translate contentKey="ibamApp.fournisseur.email">Email</Translate>
                </Label>
                <AvField id="fournisseur-email" type="text" name="email" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="telLabel" for="fournisseur-tel">
                  <Translate contentKey="ibamApp.fournisseur.tel">Tel</Translate>
                </Label>
                <AvField id="fournisseur-tel" type="text" name="tel" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
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
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="descriptionLabel" for="fournisseur-description">
                  <Translate contentKey="ibamApp.fournisseur.description">Description</Translate>
                </Label>
                <AvField id="fournisseur-description" type="text" name="description" />
              </AvGroup>
            </Col>
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
  // fournisseurEntity: storeState.fournisseur.entity,
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

export default connect(mapStateToProps, mapDispatchToProps)(FournisseurCreate);
