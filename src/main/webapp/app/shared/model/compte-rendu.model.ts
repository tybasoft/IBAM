import { IEmploye } from 'app/shared/model/employe.model';

export interface ICompteRendu {
  id?: number;
  titre?: string;
  contenu?: string;
  employe?: IEmploye;
}

export const defaultValue: Readonly<ICompteRendu> = {};
