import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface ITypeMateriel {
  id?: number;
  type?: string;
  userModif?: string;
  dateModif?: Moment;
  materiels?: IMateriel[];
}

export const defaultValue: Readonly<ITypeMateriel> = {};
