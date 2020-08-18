import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAffectationsMateriels } from 'app/shared/model/affectations-materiels.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './affectations-materiels.reducer';

export interface IAffectationsMaterielsDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AffectationsMaterielsDeleteDialog = (props: IAffectationsMaterielsDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/affectations-materiels' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.affectationsMaterielsEntity.id);
  };

  const { affectationsMaterielsEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ibamApp.affectationsMateriels.delete.question">
        <Translate contentKey="ibamApp.affectationsMateriels.delete.question" interpolate={{ id: affectationsMaterielsEntity.id }}>
          Are you sure you want to delete this AffectationsMateriels?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-affectationsMateriels" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ affectationsMateriels }: IRootState) => ({
  affectationsMaterielsEntity: affectationsMateriels.entity,
  updateSuccess: affectationsMateriels.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationsMaterielsDeleteDialog);
