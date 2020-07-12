import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileArchive, faFileCsv, faFileExcel, faFileWord, faFileAlt, faDownload } from '@fortawesome/free-solid-svg-icons';

import { IRootState } from 'app/shared/reducers';
import { getEntity, RapportConsommation } from './materiel.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { getEntity as getDocument, reset as resetDocument } from 'app/entities/document/document.reducer';
import { IMateriel } from 'app/shared/model/materiel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMaterielDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MaterielDetail = (props: IMaterielDetailProps) => {
  const { materielEntity, imageEntity, documentEntity, loadingDocument } = props;

  const [documentLogo, setdocumentLogo] = useState(null);

  useEffect(() => {
    props.resetImage();
    props.resetDocument();
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    const id: number = materielEntity.id;
    if (id !== undefined && id.toString() === props.match.params.id) {
      if (materielEntity.image !== null) {
        props.getImage(materielEntity.image.id);
      }
      if (materielEntity.document !== null) {
        props.getDocument(materielEntity.document.id);
      }
    }
  }, [materielEntity]);

  const getConsommationRepport = () => {
    const res = props.RapportConsommation(props.match.params.id);
  };

  useEffect(() => {
    if (documentEntity !== null && documentEntity.type !== undefined) {
      switch (documentEntity.type.toLocaleLowerCase()) {
        case 'pdf':
          setdocumentLogo(faFilePdf);
          break;
        case 'csv':
          setdocumentLogo(faFileCsv);
          break;
        case 'rar':
        case 'zip':
          setdocumentLogo(faFileArchive);
          break;
        case 'xls':
        case 'xlsx':
          setdocumentLogo(faFileExcel);
          break;
        case 'doc':
        case 'docx':
          setdocumentLogo(faFileWord);
          break;
        default:
          setdocumentLogo(faFileAlt);
          break;
      }
    }
  }, [documentEntity]);

  return (
    <div>
      {loadingDocument ? (
        <p>Loading...</p>
      ) : (
        <Row>
          <Col md="6">
            <h2>
              <Translate contentKey="ibamApp.materiel.detail.title">Materiel</Translate> [<b>{materielEntity.id}</b>]
            </h2>
            <dl className="jh-entity-details">
              <dt>
                <span id="libelle">
                  <Translate contentKey="ibamApp.materiel.libelle">Libelle</Translate>
                </span>
              </dt>
              <dd>{materielEntity.libelle}</dd>
              <dt>
                <span id="matricule">
                  <Translate contentKey="ibamApp.materiel.matricule">Matricule</Translate>
                </span>
              </dt>
              <dd>{materielEntity.matricule}</dd>
              <dt>
                <span id="modele">
                  <Translate contentKey="ibamApp.materiel.modele">Modele</Translate>
                </span>
              </dt>
              <dd>{materielEntity.modele}</dd>
              <dt>
                <span id="numCarteGrise">
                  <Translate contentKey="ibamApp.materiel.numCarteGrise">Num Carte Grise</Translate>
                </span>
              </dt>
              <dd>{materielEntity.numCarteGrise}</dd>
              <dt>
                <span id="dateIdentification">
                  <Translate contentKey="ibamApp.materiel.dateIdentification">Date Identification</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={materielEntity.dateIdentification} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd>
              <dt>
                <span id="compteurAchat">
                  <Translate contentKey="ibamApp.materiel.compteurAchat">Compteur Achat</Translate>
                </span>
              </dt>
              <dd>{materielEntity.compteurAchat}</dd>
              <dt>
                <span id="etat">
                  <Translate contentKey="ibamApp.materiel.etat">Etat</Translate>
                </span>
              </dt>
              <dd>
                {materielEntity.etat
                  ? materielEntity.etat === 'ON'
                    ? translate('ibamApp.materiel.etatFieldON')
                    : translate('ibamApp.materiel.etatFieldOFF')
                  : null}
              </dd>
              <dt>
                <span id="location">
                  <Translate contentKey="ibamApp.materiel.location">Location</Translate>
                </span>
              </dt>
              <dd>{materielEntity.location ? 'true' : 'false'}</dd>
              <dt>
                <span id="description">
                  <Translate contentKey="ibamApp.materiel.description">Description</Translate>
                </span>
              </dt>
              <dd>{materielEntity.description}</dd>
              {/*   <dt>
                <span id="userModif">
                  <Translate contentKey="ibamApp.materiel.userModif">User Modif</Translate>
                </span>
              </dt>
              <dd>{materielEntity.userModif}</dd>
              <dt>
                <span id="dateModif">
                  <Translate contentKey="ibamApp.materiel.dateModif">Date Modif</Translate>
                </span>
              </dt>
              <dd>
                <TextFormat value={materielEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
              </dd> */}
              <dt>
                <Translate contentKey="ibamApp.materiel.famille">Famille</Translate>
              </dt>
              <dd>{materielEntity.famille ? materielEntity.famille.libelle: ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.materiel.typeMateriel">Type Materiel</Translate>
              </dt>
              <dd>{materielEntity.typeMateriel ? materielEntity.typeMateriel.type : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.materiel.fournisseur">Fournisseur</Translate>
              </dt>
              <dd>{materielEntity.fournisseur ? materielEntity.fournisseur.nomCommercial : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.materiel.marque">Marque</Translate>
              </dt>
              <dd>{materielEntity.marque ? materielEntity.marque.libelle : ''}</dd>
              <dt>
                <Translate contentKey="ibamApp.materiel.employe">Employe</Translate>
              </dt>
              <dd>{materielEntity.employe ? materielEntity.employe.nom : ''}</dd>
            </dl>
            <Button tag={Link} to="/materiel" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button tag={Link} to={`/materiel/${materielEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
            <Button onClick={getConsommationRepport} replace color="success">
              <span className="d-none d-md-inline">
                <Translate contentKey="ibamApp.materiel.detail.consommation">Rapport de consommation</Translate>
              </span>
            </Button>
          </Col>
          <Col md="6">
            {materielEntity.image !== null ? (
              <dd>
                <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
              </dd>
            ) : null}
            {materielEntity.document != null &&
            documentEntity.path !== null &&
            documentEntity.path !== undefined &&
            documentLogo !== null ? (
              <dl>
                <FontAwesomeIcon icon={documentLogo} color="lightgrey " size="10x" />
                <dd>{documentEntity.path.substr(27)}</dd>
                <dd>
                  <a
                    className="btn btn-secondary"
                    href={documentEntity.path + '?' + Math.random()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    <span className="d-none d-md-inline">{translate('entity.action.download')}</span>
                  </a>
                </dd>
              </dl>
            ) : null}
          </Col>
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  materielEntity: storeState.materiel.entity,
  imageEntity: storeState.image.entity,
  documentEntity: storeState.document.entity,
  loadingDocument: storeState.document.loading
});

const mapDispatchToProps = { RapportConsommation, getEntity, getImage, resetImage, getDocument, resetDocument };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaterielDetail);
