import { Moment } from 'moment';
import { IMateriau } from 'app/shared/model/materiau.model';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface IMarque {
  id?: number;
  libelle?: string;
  description?: string;
  userModif?: string;
  dateModif?: Moment;
  materiaus?: IMateriau[];
  materiels?: IMateriel[];
}

export const defaultValue: Readonly<IMarque> = {};
