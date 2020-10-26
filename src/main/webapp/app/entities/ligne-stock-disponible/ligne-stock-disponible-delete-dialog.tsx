import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ILigneStockDisponible } from 'app/shared/model/ligne-stock-disponible.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './ligne-stock-disponible.reducer';

export interface ILigneStockDisponibleDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LigneStockDisponibleDeleteDialog = (props: ILigneStockDisponibleDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/ligne-stock-disponible' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.ligneStockDisponibleEntity.id);
  };

  const { ligneStockDisponibleEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ibamApp.ligneStockDisponible.delete.question">
        <Translate contentKey="ibamApp.ligneStockDisponible.delete.question" interpolate={{ id: ligneStockDisponibleEntity.id }}>
          Are you sure you want to delete this LigneStockDisponible?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-ligneStockDisponible" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ ligneStockDisponible }: IRootState) => ({
  ligneStockDisponibleEntity: ligneStockDisponible.entity,
  updateSuccess: ligneStockDisponible.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LigneStockDisponibleDeleteDialog);
