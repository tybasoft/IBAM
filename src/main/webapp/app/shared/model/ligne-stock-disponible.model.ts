import { IMateriel } from 'app/shared/model/materiel.model';
import { IMateriau } from 'app/shared/model/materiau.model';
import { IStockDisponible } from 'app/shared/model/stock-disponible.model';

export interface ILigneStockDisponible {
  id?: number;
  quantite?: string;
  type?: string;
  materiel?: IMateriel;
  materiau?: IMateriau;
  stockDisponible?: IStockDisponible;
}

export const defaultValue: Readonly<ILigneStockDisponible> = {};
