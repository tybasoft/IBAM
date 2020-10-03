import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISituationFinanciere } from 'app/shared/model/situation-financiere.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './situation-financiere.reducer';

export interface ISituationFinanciereDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SituationFinanciereDeleteDialog = (props: ISituationFinanciereDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);


  const handleClose = () => {

    props.history.push('/situation-financiere' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {

      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.situationFinanciereEntity.id);
  };

  const { situationFinanciereEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ibamApp.situationFinanciere.delete.question">
        <Translate contentKey="ibamApp.situationFinanciere.delete.question" interpolate={{ id: situationFinanciereEntity.id }}>
          Are you sure you want to delete this SituationFinanciere?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-situationFinanciere" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ situationFinanciere }: IRootState) => ({
  situationFinanciereEntity: situationFinanciere.entity,
  updateSuccess: situationFinanciere.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SituationFinanciereDeleteDialog);
