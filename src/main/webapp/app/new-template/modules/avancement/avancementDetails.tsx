import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Translate, Storage, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser from 'react-html-parser';
import Select from 'react-select';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getFile, getEmployes, sendPdf } from 'app/entities/avancement/avancement.reducer';
// import { getEntity as getImage, reset as resetImage } from 'app/entities/avancement/avancement.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import countries from '../../../../content/countries';
import { locales } from 'app/config/translation';

export interface IEmployeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvancementDetails = ({ id, handleClose, ...props }) => {
  const { avancementEntity } = props;
  let mycont;
  //   let parse = require('html-react-parser');

  let loadEmails = () => {
    let employePaload = props.employes;
    employePaload.data.map(employe => {
      emailOptions.push({ value: employe.email, label: employe.nom });
    });
  };
  const download = () => {
    getFile(avancementEntity.id);
    alert('pdf telechargé dans le dossier de telechargement');
  };

  const sendMail = () => {
    const message = (document.getElementById('mail_message') as HTMLInputElement).value;
    const x = document.getElementById('mail_array').children[1].getElementsByTagName('input');
    const dest_mail_array = [];
    for (let i = 0; i < x.length; i++) {
      dest_mail_array.push(x[i].defaultValue);
    }
    console.log(dest_mail_array);
    sendPdf(message, dest_mail_array, avancementEntity.id);
  };
  const defaultMessage = "Bonjour, Ci joint le compte rendu de l'avancement du: " + avancementEntity.createdAt;
  const emailOptions = [];
  useEffect(() => {
    props.getEntity(id);
    props.getEmployes();
  }, []);

  return (
    <Modal isOpen={props.isOpen} toggle={() => handleClose()} size="lg">
      <ModalHeader toggle={() => handleClose()}>
        <Translate contentKey="ibamApp.avancement.detail.title">Avancement</Translate> [<b>{avancementEntity.id}</b>]
      </ModalHeader>
      {!avancementEntity ? (
        <Row className="pt-3 pl-3 pr-3">'Chargement ...'</Row>
      ) : (
        <Row className="pt-3 pl-3 pr-3">
          <Col md="8">
            <dl className="jh-entity-details">
              <dt>
                <span id="createdAt">
                  <Translate contentKey="ibamApp.avancement.createdAt">Created At</Translate>
                </span>
              </dt>
              <dd>
                {avancementEntity.createdAt ? (
                  <TextFormat value={avancementEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </dd>
              <dt>
                <span id="updatedAt">
                  <Translate contentKey="ibamApp.avancement.updatedAt">Updated At</Translate>
                </span>
              </dt>
              <dd>
                {avancementEntity.updatedAt ? (
                  <TextFormat value={avancementEntity.updatedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
                ) : null}
              </dd>
              <dt>
                <span id="titreCompteRendu">
                  <Translate contentKey="ibamApp.avancement.titreCompteRendu">Titre Compte Rendu</Translate>
                </span>
              </dt>
              <dd>{avancementEntity.titreCompteRendu}</dd>
              <dt>
                <span id="contenuCompteRendu">
                  <Translate contentKey="ibamApp.avancement.contenuCompteRendu">Contenu Compte Rendu</Translate>
                </span>
              </dt>
              <dd id="mycontent">{ReactHtmlParser(avancementEntity.contenuCompteRendu)}</dd>
              <dt>
                <span>Rédacteur</span>
              </dt>
              <dd>{avancementEntity.employe ? avancementEntity.employe.nom : ''}</dd>
            </dl>
            {/* <Button tag={Link} to="/avancement" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button tag={Link} to={`/avancement/${avancementEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />
              {''}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
            &nbsp;
            <Button color="success" onClick={download}>
              <FontAwesomeIcon icon="download" /> <span className="d-none d-md-inline">Télecharger le compte rendu sous forme de PDF</span>
            </Button>
            &nbsp;
            <Button color="warning" data-toggle="modal" data-target="#exampleModalCenter" onClick={loadEmails}>
              <FontAwesomeIcon icon="download" />{' '}
              <span className="d-none d-md-inline">Envoyer le compte rendu a l'équipe sous forme de PDF</span>
            </Button> */}
          </Col>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Envoyer le fichier a votre equipe{' '}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="mail">Destinataire</label>
                    <Select
                      id="mail_array"
                      // defaultValue={emailOptions[0]}
                      isMulti
                      name="colors"
                      options={emailOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                    <label htmlFor="message">Votre message</label>
                    <textarea className="form-control" name="" id="mail_message" cols={30} rows={10} value={defaultMessage}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    fermer
                  </button>
                  <button
                    type="button"
                    onClick={sendMail}
                    data-toggle="modal"
                    data-target="#successModal"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Envoyer le pdf
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal 2 */}
          <div
            className="modal fade"
            id="successModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="successModal">
                    Success{' '}
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="">
                    <span className="text-success">Pdf envoyé avec success</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Row>
      )}
      <ModalFooter>
        {/* <div className="form-actions"> */}
        <Button onClick={() => download()} color="warning" className="mr-1" type="button">
          {/* <Icon.X size={16} className="mr-2" color="#FFF" /> */}
          Télecharger sous forme de PDF
          {/* <Translate contentKey="entity.action.cancel">Envoyer le compte rendu a l'équipe sous forme de PDF</Translate> */}
        </Button>
        <Button color="primary" onClick={() => loadEmails()}>
          {/* <Icon.CheckSquare size={16} className="mr-2" color="#FFF" /> */}
          Envoyer a l'équipe sous forme de PDF
          {/* <Translate contentKey="entity.action.save">Entreprises</Translate> */}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ avancement, employe }: IRootState) => ({
  avancementEntity: avancement.entity,
  employes: employe.entities
});

const mapDispatchToProps = {
  getEntity,
  getFile,
  getEmployes,
  sendPdf
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(AvancementDetails);
