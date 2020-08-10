import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {  Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { IRootState } from 'app/shared/reducers';
import { getEntity,getEntitiesPointage } from '../fiche-pointage/fiche-pointage.reducer';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { getEntity as getProjet } from 'app/entities/projet/projet.reducer';
import {  updateEntity, createEntity, reset } from './pointage.reducer';
import {updateEntity as updatefichePointage } from '../fiche-pointage/fiche-pointage.reducer';
import { UpdatePointageList }   from './pointage.reducer';



export interface IPointageJourUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PointageJourUpdate = (props: IPointageJourUpdateProps) => {
  const [modal, setModal] = useState(false);
  const [dateJourPointage,setDateJourPointage]=useState('')
  const [projet,setProjet]=useState('')
  
  
  useEffect(() => {
    props.getEntity(props.match.params.id);
    
  }, []);

  const handleClose = () => {
    props.history.push('/fiche-pointage' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {  
      handleClose();
    }
  }, [props.updateSuccess]);
  

  const { fichePointageEntity,fichePointageList,loading} = props;

  useEffect(() => {
    if(fichePointageEntity.id!==undefined ){
      fichePointageEntity.dateJour!==null ? setDateJourPointage(fichePointageEntity.dateJour):setDateJourPointage(null)
      fichePointageEntity.projet!==null ? setProjet(fichePointageEntity.projet.libelle):setProjet(null)
    }
    props.getEntitiesPointage(Number(props.match.params.id));
  },[fichePointageEntity]);


   useEffect(()=>{
    setModal(true);
   },[fichePointageEntity]);
   
  
  const toggle = () => setModal(!modal);

  const  saveEntity=(event,errors,values)=>{

    const  tab=[];
    let   cmpt=0;

  if(fichePointageList.length>0){
    fichePointageList.map((pointage,i)=>{

        tab[i]={
            "id" : pointage.id,
            "dateJour": dateJourPointage,
            "presenceMatin" :Object.values(values)[cmpt],
            "presenceAPM" :Object.values(values)[cmpt+1],
            "nbrHeureSup" : Object.values(values)[cmpt+2],
            "remarques" : Object.values(values)[cmpt+3],
            "employe" : {
              "id" : pointage.employe.id
            },
            "fichePointage" :  {
                id:fichePointageEntity.id,
                dateJour: fichePointageEntity.dateJour,
                projet:fichePointageEntity.projet
          }
        }
        cmpt+=4;
        i++;
    });
            if(tab.length>0){
                props.UpdatePointageList(tab);
                }
              }
            }
  return (

  <div>
  
      <Modal isOpen={modal}  style={{maxWidth: '1600px', width: '80%'}}>
      <AvForm   onSubmit={saveEntity}>
          <ModalHeader> 
            <Row>
              <Col xs="auto" >
                <b>Date : </b>  {dateJourPointage}
              </Col>
              <Col xs="auto">
                <b>Projet : </b>  {projet}
              </Col>
              </Row>              
          </ModalHeader>
          <ModalBody>
         
              <div className="table-responsive">
                  { fichePointageList &&   fichePointageList.length > 0 ? (
                    <Table responsive  >
                      <thead>
                        <tr  >
                          <th className="hand" >
                            <Translate contentKey="global.field.id">ID</Translate>
                          </th>  
                          <th className="hand">
                            <Translate contentKey="ibamApp.employe.nomcomplet">Nom et Prenom</Translate>
                          </th>
                          <th className="hand" >
                            <Translate contentKey="ibamApp.employe.matricule">Matricule</Translate>
                          </th>
                          <th className="hand" >
                            <Translate contentKey="ibamApp.pointage.presenceMatin">Nb / Heure Matin</Translate>
                          </th>
                        
                          <th className="hand" >
                            <Translate contentKey="ibamApp.pointage.presenceAPM">Nb / Heure Après-midi</Translate>
                          </th>
                  
                          <th className="hand" >
                            <Translate contentKey="ibamApp.pointage.nbrHeureSup">Nb / H,sup</Translate>
                          </th>
                          <th className="hand" >
                            <Translate contentKey="ibamApp.pointage.remarques">Observation</Translate>
                          </th>   
                        </tr>
                      </thead>
                      <tbody>
                        { fichePointageList.map((pointage, i)=> (
                          <tr   key={pointage.id}  >
                            <td>{pointage.id} </td>
                            <td>{pointage.employe.nom +"  "+ pointage.employe.prenom}</td>
                            <td>{pointage.employe.matricule}</td>
                            <td> <AvInput id={pointage.id+"1"} type="checkbox" name={"Matin"+pointage.id}  value={pointage.presenceMatin}/></td>
                            <td> <AvInput id={pointage.id+"2"} type="checkbox" name={"APM"+pointage.id} value={pointage.presenceAPM}  /></td>
                            <td> <AvInput id={pointage.id+"3"} type="text" name={"nbsup"+pointage.id}  value={pointage.nbrHeureSup} /></td>
                            <td> <AvInput id={pointage.id+"4"} type="text" name={"observation"+pointage.id}  value={pointage.remarques} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    !loading && (
                      <div className="alert alert-warning">
                        <Translate contentKey="ibamApp.employe.home.notFound">No Employes found</Translate>
                      </div>
                    )
                  )}
                </div> 
            </ModalBody>
            <ModalFooter> 
                  <Button   color="primary" id="save-entity" type="submit"   className="btn btn-primary mr-2 float-right jh-create-entity" >
                    <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                      </Button>
                      <Button tag={Link} id="cancel-save" to="/fiche-pointage"  className="btn btn-primary mr-2 float-right jh-create-entity"  replace color="info">
                      <FontAwesomeIcon icon="arrow-left" />
                        &nbsp;
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.back">Back</Translate>
                        </span>
                  </Button>
            </ModalFooter>  
            </AvForm> 
            </Modal>
            </div> 
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  fichePointageList: storeState.fichePointage.entitiespointage,
  fichePointageEntity: storeState.fichePointage.entity,
  projetEntity: storeState.projet.entity,
  loading: storeState.fichePointage.loading,
  updateSuccess: storeState.pointage.updateSuccess
});

const mapDispatchToProps = {getProjet, 
  getEntity,
  getEntitiesPointage,
  updateEntity,
  updatefichePointage,
  UpdatePointageList
 };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;



export default connect(mapStateToProps, mapDispatchToProps)(PointageJourUpdate);
