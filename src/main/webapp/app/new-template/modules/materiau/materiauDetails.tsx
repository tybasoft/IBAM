import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from 'app/entities/materiau/materiau.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import countries from '../../../../content/countries';
import { locales } from 'app/config/translation';

export interface IEmployeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MateriauDetails = ({ id, handleClose, ...props }) => {
  const { materiauEntity, imageEntity } = props;

  useEffect(() => {
    props.resetImage();
    props.getEntity(id);
  }, []);

  useEffect(() => {
    if (materiauEntity.id !== undefined) {
      if (materiauEntity.image !== null) {
        props.getImage(materiauEntity.image.id);
      }
    }
  }, [materiauEntity]);

  return (
    <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.materiau.detail.title">Materiau</Translate> [<b>{materiauEntity.id}</b>]
      </ModalHeader>
      {!materiauEntity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="6">
            {/* <h2>
              <Translate contentKey="ibamApp.materiau.detail.title">Materiau</Translate> [<b>{materiauEntity.id}</b>]
            </h2> */}
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.materiau.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{materiauEntity.libelle}</dd>
              <dt>
                <span id="reference">
                  <Translate contentKey="ibamApp.materiau.reference">Reference</Translate>
                </span>
              </dt>
              <dd>{materiauEntity.reference}</dd>
              <dt>
                <span id="poids">
                  <Translate contentKey="ibamApp.materiau.poids">Poids</Translate>
                </span>
              </dt>
              <dd>{materiauEntity.poids}</dd>
              <dt>
                <span id="volume">
                  <Translate contentKey="ibamApp.materiau.volume">Volume</Translate>
                </span>
              </dt>
              <dd>{materiauEntity.volume}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.materiau.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{materiauEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.materiau.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={materiauEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
              <dt>
                <Translate contentKey="ibamApp.materiau.marque">Marque</Translate>
              </dt>
              <dd>{materiauEntity.marque ? materiauEntity.marque.libelle : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.materiau.unite">Unite</Translate>
              </dt>
              <dd>{materiauEntity.unite ? materiauEntity.unite.libelle : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.materiau.famille">Famille</Translate>
              </dt>
              <dd>{materiauEntity.famille ? materiauEntity.famille.libelle : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.materiau.tva">Tva</Translate>
              </dt>
              <dd>{materiauEntity.tva ? materiauEntity.tva.taux : ''}</dd>
            </dl>
          </Col>
          <Col md="6">
            {materiauEntity.image !== null ? (
              <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
            ) : null}
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  materiauEntity: storeState.materiau.entity,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(MateriauDetails);
