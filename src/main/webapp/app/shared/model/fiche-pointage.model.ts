import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';
import { IPointage } from 'app/shared/model/pointage.model';

export interface IFichePointage {
  id?: number;
  datejour?: string;
  projet?: IProjet;
  pointages?: IPointage[];
}

export const defaultValue: Readonly<IFichePointage> = {};
