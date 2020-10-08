import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';
import customizer from '../../new-template/redux/reducers/customizer/';
import calender from '../../new-template/redux/reducers/calenderReducer';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';

// prettier-ignore
import materiau, {
  MateriauState
} from 'app/entities/materiau/materiau.reducer';
import currency, { CurrenciesState } from 'app/entities/bon-reception/currency.reducer';
// prettier-ignore
import tva, {
  TvaState
} from 'app/entities/tva/tva.reducer';
// prettier-ignore
import marque, {
  MarqueState
} from 'app/entities/marque/marque.reducer';
// prettier-ignore
import unite, {
  UniteState
} from 'app/entities/unite/unite.reducer';
// prettier-ignore
import famille, {
  FamilleState
} from 'app/entities/famille/famille.reducer';
// prettier-ignore
import image, {
  ImageState
} from 'app/entities/image/image.reducer';
// prettier-ignore
import entreprise, {
  EntrepriseState
} from 'app/entities/entreprise/entreprise.reducer';
// prettier-ignore
import ligneBonCommande, {
  LigneBonCommandeState
} from 'app/entities/ligne-bon-commande/ligne-bon-commande.reducer';
// prettier-ignore
import ligneBonReception, {
  LigneBonReceptionState
} from 'app/entities/ligne-bon-reception/ligne-bon-reception.reducer';
// prettier-ignore
import bonCommande, {
  BonCommandeState
} from 'app/entities/bon-commande/bon-commande.reducer';
// prettier-ignore
import bonReception, {
  BonReceptionState
} from 'app/entities/bon-reception/bon-reception.reducer';
// prettier-ignore
import fournisseur, {
  FournisseurState
} from 'app/entities/fournisseur/fournisseur.reducer';
// prettier-ignore
import depot, {
  DepotState
} from 'app/entities/depot/depot.reducer';
// prettier-ignore
import projet, {
  ProjetState
} from 'app/entities/projet/projet.reducer';
// prettier-ignore
import equipe, {
  EquipeState
} from 'app/entities/equipe/equipe.reducer';
// prettier-ignore
import fonction, {
  FonctionState
} from 'app/entities/fonction/fonction.reducer';
// prettier-ignore
import pointage, {
  PointageState
} from 'app/entities/pointage/pointage.reducer';
// prettier-ignore
import paie, {
  PaieState
} from 'app/entities/paie/paie.reducer';
// prettier-ignore
import horaire, {
  HoraireState
} from 'app/entities/horaire/horaire.reducer';
// prettier-ignore
import employe, {
  EmployeState
} from 'app/entities/employe/employe.reducer';
// prettier-ignore
import materiel, {
  MaterielState
} from 'app/entities/materiel/materiel.reducer';
// prettier-ignore
import assurance, {
  AssuranceState
} from 'app/entities/assurance/assurance.reducer';
// prettier-ignore
import typeMateriel, {
  TypeMaterielState
} from 'app/entities/type-materiel/type-materiel.reducer';
// prettier-ignore
import document, {
  DocumentState
} from 'app/entities/document/document.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import transfertMateriel, {
  TransfertMaterielState
} from 'app/entities/transfert-materiel/transfert-materiel.reducer';
// prettier-ignore
import consommation, {
  ConsommationState
} from 'app/entities/consommation/consommation.reducer';
// prettier-ignore
import maintenance, {
  MaintenanceState
} from 'app/entities/maintenance/maintenance.reducer';
// prettier-ignore
import centreMaintenance, {
  CentreMaintenanceState
} from 'app/entities/centre-maintenance/centre-maintenance.reducer';
// prettier-ignore
import visiteTechnique, {
  VisiteTechniqueState
} from 'app/entities/visite-technique/visite-technique.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification.reducer';
// prettier-ignore
import fichePointage, {
  FichePointageState
} from 'app/entities/fiche-pointage/fiche-pointage.reducer';
// prettier-ignore
import affectationMateriels, {
  AffectationMaterielsState
} from 'app/entities/affectation-materiels/affectation-materiels.reducer';
// prettier-ignore
import situationFinanciere, {
  SituationFinanciereState
} from 'app/entities/situation-financiere/situation-financiere.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

import avancement, { AvancementState } from 'app/entities/avancement/avancement.reducer';
import { BonReception } from 'app/entities/bon-reception/bon-reception';
export interface IRootState {
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
  readonly affectationMateriels: AffectationMaterielsState;
  readonly situationFinanciere: SituationFinanciereState;
  readonly currency: CurrenciesState;
  readonly avancement: AvancementState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
  readonly customizer: any;
  readonly calender: any;
}

const rootReducer = combineReducers<IRootState>({
  currency,
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
  affectationMateriels,
  situationFinanciere,
  avancement,
  customizer,
  calender,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
