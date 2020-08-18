import React, {PureComponent, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bon-commande.reducer';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import jsPDF from "jspdf";


export interface IBonCommandeDetailProps extends PureComponent ,StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BonCommandeDetail = (props: IBonCommandeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bonCommandeEntity } = props;

  const jsPdfGenerator = ()=>{
    const doc = new jsPDF('p','pt');
    // const img = new Image()

    const img = 'content/images/logo-jhipster.png'
    doc.addImage(img, 'png', 10, 10, 180, 40)
    doc.setPage(2);
    doc.setFontSize(25);
    doc.setFont('helvetica','bold');
    doc.text('Bon de Commande ',180,100);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Id : '+bonCommandeEntity.id,40,180);
    doc.text('Date Prev Liv : '+bonCommandeEntity.datePrevLiv ,40,220);
    doc.text('Remarques : '+bonCommandeEntity.remarques ,40,260);
    doc.text('Date Creation : '+bonCommandeEntity.dateCreation ,40,300);
    doc.text('Valide : '+bonCommandeEntity.valide ,40,340);
    doc.setFontSize(20);
    doc.setFont('times','bold');
    doc.text('Depot Info : ',40,380);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Libelle : '+bonCommandeEntity.depot.libelle,80,420);
    doc.text('Adresse : '+bonCommandeEntity.depot.adresse,80,450);
    doc.text('Telephone : '+bonCommandeEntity.depot.tel,80,480);
    doc.text('Ville : '+bonCommandeEntity.depot.ville,80,510);
    doc.text('Pays : '+bonCommandeEntity.depot.pays,80,540);
    doc.setFontSize(20);
    doc.setFont('times','bold');
    doc.text('Fournisseur Info : ',40,580);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Nom : '+bonCommandeEntity.fournisseur.nom,80,620);
    doc.text('Prenom : '+bonCommandeEntity.fournisseur.prenom,80,650);
    doc.text('Email : '+bonCommandeEntity.fournisseur.email,80,680);
    doc.text('Type : '+bonCommandeEntity.fournisseur.type,80,710);
    doc.text('Fax : '+bonCommandeEntity.fournisseur.fax,80,740);
    doc.text('Telephone : '+bonCommandeEntity.fournisseur.tel,80,770);
    doc.text('Adresse : '+bonCommandeEntity.fournisseur.adresse,80,800);
    doc.text('Description : '+bonCommandeEntity.fournisseur.description,80,830);
    doc.save('Bon_Commande_'+bonCommandeEntity.id+'.pdf');
  }
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.bonCommande.detail.title">BonCommande</Translate> [<b>{bonCommandeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="datePrevLiv">
              <Translate contentKey="ibamApp.bonCommande.datePrevLiv">Date Prev Liv</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bonCommandeEntity.datePrevLiv} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="remarques">
              <Translate contentKey="ibamApp.bonCommande.remarques">Remarques</Translate>
            </span>
          </dt>
          <dd>{bonCommandeEntity.remarques}</dd>
          <dt>
            <span id="dateCreation">
              <Translate contentKey="ibamApp.bonCommande.dateCreation">Date Creation</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bonCommandeEntity.dateCreation} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="valide">
              <Translate contentKey="ibamApp.bonCommande.valide">Valide</Translate>
            </span>
          </dt>
          <dd>{bonCommandeEntity.valide ? 'true' : 'false'}</dd>
          <dt>
            <span id="userModif">
              <Translate contentKey="ibamApp.bonCommande.userModif">User Modif</Translate>
            </span>
          </dt>
          <dd>{bonCommandeEntity.userModif}</dd>
          <dt>
            <span id="dateModif">
              <Translate contentKey="ibamApp.bonCommande.dateModif">Date Modif</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={bonCommandeEntity.dateModif} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="ibamApp.bonCommande.depot">Depot</Translate>
          </dt>
          <dd>{bonCommandeEntity.depot ? bonCommandeEntity.depot.id : ''}</dd>
          <dt>
            <Translate contentKey="ibamApp.bonCommande.fournisseur">Fournisseur</Translate>
          </dt>
          <dd>{bonCommandeEntity.fournisseur ? bonCommandeEntity.fournisseur.id : ''}</dd>
          <div>

            <Button style={{ height: 60,weight:100, marginTop: 10 }} onClick={jsPdfGenerator} color="success" >Download</Button>
          </div>
        </dl>
        <Button tag={Link} to="/bon-commande" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bon-commande/${bonCommandeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bonCommande }: IRootState) => ({
  bonCommandeEntity: bonCommande.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BonCommandeDetail);
