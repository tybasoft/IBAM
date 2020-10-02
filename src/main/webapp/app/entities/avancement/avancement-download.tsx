
/*eslint-disable */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser from 'react-html-parser';
import { IRootState } from 'app/shared/reducers';
import jsPDF from "jspdf";
import htmlToImage from 'html-to-image';

import { getEntity } from './avancement.reducer';
import { IAvancement } from 'app/shared/model/avancement.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
export interface IAvancementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvancementDetail = (props: IAvancementDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);
  var mycont;
  var parse = require('html-react-parser');
  const { avancementEntity } = props;
  const sendMail = () =>{
    
  }
  const jsPdfGenerator = ()=> {
    const doc = new jsPDF('p', 'pt');
    // const img = new Image()
    var node = document.getElementById('mycontent');
 
htmlToImage.toPng(node)
  .then(function (dataUrl) {
    mycont = new Image();
    mycont.src = dataUrl;
   
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
    const img = 'content/images/logo-jhipster.png'
    doc.addImage(img, 'png', 10, 10, 180, 40);
    const x = 40;
    const y = 240;
    const h = 40;
    const w = 100;
    const ln = 10;
    doc.setFontSize(28);
    doc.setFont('times', 'bold');
    doc.text('Compte rendu ', 300, 60);
    doc.setFontSize(11);
    doc.setFont('courier', 'normal');
    doc.text('IBAM Enterprise ', x-10, 65);
    doc.text('ibam@tybasoft.com ', x-10, 85);
    doc.text('Casablanca', x-10, 105);
    doc.text('40140', x-10, 125);
    doc.setFont('times', 'bold');
    // doc.setTextColor("red");
    doc.setFontSize(15);
    doc.text('Rédacteur: ', x, y-20);
    doc.text(avancementEntity.employe.nom, x+100, y-20);
    doc.text('Titre compte rendu: ', x, y+10);
    doc.text(avancementEntity.titreCompteRendu, x+150, y+10);
    doc.addImage(mycont, 'png',x,y+20,500,500);
    // doc.cell(x,y+50,w+400,h+1000,avancementEntity.contenuCompteRendu,ln,"")
    doc.setFontSize(12);
    doc.setTextColor("black");
    doc.setFont('times', 'normal');
    // doc.cell(x,y,100,h+50,situationFinanciereEntity.montantFacture,ln+1,"")
    // doc.cell(x,y+10,w,h+50,situationFinanciereEntity.montantEnCours,ln+1,"")
    // doc.cell(x,y+20,w+10,h+50,situationFinanciereEntity.dateFacturation,ln+1,"")
    // doc.cell(x,y+30,w-10,h+50,situationFinanciereEntity.projet.libelle,ln+1,"")

    const d= new Date();
    doc.save('CompteRendu_'+avancementEntity.id+"_"+d.getDate()+"_"+d.getMonth()+"_"+d.getFullYear()+"_"+d.getHours()+"_"+d.getMinutes()+"_"+d.getSeconds()+"_"+d.getMilliseconds()+'.pdf');
  }
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ibamApp.avancement.detail.title">Avancement</Translate> [<b>{avancementEntity.id}</b>]
        </h2>
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
        <Button tag={Link} to="/avancement" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/avancement/${avancementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{''}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
        &nbsp;
        <Button  color="success" tag={Link} to={`/avancement/${avancementEntity.id}/download`}>
          <FontAwesomeIcon icon="download" />{' '}
          <span className="d-none d-md-inline">
                Télecharger le compte rendu sous forme de PDF
          </span>
        </Button>
        &nbsp;
        <Button  color="warning" onclick={sendMail}>
          <FontAwesomeIcon icon="download" />{' '}
          <span className="d-none d-md-inline">
                Envoyer le compte rendu  a l'équipe sous forme de PDF
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ avancement }: IRootState) => ({
  avancementEntity: avancement.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvancementDetail);
