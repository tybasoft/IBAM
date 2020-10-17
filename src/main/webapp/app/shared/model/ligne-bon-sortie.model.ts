import { IMateriel } from 'app/shared/model/materiel.model';
import { IMateriau } from 'app/shared/model/materiau.model';
import { IBonSortie } from 'app/shared/model/bon-sortie.model';

export interface ILigneBonSortie {
  id?: number;
  quantite?: string;
  prixHt?: string;
  type?: string;
  materiel?: IMateriel;
  materiau?: IMateriau;
  bonSortie?: IBonSortie;
}

export const defaultValue: Readonly<ILigneBonSortie> = {};
