import { Moment } from 'moment';
import { IMateriau } from 'app/shared/model/materiau.model';

export interface ITva {
  id?: number;
  taux?: string;
  userModif?: string;
  dateModif?: Moment;
  materiaus?: IMateriau[];
}

export const defaultValue: Readonly<ITva> = {};
