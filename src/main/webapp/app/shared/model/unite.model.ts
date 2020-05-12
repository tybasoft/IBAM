import { Moment } from 'moment';
import { IMateriau } from 'app/shared/model/materiau.model';

export interface IUnite {
  id?: number;
  libelle?: string;
  symbole?: string;
  description?: string;
  userModif?: string;
  dateModif?: Moment;
  materiaus?: IMateriau[];
}

export const defaultValue: Readonly<IUnite> = {};
