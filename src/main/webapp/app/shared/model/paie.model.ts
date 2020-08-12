import { Moment } from 'moment';
import { IEmploye } from 'app/shared/model/employe.model';

export interface IPaie {
  id?: number;
  datePaiement?: Moment;
  nbrJourTravail?: string;
  montantPay?: string;
  nbrHeurSup?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  remarques?: string;
  userModif?: string;
  dateModif?: Moment;
  employe?: IEmploye;
}

export const defaultValue: Readonly<IPaie> = {};
