import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import userCurrentId from 'app/shared/reducers/authentication';

import { IEmploye } from 'app/shared/model/employe.model';
import { getEntities as getEmployes } from 'app/entities/employe/employe.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from 'app/entities/avancement/avancement.reducer';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import _debounce from 'lodash.debounce';
import countries from '../../../../content/countries';
import * as Icon from 'react-feather';
import TextEditor from 'app/entities/avancement/TextEditor';

// export interface IEmployeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvancementCreate = (props: any) => {
  const [isNew, setIsNew] = useState(props.avancementEntity.id === undefined);

  const { modalOpen, handleClose, employes, avancementEntity, marques, unites, familles, tvas, loading, updating, imageEntity } = props;

  const { contenuCompteRendu } = avancementEntity;
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
      props.getEntity(avancementEntity.id);
    }

    //  props.getEmployes();
  }, []);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...avancementEntity,
        ...values
      };
      entity.contenuCompteRendu = content;
      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
      handleClose();
    }
  };
  let content;
  let title;
  let path;
  let f = e => {
    title = (document.getElementById('avancement-titreCompteRendu') as HTMLInputElement).value;
    console.log('titre:' + title);
    //  path  ="storage/compte_rendu_"++"+html"
    (document.getElementById('avancement-contenuCompteRendu') as HTMLInputElement).value = e;
    content = (document.getElementById('avancement-contenuCompteRendu') as HTMLInputElement).value;
    console.log('contenu:' + content);
  };

  return (
    <Modal isOpen={modalOpen} toggle={() => handleClose()} size="md">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.avancement.home.createLabel">Entreprises</Translate>
      </ModalHeader>
      {/* <AddTodo /> */}
      <AvForm model={isNew ? {} : avancementEntity} onSubmit={saveEntity}>
        <ModalBody>
          <Row>
            {/* {!isNew ? (
              <Col md={12}>
                <AvGroup>
                  <Label for="avancement-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="avancement-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>{' '}
              </Col>
            ) : null} */}
            <Col md={12}>
              <AvGroup>
                <Label id="createdAtLabel" for="avancement-createdAt">
                  <Translate contentKey="ibamApp.avancement.createdAt">Created At</Translate>
                </Label>
                <AvField id="avancement-createdAt" type="date" className="form-control" disabled value="2020-10-03" name="createdAt" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup>
                <Label id="titreCompteRenduLabel" for="avancement-titreCompteRendu">
                  <Translate contentKey="ibamApp.avancement.titreCompteRendu">Titre Compte Rendu</Translate>
                </Label>
                <AvField
                  id="avancement-titreCompteRendu"
                  type="text"
                  name="titreCompteRendu"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <TextEditor content={avancementEntity.contenuCompteRendu || ''} classes={{}} onChange={f} />
            </Col>
            {/* <AvGroup className="invisible">
              <Label for="avancement-employe">
                <span>Rédacteur</span>
              </Label>
              <AvInput
                id="avancement-employe"
                type="text"
                disabled
                value={userCurrentId()}
                className="form-control"
                name="employe.id"
              ></AvInput>
            </AvGroup> */}{' '}
            <Col md={12}>
              <AvGroup className="invisible">
                <Label id="contenuCompteRenduLabel" for="avancement-contenuCompteRendu">
                  <Translate contentKey="ibamApp.avancement.contenuCompteRendu">Contenu Compte Rendu</Translate>
                </Label>
                <AvInput id="avancement-contenuCompteRendu" type="textarea" name="contenuCompteRendu" />
              </AvGroup>
            </Col>{' '}
            <Col md={12}>
              <AvGroup className="invisible">
                <Label id="updatedAtLabel" for="avancement-updatedAt">
                  <Translate contentKey="ibamApp.avancement.updatedAt">Updated At</Translate>
                </Label>
                <AvField id="avancement-updatedAt" type="date" className="form-control" name="updatedAt" />
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
  employes: storeState.employe.entities,
  //   avancementEntity: storeState.avancement.entity,
  loading: storeState.avancement.loading,
  updating: storeState.avancement.updating,
  updateSuccess: storeState.avancement.updateSuccess
});

const mapDispatchToProps = {
  getEmployes,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvancementCreate);
