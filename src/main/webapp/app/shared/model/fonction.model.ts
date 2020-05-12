import { Moment } from 'moment';
import { IEmploye } from 'app/shared/model/employe.model';

export interface IFonction {
  id?: number;
  libelle?: string;
  description?: string;
  competences?: string;
  userModif?: string;
  dateModif?: Moment;
  employes?: IEmploye[];
}

export const defaultValue: Readonly<IFonction> = {};
