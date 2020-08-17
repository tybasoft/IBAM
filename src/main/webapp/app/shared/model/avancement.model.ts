import { Moment } from 'moment';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';

export interface IAvancement {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  compteRendu?: ICompteRendu;
}

export const defaultValue: Readonly<IAvancement> = {};
