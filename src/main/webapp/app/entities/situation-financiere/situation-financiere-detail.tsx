import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {Translate, ICrudGetAction, TextFormat, getBasePath} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './situation-financiere.reducer';
import { ISituationFinanciere } from 'app/shared/model/situation-financiere.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import jsPDF from "jspdf";
import PDFJS from 'pdfjs-dist';
import autoTable  from "jspdf-autotable";

export interface ISituationFinanciereDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SituationFinanciereDetail = (props: ISituationFinanciereDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { situationFinanciereEntity } = props;
  const jsPdfGenerator = ()=> {
    const headers = [
      {key: 'title', label: 'Title'},
      {key: 'release_date', label: 'Release'},
      {key: 'overview', label: 'Overview'},
      {key: 'vote_average', label: 'Vote Average'},
    ]
    const headers1 = [
      {label: 'Title'},
      {label: 'Release'},
      {label: 'Overview'},
      {label: 'Vote Average'},
    ]
    const doc = new jsPDF('p', 'pt');
    const x = 40;
    const y = 200;
    const h = 40;
    const w = 100;
    const ln = 10;
    doc.setFontSize(25);
    doc.setFont('helvetica', 'bold');
    doc.text('Bon de Commande ', 300, 60);

    //DEPOT Info :
    doc.setFontSize(16);
    doc.cell(x,y,w,h,"Depot",ln-1,"");
    doc.setFontSize(15);
    doc.cell(x,y,w,h,"Libelle",ln,"")
    doc.cell(x,y+10,w,h,"Adresse",ln,"")
    doc.cell(x,y+20,w,h,"Telephone",ln,"")
    doc.cell(x,y+30,w,h,"Ville",ln,"")
    doc.cell(x,y+40,w,h,"Pays",ln,"")
    doc.setFontSize(12);
    doc.cell(x,y,100,h,"test 1",ln+1,"")
    doc.cell(x,y+10,w,h,"test 2",ln+1,"")
    doc.cell(x,y+20,w,h,"test 3",ln+1,"")
    doc.cell(x,y+30,w,h,"test 4",ln+1,"")
    doc.cell(x,y+50,w,h,"test 5",ln+1,"")

    //Fournisseur Info :

    doc.setFontSize(16);
    doc.cell(x,y+10,w,h,"Fournisseur",ln+5,"");
    doc.setFontSize(15);
    doc.cell(x,y,w,h,"Nom et Prenom",ln,"")
    doc.cell(x,y+10,w,h,"Email",ln,"")
    doc.cell(x,y+20,w,h,"Telephone/Fax",ln,"")
    doc.cell(x,y+30,w,h,"Adresse",ln,"")
    doc.cell(x,y+40,w,h,"Type",ln,"")
    doc.setFontSize(12);
    doc.cell(x,y,100,h,"test 1",ln+1,"")
    doc.cell(x,y+10,w,h,"test 2",ln+1,"")
    doc.cell(x,y+20,w,h,"test 3",ln+1,"")
    doc.cell(x,y+30,w,h,"test 4",ln+1,"")
    doc.cell(x,y+50,w,h,"test 5",ln+1,"")

    doc.save('test.pdf');
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
