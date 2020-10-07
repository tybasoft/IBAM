import { Moment } from 'moment';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { IMateriau } from 'app/shared/model/materiau.model';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface ILigneBonReception {
  id?: number;
  quantite?: string;
  prixHt?: string;
  userModif?: string;
  dateModif?: string;
  bonReception?: IBonReception;
  materiau?: IMateriau;
  materiel?: IMateriel;
}

export const defaultValue: Readonly<ILigneBonReception> = {};
