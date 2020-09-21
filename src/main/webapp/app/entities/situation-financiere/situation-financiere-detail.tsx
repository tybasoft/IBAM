import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './situation-financiere.reducer';
import { ISituationFinanciere } from 'app/shared/model/situation-financiere.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import jsPDF from "jspdf";
// import PDFJS from 'pdfjs-dist';
// import autoTable  from "jspdf-autotable";

export interface ISituationFinanciereDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SituationFinanciereDetail = (props: ISituationFinanciereDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { situationFinanciereEntity } = props;

  const jsPdfGenerator = ()=> {
    const doc = new jsPDF('p', 'pt');
    // const img = new Image()
    const img = 'content/images/logo-jhipster.png'
    doc.addImage(img, 'png', 10, 10, 180, 40);
    const x = 40;
    const y = 240;
    const h = 40;
    const w = 100;
    const ln = 10;
    doc.setFontSize(28);
    doc.setFont('times', 'bold');
    doc.text('Situation Financiere ', 300, 60);
    doc.setFontSize(11);
    doc.setFont('courier', 'normal');
    doc.text('IBAM Enterprise ', x-10, 65);
    doc.text('ibam@tybasoft.com ', x-10, 85);
    doc.text('Casablanca', x-10, 105);
    doc.text('40140', x-10, 125);
    doc.setFont('times', 'bold');
    // doc.setTextColor("red");
    doc.setFontSize(15);
    doc.cell(x,y,w,h,"Nom/Prenom",ln,"")
    doc.cell(x,y+10,w,h,"Email",ln,"")
    doc.cell(x,y+20,w+10,h,"Telephone/Fax",ln,"")
    doc.cell(x,y+30,w-10,h,"Adresse",ln,"")
    doc.cell(x,y+40,w,h,"Reste",ln,"")
    doc.setFontSize(12);
    doc.setTextColor("black");
    doc.setFont('times', 'normal');
    doc.cell(x,y,100,h+50,situationFinanciereEntity.montantFacture,ln+1,"")
    doc.cell(x,y+10,w,h+50,situationFinanciereEntity.montantEnCours,ln+1,"")
    doc.cell(x,y+20,w+10,h+50,situationFinanciereEntity.dateFacturation,ln+1,"")
    doc.cell(x,y+30,w-10,h+50,situationFinanciereEntity.projet.libelle,ln+1,"")

    doc.text('Merci pour votre confiance ', x+180, 830);

    doc.save('Situation_financiere' + situationFinanciereEntity.id+ '.pdf');
  }
  return (
    <Row>
      <Col md="8">
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
            <span id="montantEnCours">
              <Translate contentKey="ibamApp.situationFinanciere.montantEnCours">Montant En Cours</Translate>
            </span>
          </dt>
          <dd>{situationFinanciereEntity.montantEnCours}</dd>
          <dt>
            <Translate contentKey="ibamApp.situationFinanciere.projet">Projet</Translate>
          </dt>
          <dd>{situationFinanciereEntity.projet ? situationFinanciereEntity.projet.id : ''}</dd>
          <div>
            <Button style={{ height: 60,weight:100, marginTop: 10 }} onClick={jsPdfGenerator} color="success" >Télécharger</Button>
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
