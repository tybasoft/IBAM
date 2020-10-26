import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';
import { IMateriau } from 'app/shared/model/materiau.model';

export interface IStockDisponible {
  id?: number;
  dateStock?: string;
  userModif?: string;
  remarque?: string;
  dateModif?: string;
  quantite?: string;
  materiel?: IMateriel;
  materiau?: IMateriau;
}

export const defaultValue: Readonly<IStockDisponible> = {};
