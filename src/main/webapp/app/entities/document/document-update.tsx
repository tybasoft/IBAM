import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentUpdate = (props: IDocumentUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { documentEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/document' + props.location.search);
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
    values.dateModif = convertDateTimeToServer(values.dateModif);

    if (errors.length === 0) {
      const entity = {
        ...documentEntity,
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
          <h2 id="ibamApp.document.home.createOrEditLabel">
            <Translate contentKey="ibamApp.document.home.createOrEditLabel">Create or edit a Document</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : documentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="document-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="document-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titreLabel" for="document-titre">
                  <Translate contentKey="ibamApp.document.titre">Titre</Translate>
                </Label>
                <AvField
                  id="document-titre"
                  type="text"
                  name="titre"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="document-type">
                  <Translate contentKey="ibamApp.document.type">Type</Translate>
                </Label>
                <AvField
                  id="document-type"
                  type="text"
                  name="type"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="pathLabel" for="document-path">
                  <Translate contentKey="ibamApp.document.path">Path</Translate>
                </Label>
                <AvField
                  id="document-path"
                  type="text"
                  name="path"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commentaireLabel" for="document-commentaire">
                  <Translate contentKey="ibamApp.document.commentaire">Commentaire</Translate>
                </Label>
                <AvField id="document-commentaire" type="text" name="commentaire" />
              </AvGroup>
              {/* <AvGroup>
                <Label id="userModifLabel" for="document-userModif">
                  <Translate contentKey="ibamApp.document.userModif">User Modif</Translate>
                </Label>
                <AvField id="document-userModif" type="text" name="userModif" />
              </AvGroup>
              <AvGroup>
                <Label id="dateModifLabel" for="document-dateModif">
                  <Translate contentKey="ibamApp.document.dateModif">Date Modif</Translate>
                </Label>
                <AvInput
                  id="document-dateModif"
                  type="datetime-local"
                  className="form-control"
                  name="dateModif"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.documentEntity.dateModif)}
                />
              </AvGroup> */}
              <Button tag={Link} id="cancel-save" to="/document" replace color="info">
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
  documentEntity: storeState.document.entity,
  loading: storeState.document.loading,
  updating: storeState.document.updating,
  updateSuccess: storeState.document.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUpdate);
