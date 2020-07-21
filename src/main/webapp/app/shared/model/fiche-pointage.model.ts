import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';

export interface IFichePointage {
  id?: number;
  dateJour?: string;
  projet?: IProjet;
}

export const defaultValue: Readonly<IFichePointage> = {};
