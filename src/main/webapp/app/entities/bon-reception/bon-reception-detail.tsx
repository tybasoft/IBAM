import React, { PureComponent ,useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bon-reception.reducer';
import { getEntity as getImage, reset as resetImage } from 'app/entities/image/image.reducer';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import jsPDF from "jspdf";

export interface IBonReceptionDetailProps extends PureComponent , StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonReceptionDetail = (props: IBonReceptionDetailProps) => {
  const { bonReceptionEntity, imageEntity } = props;

  useEffect(() => {
    props.resetImage();
    props.getEntity(props.match.params.id);
  }, []);

  useEffect(() => {
    if (bonReceptionEntity.id !== undefined) {
      if (bonReceptionEntity.id.toString() === props.match.params.id && bonReceptionEntity.image !== null) {
        props.getImage(bonReceptionEntity.image.id);
      }
    }
  }, [bonReceptionEntity]);

  const jsPdfGenerator = ()=>{
    const doc = new jsPDF('p','pt');
    // const img = new Image()

    const img = 'content/images/logo-jhipster.png'
    doc.addImage(img, 'png', 10, 10, 180, 40)
    doc.setPage(2);
    doc.setFontSize(25);
    doc.setFont('helvetica','bold');
    doc.text('Bon de Reception ',180,100);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Id : '+bonReceptionEntity.id,40,180);
    doc.text('Date Prev Liv : '+bonReceptionEntity.livreur ,40,220);
    doc.text('Remarques : '+bonReceptionEntity.remarques ,40,260);
    doc.text('Date Creation : '+bonReceptionEntity.dateLivraison ,40,300);
    doc.setFontSize(20);
    doc.setFont('times','bold');
    doc.text('Depot Info : ',40,340);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Libelle : '+bonReceptionEntity.depot.libelle,80,380);
    doc.text('Adresse : '+bonReceptionEntity.depot.adresse,80,410);
    doc.text('Telephone : '+bonReceptionEntity.depot.tel,80,440);
    doc.text('Ville : '+bonReceptionEntity.depot.ville,80,470);
    doc.text('Pays : '+bonReceptionEntity.depot.pays,80,500);
    doc.setFontSize(20);
    doc.setFont('times','bold');
    doc.text('Fournisseur Info : ',40,540);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Nom : '+bonReceptionEntity.fournisseur.nom,80,580);
    doc.text('Prenom : '+bonReceptionEntity.fournisseur.prenom,80,610);
    doc.text('Email : '+bonReceptionEntity.fournisseur.email,80,640);
    doc.text('Type : '+bonReceptionEntity.fournisseur.type,80,670);
    doc.text('Fax : '+bonReceptionEntity.fournisseur.fax,80,700);
    doc.text('Telephone : '+bonReceptionEntity.fournisseur.tel,80,730);
    doc.text('Adresse : '+bonReceptionEntity.fournisseur.adresse,80,760);
    doc.text('Description : '+bonReceptionEntity.fournisseur.description,80,790);
    doc.save('Bon_Reception_'+bonReceptionEntity.id+'.pdf');
  }

  return (
    <Row>
      <Col md="6">
        <h2>
          <Translate contentKey="ibamApp.bonReception.detail.title">BonReception</Translate> [<b>{bonReceptionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="livreur">
              <Translate contentKey="ibamApp.bonReception.livreur">Livreur</Translate>
            </span>
          </dt>
          <dd>{bonReceptionEntity.livreur}</dd>
          <dt>
            <span id="remarques">
              <Translate contentKey="ibamApp.bonReception.remarques">Remarques</Translate>
            </span>
          </dt>
          <dd>{bonReceptionEntity.remarques}</dd>
          <dt>
            <span id="dateLivraison">
              <Translate contentKey="ibamApp.bonReception.dateLivraison">Date Livraison</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bonReceptionEntity.dateLivraison} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.bonReception.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{bonReceptionEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.bonReception.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bonReceptionEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ibamApp.bonReception.depot">Depot</Translate>
          </dt>
          <dd>{bonReceptionEntity.depot ? bonReceptionEntity.depot.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.bonReception.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{bonReceptionEntity.fournisseur ? bonReceptionEntity.fournisseur.id : ''}</dd>
          <div>

            <Button style={{ height: 60,weight:100, marginTop: 10 }} onClick={jsPdfGenerator} color="success" >Download</Button>
          </div>
        </dl>
        <Button tag={Link} to="/bon-reception" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bon-reception/${bonReceptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      <Col md="6">
        {bonReceptionEntity.image !== null ? (
          <img src={imageEntity.path + '?' + Math.random()} alt="not found" style={{ width: '80%', border: 'solid 1px' }} />
        ) : null}
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  bonReceptionEntity: storeState.bonReception.entity,
  imageEntity: storeState.image.entity
});

const mapDispatchToProps = { getEntity, getImage, resetImage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonReceptionDetail);
