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
    const imgContent = bonReceptionEntity.image.path;
    const x = 40;
    const y = 240;
    const h = 40;
    const w = 100;
    const ln = 10;
    doc.addImage(img, 'png', 10, 10, 180, 40);
    doc.setFontSize(28);
    doc.setFont('times', 'bold');
    doc.text('Bon de Reception ', 300, 60);
    doc.setFontSize(11);
    doc.setFont('courier', 'normal');
    doc.text('IBAM Enterprise ', x-10, 65);
    doc.text('ibam@tybasoft.com ', x-10, 85);
    doc.text('Casablanca', x-10, 105);
    doc.text('40140', x-10, 125);
    doc.setFontSize(12);
    // doc.setFont('times', 'bold');
    doc.text('Id de commande     :  ' + bonReceptionEntity.id, 300, 120);
    doc.text('Date Prev Liv      :  ' + bonReceptionEntity.dateLivraison, 300, 140);
    doc.text('Remarques          :  ' + bonReceptionEntity.remarques, 300, 160);
    doc.text('Date Creation      :  ' + bonReceptionEntity.livreur, 300, 180);

    //DEPOT Info :
    doc.setFontSize(16);
    doc.setTextColor("red");
    doc.setFont('times', 'bold');
    doc.cell(x,y,w,h,"Depot",ln-1,"");
    doc.setFontSize(15);
    doc.cell(x,y,w,h,"Libelle",ln,"")
    doc.cell(x,y+10,w,h,"Adresse",ln,"")
    doc.cell(x,y+20,w+10,h,"Telephone",ln,"")
    doc.cell(x,y+30,w-10,h,"Ville",ln,"")
    doc.cell(x,y+40,w,h,"Pays",ln,"")
    doc.setFontSize(12);
    doc.setTextColor("black");
    doc.setFont('times', 'normal');
    doc.cell(x,y,100,h+50, bonReceptionEntity.depot.libelle,ln+1,"");
    doc.cell(x,y+10,w,h+50,bonReceptionEntity.depot.adresse,ln+1,"");
    doc.cell(x,y+20,w+10,h+50,bonReceptionEntity.depot.tel,ln+1,"");
    doc.cell(x,y+30,w-10,h+50,bonReceptionEntity.depot.ville,ln+1,"");
    doc.cell(x,y+50,w,h+50,bonReceptionEntity.depot.pays,ln+1,"");

    //Fournisseur Info :


    doc.setFontSize(16);
    doc.setTextColor("red");
    doc.setFont('times', 'bold');
    doc.cell(x,y+10,w,h,"Fournisseur",ln+5,"");
    doc.cell(x,y+10,w,h," ",ln+5,"");
    doc.cell(x,y+10,w+10,h," ",ln+5,"");
    doc.cell(x,y+10,w-10,h," ",ln+5,"");
    doc.cell(x,y+10,w,h," ",ln+5,"");
    doc.setFontSize(15);
    doc.cell(x,y,w,h,"Nom/Prenom",ln,"");
    doc.cell(x,y+10,w,h,"Email",ln,"");
    doc.cell(x,y+20,w+10,h,"Telephone/Fax",ln,"");
    doc.cell(x,y+30,w-10,h,"Adresse",ln,"");
    doc.cell(x,y+40,w,h,"Type",ln,"");
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.setTextColor("black");
    doc.cell(x,y,100,h+50,bonReceptionEntity.fournisseur.nom +" "+bonReceptionEntity.fournisseur.prenom,ln+1,"");
    doc.cell(x,y+10,w,h+50,bonReceptionEntity.fournisseur.email,ln+1,"");
    doc.cell(x,y+20,w+10,h+50,bonReceptionEntity.fournisseur.tel+" "+bonReceptionEntity.fournisseur.fax,ln+1,"");
    doc.cell(x,y+30,w-10,h+50,bonReceptionEntity.fournisseur.adresse,ln+1,"");
    doc.cell(x,y+50,w,h+50,bonReceptionEntity.fournisseur.type,ln+1,"");

    //Image
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor("red");
    doc.cell(x,y+60,w,h+200,"Image : ",ln+6,"");
    doc.cell(x,y+60,w+300,h+200," ",ln+6,"");
    doc.addImage(imgContent, 'png', x+150, y+360, 300, 200);



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
