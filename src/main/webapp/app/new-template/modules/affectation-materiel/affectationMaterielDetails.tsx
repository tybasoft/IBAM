import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from 'app/entities/affectation-materiels/affectation-materiels.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import countries from '../../../../content/countries';
import { locales } from 'app/config/translation';

export interface IEmployeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AffectationMaterielsDetails = ({ id, handleClose, ...props }) => {
  useEffect(() => {
    props.getEntity(id);
  }, []);

  const { affectationMaterielsEntity } = props;

  return (
    <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.affectationMateriels.detail.title">AffectationMateriels</Translate> [
      </ModalHeader>
      {!affectationMaterielsEntity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <h2>
              <Translate contentKey="ibamApp.affectationMateriels.detail.title">AffectationMateriels</Translate> [
              <b>{affectationMaterielsEntity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="dateDebut">
                  <Translate contentKey="ibamApp.affectationMateriels.dateDebut">Date Debut</Translate>
                </span>
              </dt>
              <dd>
                {affectationMaterielsEntity.dateDebut ? (
                  <TextFormat value={affectationMaterielsEntity.dateDebut} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </dd>
              <dt>
                <span id="dateFin">
                  <Translate contentKey="ibamApp.affectationMateriels.dateFin">Date Fin</Translate>
                </span>
              </dt>
              <dd>
                {affectationMaterielsEntity.dateFin ? (
                  <TextFormat value={affectationMaterielsEntity.dateFin} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </dd>
              <dt>
                <span id="description">
                  <Translate contentKey="ibamApp.affectationMateriels.description">Description</Translate>
                </span>
              </dt>
              <dd>{affectationMaterielsEntity.description}</dd>
              <dt>
                <Translate contentKey="ibamApp.affectationMateriels.projet">Projet</Translate>
              </dt>
              <dd>{affectationMaterielsEntity.projet ? affectationMaterielsEntity.projet.id : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.affectationMateriels.materiel">Materiel</Translate>
              </dt>
              <dd>{affectationMaterielsEntity.materiel ? affectationMaterielsEntity.materiel.id : ''}</dd>
            </dl>
            {/* <Button tag={Link} to="/affectation-materiels" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button tag={Link} to={`/affectation-materiels/${affectationMaterielsEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button> */}
          </Col>
        </Row>
      )}
    </Modal>
  );
};

const mapStateToProps = ({ affectationMateriels }: IRootState) => ({
  affectationMaterielsEntity: affectationMateriels.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AffectationMaterielsDetails);
