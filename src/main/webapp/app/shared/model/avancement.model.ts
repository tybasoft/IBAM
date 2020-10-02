import { Moment } from 'moment';
import { IEmploye } from 'app/shared/model/employe.model';

export interface IAvancement {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  titreCompteRendu?: string;
  contenuCompteRendu?: any;
  employe?: IEmploye;
}

export const defaultValue: Readonly<IAvancement> = {};
