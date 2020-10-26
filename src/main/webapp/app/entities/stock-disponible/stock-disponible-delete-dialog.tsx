import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IStockDisponible } from 'app/shared/model/stock-disponible.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './stock-disponible.reducer';

export interface IStockDisponibleDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StockDisponibleDeleteDialog = (props: IStockDisponibleDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/stock-disponible' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.stockDisponibleEntity.id);
  };

  const { stockDisponibleEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="ibamApp.stockDisponible.delete.question">
        <Translate contentKey="ibamApp.stockDisponible.delete.question" interpolate={{ id: stockDisponibleEntity.id }}>
          Are you sure you want to delete this StockDisponible?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-stockDisponible" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ stockDisponible }: IRootState) => ({
  stockDisponibleEntity: stockDisponible.entity,
  updateSuccess: stockDisponible.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StockDisponibleDeleteDialog);
