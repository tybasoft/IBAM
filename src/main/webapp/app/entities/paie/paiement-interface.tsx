import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {  AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { IRootState } from 'app/shared/reducers';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Col, Row, Table,Container,Label } from 'reactstrap';
import { Link} from 'react-router-dom';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities } from '../employe/employe.reducer';
import { IEmploye } from 'app/shared/model/employe.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
/* import {GenererPaie }  from 'app/entities/paie/paie.reducer'; */
import { Paie } from './paie';
import Moment from 'moment';



export interface IPaiementProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const Paiement = (props: IPaiementProps) => {
  const [filter, setFilter] = useState('');
  const [montant, setMontant] = useState(null);
  const [rowSelected, setRowSelected] = useState(null);

      const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

    useEffect(() => {
    props.getProjets();
   
  }, []);
  
    /* pour filtrer la liste des employes selon le projet  */
    const changeFilter = evt => setFilter(evt.target.value);
    const filterByProjetId = l => l.projet && l.projet.id.toString().toUpperCase().includes(filter.toUpperCase());
     
  const { projets,employeList,loading} = props;  
   const saveEntity=(event,errors,values)=>{

         const tab=[];
         let cmpt=2;
         if(errors.length===0){
        employeList.filter(filterByProjetId).map((employe,i=0)=>{
             tab[i]={
                 "datePaiement" :Moment(new Date()).format('YYYY-MM-DD'),
                 "dateDebut" : Object.values(values)[0],
                 "dateFin"   : Object.values(values)[1],
                 "nbrJourTravail":Object.values(values)[cmpt+1],
                 "nbrHeurSup" : Object.values(values)[cmpt+3],
                 "montantPay" :Object.values(values)[cmpt+4],
                 "remarques":Object.values(values)[cmpt+5],
                 "employe" :{
                   "id" : employe.id
                 }

             }
             cmpt+=5;
             i++;

        })


        window.console.log(Object.keys(values));
        
            

      
        }
        
   }
     
   
    
 /* 
  employeList.filter(filterByProjetId).map((employe,i=0)=>{
             tab[i]={
                 "datePaiement" :Moment(new Date()).format('YYYY-MM-DD'),
                 "projet":Object.values(values)[2],
                 "dateDebut" : Object.values(values)[0],
                 "dateFin"   : Object.values(values)[1],
                 "nbrJourTravail":Object.values(values)[cmpt+1],
                 "nbHeureJournalier":Object.values(values)[cmpt+2],
                 "nbrHeurSup" : Object.values(values)[cmpt+3],
                 "montantPay" :Object.values(values)[cmpt+4],
                 "remarques":Object.values(values)[cmpt+5],
                 "employe" :{
                   "id" : employe.id
                 }


               
             }
             cmpt+=5;
             i++;

        })
 
 */
  
    
  return (
    <div>
            <AvForm onSubmit={saveEntity}>
                  
            <AvGroup>
                <Row >
                  <Col xs="4">
                  <AvGroup>
                  <Label id="dateDebutLabel" for="paie-dateDebut">
                    <Translate contentKey="ibamApp.paie.dateDebut"><b>Date Debut</b></Translate>
                  </Label>
                  <AvInput id="paie-dateDebut" type="date" className="form-control" name="dateDebut" />
                  </AvGroup>
                  </Col>
                  <Col xs="5">  
                  <AvGroup>
                    <Label id="dateFinLabel" for="paie-dateFin">
                      <Translate contentKey="ibamApp.paie.dateFin"><b>Date Fin</b></Translate>
                    </Label>
                    <AvInput id="paie-dateFin" type="date" className="form-control" name="dateFin" />
                  </AvGroup>
                   </Col>
                  <Col xs="auto">
                    <br/>
                    <Label id="dateJourLabel" for="pointage-dateJour">
                      <b>{"Date paiement :" +new Date().toLocaleDateString()}</b>
                    </Label>
                  </Col>
                  </Row>
              </AvGroup>
                 
            <AvGroup>
              <Row>
              <Col xs="4" sm="4">
                <Button color="primary" className="btn btn-primary float-right " id="generer-paie-ganerale" type="submit">
                    <Translate contentKey="entity.action.genererpaie" >générer paie</Translate>
                  </Button> 
                  </Col>
              <Col xs="6" sm="5">
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
            <b><hr/></b>
 <div className="table-responsive">
        {  employeList &&  employeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
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
                  <Translate contentKey="ibamApp.paie.nbrJourTravail">NombreJourTravail</Translate> 
                </th>

                <th className="hand" >
                  <Translate contentKey="ibamApp.paie.nbHeureJournalier">nbHeureJournalier</Translate> 
                </th>
               
                <th className="hand" >
                  <Translate contentKey="ibamApp.paie.nbrHeurSup">nbrHeureSup</Translate> 
                </th>

               <th className="hand" >
                  <Translate contentKey="ibamApp.paie.montantPay">Montant a paye</Translate> 
                </th>
                 <th className="hand" >
                  <Translate contentKey="ibamApp.paie.remarques">remarque</Translate>
                </th>
              <th>Paiement</th>
               
              </tr>
            </thead>
            <tbody>
           
              {employeList.filter(filterByProjetId).map((employe, i)=> (
                
                <tr key={`entity-${i}`}>
                  
                  <td>{employe.id} </td>
                 <td>{employe.matricule}</td>
                 <td>{employe.nom} {employe.prenom}</td>
                 <td> <AvInput id={employe.id+"1"} type="text" name={"nbrJourTravail"+employe.id}/></td>
                 <td> <AvInput id={employe.id+"2"} type="text" name={"nbHeureJournalier"+employe.id}/></td>
                 <td> <AvInput id={employe.id+"3"} type="text" name={"nbsup"+employe.id} /></td>
                 <td> <AvInput id={employe.id+"4"} type="text" name={"montant"+employe.id}/></td>
                 <td> <AvInput id={employe.id+"5"} type="text" name={"remarque"+employe.id}/></td>
                 <td>
                    <Button color="primary" id={"generer-paie"+employe.id} type="submit">
                      <Translate contentKey="entity.action.genererpaie" >générer</Translate>
                     </Button> 
                           
                </td>
               
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
    projets: storeState.projet.entities,
    employeList : storeState.employe.entities,
    loading: storeState.employe.loading
    

});

const mapDispatchToProps = {
 
  getProjets,
  getEntities,
 

  
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Paiement);
