import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {  AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { IRootState } from 'app/shared/reducers';
import { Button, Col, Row, Table ,Label} from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities } from '../employe/employe.reducer';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
import {getEntities  as getPointages}  from 'app/entities/pointage/pointage.reducer';
import Moment from 'moment';
import {CreateList}  from './pointage.reducer';
import { 
  createEntity,
  getEntity  as getFichePointage } 
  from 'app/entities/fiche-pointage/fiche-pointage.reducer';




export interface IPointageJourProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PointageJour = (props: IPointageJourProps) => {
  const [filter, setFilter] = useState('');
  const [ficheId, setFicheId] = useState(null);
  
  const { 
    projets,
    employeList,
    pointageList,
    FichePointageEntity,
    loading,
    updateSuccess,
    account } = props;
 
  const handleClose = () => {
    props.history.push('/pointage' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {  
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    props.getProjets();
  },[]);

  useEffect(() => {
    props.getEntities();
  },[]);

  useEffect(() => {
    props.getPointages();
  },[]);

  
  /* pour filtrer la liste des employes selon le projet  */
  const changeFilter = evt => setFilter(evt.target.value);
  const filterByProjetId = l => l.projet && l.projet.id.toString().toUpperCase().includes(filter.toUpperCase());
    

  /* Pour tester si le pointage est deja effectue pour la meme projet dans la meme date */
  function  ValidatePointageJour(projectId,datejour){
    let compt=0;
    pointageList.map(pointageelement=>{     
      if(pointageelement.employe.projet.id===Number(projectId)
          &&  pointageelement.dateJour===datejour)
          compt++;
    })

      if(compt>0) 
      return false;
      return  true;
}

 /*  Pour le sauvegarde */
    const saveEntity = (event, errors, values) => {
      const tab=[];
      let fichePointage;
      let entity;
      let cmpt=0;
      fichePointage = {
        ...FichePointageEntity,
        ...values
      };
      if (errors.length === 0) {


        
            fichePointage={
              
              dateJour: Moment(new Date()).format('YYYY-MM-DD'),
              projet: Object.values(values)[0]
              
            }
           
             props.createEntity(fichePointage);
             employeList.filter(filterByProjetId).map((employe,i=0)=>{
              
               tab[i]={
                "dateJour": Moment(new Date()).format('YYYY-MM-DD'),
                "projet" : Object.values(values)[0],
                "presenceMatin" :Object.values(values)[cmpt+1],
                "presenceAPM" :Object.values(values)[cmpt+2],
                "nbrHeureSup" : Object.values(values)[cmpt+3],
                "remarques" : Object.values(values)[cmpt+4],
                "employe" : {
                  "id" : employe.id
                }
                ,
                "fichePointage" : {
                  "id" : FichePointageEntity.id
                }
               }
              cmpt+=4;
              i++;
             }    
           )

           window.console.log(tab[0]);
           if(errors.length === 0 && tab.length>0){
             const valider=ValidatePointageJour(tab[0].projet.id,Moment(new Date()).format('YYYY-MM-DD'));
             if(valider===true){
             props.CreateList(tab);
           
            }else{
             alert("le pointage est déjà effectue ");
            }
          }
   }
       
    
    }

   
  return (
    <div>
        <AvForm   onSubmit={saveEntity}>
            <AvGroup>
                <Row >
                  <Col xs="5"><b>Pointeur : {account.login}</b></Col>
                  <Col xs="5"><b>Fiche Pointage</b></Col>
                  <Col xs="auto">
                    <Label id="dateJourLabel" for="pointage-dateJour">
                      <b>{"Date :" +new Date().toLocaleDateString()}</b>
                    </Label>
                  </Col>
                  </Row>
            </AvGroup>
             <hr/>
            <AvGroup>
                <Row>
                  <Col xs="3"></Col>
                  <Col xs="3"></Col>
                  <Col xs="6" sm="4">
                    <AvInput id="employe-projet" type="select" className="form-control" 
                      name="projet.id" 
                      value={filter} onChange={changeFilter} required>
                        <option value="" key="0"  />
                        {projets ? projets.map(otherEntity => (
                              <option value={otherEntity.id} key={otherEntity.id}  >
                                {otherEntity.libelle}
                              </option>
                            )) 
                          : null}
                    </AvInput>
                  </Col>
                </Row>
            </AvGroup> 
 <div className="table-responsive">
        { employeList &&   employeList.length > 0 ? (
          <Table responsive  >
            <thead>
              <tr  >
                <th className="hand" >
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>  
                <th className="hand" >
                  <Translate contentKey="ibamApp.employe.matricule">Matricule</Translate>
                </th>
                <th className="hand">
                  <Translate contentKey="ibamApp.employe.nomcomplet">Nom et Prenom</Translate>
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
              { employeList.filter(filterByProjetId).map((employe, i)=> (
                <tr   key={employe.id}  >
                  <td>{employe.id} </td>
                  <td>{employe.matricule}</td>
                  <td>{employe.nom +"  "+ employe.prenom}</td>
                  <td> <AvInput id={employe.id+"1"} type="checkbox" name={"Matin"+employe.id}/></td>
                  <td> <AvInput id={employe.id+"2"} type="checkbox" name={"APM"+employe.id} /></td>
                  <td> <AvInput id={employe.id+"3"} type="text" name={"nbsup"+employe.id} /></td>
                  <td> <AvInput id={employe.id+"4"} type="text" name={"observation"+employe.id} /></td>
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
              <Button color="primary" id="save-entity" type="submit" >
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button> 
          </AvForm>      
   </div> 
  );
};


const mapStateToProps = (storeState: IRootState) => ({
    account: storeState.authentication.account,
    projets: storeState.projet.entities,
    employeList : storeState.employe.entities,
    pointageList : storeState.pointage.entities,
    FichePointageEntity : storeState.fichePointage.entity,
    loading: storeState.employe.loading,
    updateSuccess: storeState.pointage.updateSuccess
});

const mapDispatchToProps = {
  getProjets,
  getEntities,
  getPointages,
  createEntity,
  CreateList
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PointageJour);
