import { Moment } from 'moment';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { IMateriau } from 'app/shared/model/materiau.model';

export interface ILigneBonReception {
  id?: number;
  quantite?: string;
  prixHt?: string;
  userModif?: string;
  dateModif?: Moment;
  bonReception?: IBonReception;
  materiau?: IMateriau;
}

export const defaultValue: Readonly<ILigneBonReception> = {};
