import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './situation-financiere.reducer';
import { ISituationFinanciere } from 'app/shared/model/situation-financiere.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import  {PureComponent} from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export interface ISituationFinanciereDetailProps extends PureComponent , StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SituationFinanciereDetail = (props: ISituationFinanciereDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const [file] = useState('');



  const { situationFinanciereEntity } = props;


  const jsPdfGenerator = ()=>{
    // const elementToPrint = document.getElementById('target');

    const doc = new jsPDF('p','pt','a4');


    const img = 'content/images/logo-jhipster.png'
    // doc.fromHTML(elementToPrint,15,15);
    doc.addImage(img, 'png', 10, 10, 180, 40)
    doc.setFontSize(25);
    doc.setFont('helvetica','bold');
    doc.text('Situation Financiere ',200,100);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Id : '+situationFinanciereEntity.id,40,180);
    doc.text('Montant Facture : '+situationFinanciereEntity.montantFacture +' DH',40,220);
    doc.text('Montant En Cours : '+situationFinanciereEntity.montantEnCours + ' DH',40,260);
    doc.text('Date Facturation : '+situationFinanciereEntity.dateFacturation ,40,300);
    doc.setFontSize(20);
    doc.setFont('times','bold');
    doc.text('Projet Info : ',40,340);
    doc.setFontSize(17);
    doc.setFont('times','normal');
    doc.text('Reference : '+situationFinanciereEntity.projet.reference,80,380);
    doc.text('Libelle : '+situationFinanciereEntity.projet.libelle,80,420);
    doc.text('Description : '+situationFinanciereEntity.projet.description,80,460);
    doc.text('Date Debut : '+situationFinanciereEntity.projet.dateDebut,80,500);
    doc.save('Situation_Financiere_'+situationFinanciereEntity.id+'.pdf');


  }
  return (
    <Row>

      <Col md="8" id="target">
        <h2>
          <Translate contentKey="ibamApp.situationFinanciere.detail.title">SituationFinanciere</Translate> [
          <b>{situationFinanciereEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="montantFacture">
              <Translate contentKey="ibamApp.situationFinanciere.montantFacture">Montant Facture</Translate>
            </span>
          </dt>
          <dd>{situationFinanciereEntity.montantFacture}</dd>
          <dt>
            <span id="montantEnCours">
              <Translate contentKey="ibamApp.situationFinanciere.montantEnCours">Montant En Cours</Translate>
            </span>
          </dt>
          <dd>{situationFinanciereEntity.montantEnCours}</dd>
          <dt>
            <span id="dateFacturation">
              <Translate contentKey="ibamApp.situationFinanciere.dateFacturation">Date Facturation</Translate>
            </span>
          </dt>
          <dd>
            {situationFinanciereEntity.dateFacturation ? (
              <TextFormat value={situationFinanciereEntity.dateFacturation} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ibamApp.situationFinanciere.projet">Projet</Translate>
          </dt>
          <dd>{situationFinanciereEntity.projet ? situationFinanciereEntity.projet.id : ''}</dd>
          <div>

            <Button style={{ height: 60,weight:100, marginTop: 10 }} onClick={jsPdfGenerator} color="success" >Download</Button>
          </div>
        </dl>
        <Button tag={Link} to="/situation-financiere" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/situation-financiere/${situationFinanciereEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ situationFinanciere }: IRootState) => ({
  situationFinanciereEntity: situationFinanciere.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SituationFinanciereDetail);
