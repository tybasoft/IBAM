import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from '../../modules/administration/administration.reducer';
import userManagement, { UserManagementState } from '../../modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from '../../modules/account/register/register.reducer';
import activate, { ActivateState } from '../../modules/account/activate/activate.reducer';
import password, { PasswordState } from '../../modules/account/password/password.reducer';
import settings, { SettingsState } from '../../modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from '../../modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import materiau, {
  MateriauState
} from '../../entities/materiau/materiau.reducer';
// prettier-ignore
import tva, {
  TvaState
} from '../../entities/tva/tva.reducer';
// prettier-ignore
import marque, {
  MarqueState
} from '../../entities/marque/marque.reducer';
// prettier-ignore
import unite, {
  UniteState
} from '../../entities/unite/unite.reducer';
// prettier-ignore
import famille, {
  FamilleState
} from '../../entities/famille/famille.reducer';
// prettier-ignore
import image, {
  ImageState
} from '../../entities/image/image.reducer';
// prettier-ignore
import entreprise, {
  EntrepriseState
} from '../../entities/entreprise/entreprise.reducer';
// prettier-ignore
import ligneBonCommande, {
  LigneBonCommandeState
} from '../../entities/ligne-bon-commande/ligne-bon-commande.reducer';
// prettier-ignore
import ligneBonReception, {
  LigneBonReceptionState
} from '../../entities/ligne-bon-reception/ligne-bon-reception.reducer';
// prettier-ignore
import bonCommande, {
  BonCommandeState
} from '../../entities/bon-commande/bon-commande.reducer';
// prettier-ignore
import bonReception, {
  BonReceptionState
} from '../../entities/bon-reception/bon-reception.reducer';
// prettier-ignore
import fournisseur, {
  FournisseurState
} from '../../entities/fournisseur/fournisseur.reducer';
// prettier-ignore
import depot, {
  DepotState
} from '../../entities/depot/depot.reducer';
// prettier-ignore
import projet, {
  ProjetState
} from '../../entities/projet/projet.reducer';
// prettier-ignore
import equipe, {
  EquipeState
} from '../../entities/equipe/equipe.reducer';
// prettier-ignore
import fonction, {
  FonctionState
} from '../../entities/fonction/fonction.reducer';
// prettier-ignore
import pointage, {
  PointageState
} from '../../entities/pointage/pointage.reducer';
// prettier-ignore
import paie, {
  PaieState
} from '../../entities/paie/paie.reducer';
// prettier-ignore
import horaire, {
  HoraireState
} from '../../entities/horaire/horaire.reducer';
// prettier-ignore
import employe, {
  EmployeState
} from '../../entities/employe/employe.reducer';
// prettier-ignore
import materiel, {
  MaterielState
} from '../../entities/materiel/materiel.reducer';
// prettier-ignore
import assurance, {
  AssuranceState
} from '../../entities/assurance/assurance.reducer';
// prettier-ignore
import typeMateriel, {
  TypeMaterielState
} from '../../entities/type-materiel/type-materiel.reducer';
// prettier-ignore
import document, {
  DocumentState
} from '../../entities/document/document.reducer';
// prettier-ignore
import location, {
  LocationState
} from '../../entities/location/location.reducer';
// prettier-ignore
import transfertMateriel, {
  TransfertMaterielState
} from '../../entities/transfert-materiel/transfert-materiel.reducer';
// prettier-ignore
import consommation, {
  ConsommationState
} from '../../entities/consommation/consommation.reducer';
// prettier-ignore
import maintenance, {
  MaintenanceState
} from '../../entities/maintenance/maintenance.reducer';
// prettier-ignore
import centreMaintenance, {
  CentreMaintenanceState
} from '../../entities/centre-maintenance/centre-maintenance.reducer';
// prettier-ignore
import visiteTechnique, {
  VisiteTechniqueState
} from '../../entities/visite-technique/visite-technique.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from '../../entities/notification/notification.reducer';
// prettier-ignore
import fichePointage, {
  FichePointageState
} from '../../entities/fiche-pointage/fiche-pointage.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

// import external modules
// import internal(own) modules
import calenderReducer from '../../new-template/redux/reducers/calenderReducer';
import emailReducer from '../../new-template/redux/reducers/email/';
// import chatReducer from "./chatReducer";
import chatReducer from '../../new-template/redux/reducers/chat/';
import contactsReducer from '../../new-template/redux/reducers/contacts/';
import todoReducer from '../../new-template/redux/reducers/todo/';
import customizer from '../../new-template/redux/reducers/customizer/';

import { reducer as toastrReducer } from 'react-redux-toastr';
// import Customizer from 'app/new-template/components/customizer/customizer';

export interface IRootState {
  // readonly calendar: any;
  // readonly emailApp: any;
  // readonly contactApp: any;
  // readonly todoApp: any;
  // readonly toastr: any; // <- Mounted at toastr.
  // readonly chatApp: any;
  readonly customizer: any;
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly materiau: MateriauState;
  readonly tva: TvaState;
  readonly marque: MarqueState;
  readonly unite: UniteState;
  readonly famille: FamilleState;
  readonly image: ImageState;
  readonly entreprise: EntrepriseState;
  readonly ligneBonCommande: LigneBonCommandeState;
  readonly ligneBonReception: LigneBonReceptionState;
  readonly bonCommande: BonCommandeState;
  readonly bonReception: BonReceptionState;
  readonly fournisseur: FournisseurState;
  readonly depot: DepotState;
  readonly projet: ProjetState;
  readonly equipe: EquipeState;
  readonly fonction: FonctionState;
  readonly pointage: PointageState;
  readonly paie: PaieState;
  readonly horaire: HoraireState;
  readonly employe: EmployeState;
  readonly materiel: MaterielState;
  readonly assurance: AssuranceState;
  readonly typeMateriel: TypeMaterielState;
  readonly document: DocumentState;
  readonly location: LocationState;
  readonly transfertMateriel: TransfertMaterielState;
  readonly consommation: ConsommationState;
  readonly maintenance: MaintenanceState;
  readonly centreMaintenance: CentreMaintenanceState;
  readonly visiteTechnique: VisiteTechniqueState;
  readonly notification: NotificationState;
  readonly fichePointage: FichePointageState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  // calendar,
  // emailApp,
  // contactApp,
  // todoApp,
  // toastr, // <- Mounted at toastr.
  // chatApp,
  customizer,
  //
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  materiau,
  tva,
  marque,
  unite,
  famille,
  image,
  entreprise,
  ligneBonCommande,
  ligneBonReception,
  bonCommande,
  bonReception,
  fournisseur,
  depot,
  projet,
  equipe,
  fonction,
  pointage,
  paie,
  horaire,
  employe,
  materiel,
  assurance,
  typeMateriel,
  document,
  location,
  transfertMateriel,
  consommation,
  maintenance,
  centreMaintenance,
  visiteTechnique,
  notification,
  fichePointage,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
