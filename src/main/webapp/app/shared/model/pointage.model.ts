import { Moment } from 'moment';
import { IEmploye } from 'app/shared/model/employe.model';
import { IFichePointage } from 'app/shared/model/fiche-pointage.model';

export interface IPointage {
  id?: number;
  dateJour?: string;
  presenceMatin?: boolean;
  presenceAPM?: boolean;
  nbrHeureSup?: string;
  remarques?: string;
  userModif?: string;
  dateModif?: string;
  employe?: IEmploye;
  fichepointage?: IFichePointage;
}

export const defaultValue: Readonly<IPointage> = {
  presenceMatin: false,
  presenceAPM: false
};
