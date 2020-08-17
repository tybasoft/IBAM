import { Moment } from 'moment';
import { IEmploye } from 'app/shared/model/employe.model';

export interface IPointage {
  id?: number;
  dateJour?: string;
  presenceMatin?: boolean;
  presenceAPM?: boolean;
  nbrHeureSup?: string;
  remarques?: string;
  userModif?: string;
  dateModif?: Moment;
  employe?: IEmploye;
}

export const defaultValue: Readonly<IPointage> = {
  presenceMatin: false,
  presenceAPM: false
};
