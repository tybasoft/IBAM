import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from 'app/entities/type-materiel/type-materiel.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import countries from '../../../../content/countries';
import { locales } from 'app/config/translation';

export interface IEmployeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TypeMaterielDetails = ({ id, handleClose, ...props }) => {
  useEffect(() => {
    props.getEntity(id);
  }, []);

  const { typeMaterielEntity } = props;

  return (
    <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.typeMateriel.detail.title">TypeMateriel</Translate> [<b>{typeMaterielEntity.id}</b>]
      </ModalHeader>
      {!typeMaterielEntity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <dl className="jh-entity-details">
              <dt>
                <span id="type">
                  <Translate contentKey="ibamApp.typeMateriel.type">Type</Translate>
                </span>
              </dt>
              <dd>{typeMaterielEntity.type}</dd>
              {/* <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.typeMateriel.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{typeMaterielEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.typeMateriel.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={typeMaterielEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd> */}
            </dl>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = ({ typeMateriel }: IRootState) => ({
  typeMaterielEntity: typeMateriel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TypeMaterielDetails);
