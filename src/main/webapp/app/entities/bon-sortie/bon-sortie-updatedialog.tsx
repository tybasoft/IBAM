// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { Link, RouteComponentProps } from 'react-router-dom';
// import { Button, Row, Col, Label } from 'reactstrap';
// import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IRootState } from 'app/shared/reducers';
//
// import { IProjet } from 'app/shared/model/projet.model';
// import { getEntities as getProjets } from 'app/entities/projet/projet.reducer';
// import { getEntity, updateEntity, createEntity, reset } from './bon-sortie.reducer';
// import { IBonSortie } from 'app/shared/model/bon-sortie.model';
// import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import {getEntities as getMateriau} from "app/entities/materiau/materiau.reducer";
// import {getEntities as getMateriels} from "app/entities/materiel/materiel.reducer";
//
// export interface IBonSortieUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
//
// export const BonSortieUpdateDialog = (props: IBonSortieUpdateProps) => {
//   const [projetId, setProjetId] = useState('0');
//   const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
//
//   const { bonSortieEntity, projets, loading, updating } = props;
//
//   const handleClose = () => {
//     props.history.push('/bon-sortie' + props.location.search);
//   };
//
//   useEffect(() => {
//     if (isNew) {
//       props.reset();
//     } else {
//       props.getEntity(props.match.params.id);
//     }
//
//     props.getProjets();
//     props.getMateriau();
//     props.getMateriels();
//   }, []);
//
//   useEffect(() => {
//     if (props.updateSuccess) {
//       handleClose();
//     }
//   }, [props.updateSuccess]);
//
//   const saveEntity = (event, errors, values) => {
//     if (errors.length === 0) {
//       const entity = {
//         ...bonSortieEntity,
//         ...values,
//       };
//
//       if (isNew) {
//         props.createEntity(entity);
//       } else {
//         props.updateEntity(entity);
//       }
//     }
//   };
//
//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2 id="ibamApp.bonSortie.home.createOrEditLabel">
//             <Translate contentKey="ibamApp.bonSortie.home.createOrEditLabel">Create or edit a BonSortie</Translate>
//           </h2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md="8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <AvForm model={isNew ? {} : bonSortieEntity} onSubmit={saveEntity}>
//               {!isNew ? (
//                 <AvGroup>
//                   <Label for="bon-sortie-id">
//                     <Translate contentKey="global.field.id">ID</Translate>
//                   </Label>
//                   <AvInput id="bon-sortie-id" type="text" className="form-control" name="id" required readOnly />
//                 </AvGroup>
//               ) : null}
//               <AvGroup>
//                 <Label id="dateSortieLabel" for="bon-sortie-dateSortie">
//                   <Translate contentKey="ibamApp.bonSortie.dateSortie">Date Sortie</Translate>
//                 </Label>
//                 <AvField
//                   id="bon-sortie-dateSortie"
//                   type="date"
//                   className="form-control"
//                   name="dateSortie"
//                   validate={{
//                     required: { value: true, errorMessage: translate('entity.validation.required') },
//                   }}
//                 />
//               </AvGroup>
//               <AvGroup>
//                 <Label id="dateCreationLabel" for="bon-sortie-dateCreation">
//                   <Translate contentKey="ibamApp.bonSortie.dateCreation">Date Creation</Translate>
//                 </Label>
//                 <AvField id="bon-sortie-dateCreation" type="date" className="form-control" name="dateCreation" />
//               </AvGroup>
//               <AvGroup>
//                 <Label id="userModifLabel" for="bon-sortie-userModif">
//                   <Translate contentKey="ibamApp.bonSortie.userModif">User Modif</Translate>
//                 </Label>
//                 <AvField id="bon-sortie-userModif" type="text" name="userModif" />
//               </AvGroup>
//               <AvGroup>
//                 <Label id="dateModifLabel" for="bon-sortie-dateModif">
//                   <Translate contentKey="ibamApp.bonSortie.dateModif">Date Modif</Translate>
//                 </Label>
//                 <AvField id="bon-sortie-dateModif" type="date" className="form-control" name="dateModif" />
//               </AvGroup>
//               <AvGroup>
//                 <Label id="remarquesLabel" for="bon-sortie-remarques">
//                   <Translate contentKey="ibamApp.bonSortie.remarques">Remarques</Translate>
//                 </Label>
//                 <AvField id="bon-sortie-remarques" type="text" name="remarques" />
//               </AvGroup>
//               <AvGroup>
//                 <Label for="bon-sortie-projet">
//                   <Translate contentKey="ibamApp.bonSortie.projet">Projet</Translate>
//                 </Label>
//                 <AvInput
//                   id="bon-sortie-projet"
//                   type="select"
//                   className="form-control"
//                   name="projet.id"
//                   value={isNew ? projets[0] && projets[0].id : bonSortieEntity.projet?.id}
//                   required
//                 >
//                   {projets
//                     ? projets.map(otherEntity => (
//                         <option value={otherEntity.id} key={otherEntity.id}>
//                           {otherEntity.id}
//                         </option>
//                       ))
//                     : null}
//                 </AvInput>
//                 <AvFeedback>
//                   <Translate contentKey="entity.validation.required">This field is required.</Translate>
//                 </AvFeedback>
//               </AvGroup>
//               <Button tag={Link} id="cancel-save" to="/bon-sortie" replace color="info">
//                 <FontAwesomeIcon icon="arrow-left" />
//                 &nbsp;
//                 <span className="d-none d-md-inline">
//                   <Translate contentKey="entity.action.back">Back</Translate>
//                 </span>
//               </Button>
//               &nbsp;
//               <Button color="primary" id="save-entity" type="submit" disabled={updating}>
//                 <FontAwesomeIcon icon="save" />
//                 &nbsp;
//                 <Translate contentKey="entity.action.save">Save</Translate>
//               </Button>
//             </AvForm>
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };
//
// const mapStateToProps = (storeState: IRootState) => ({
//   projets: storeState.projet.entities,
//   bonSortieEntity: storeState.bonSortie.entity,
//   loading: storeState.bonSortie.loading,
//   updating: storeState.bonSortie.updating,
//   updateSuccess: storeState.bonSortie.updateSuccess,
// });
//
// const mapDispatchToProps = {
//   getProjets,
//   getEntity,
//   updateEntity,
//   createEntity,
//   getMateriels,
//   getMateriau,
//   reset,
// };
//
// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;
//
// export default connect(mapStateToProps, mapDispatchToProps)(BonSortieUpdate);
