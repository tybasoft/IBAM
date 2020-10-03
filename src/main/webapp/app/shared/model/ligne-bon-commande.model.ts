import { Moment } from 'moment';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { IMateriau } from 'app/shared/model/materiau.model';

export interface ILigneBonCommande {
  id?: number;
  quantite?: string;
  userModif?: string;
  dateModif?: string;
  bonCommande?: IBonCommande;
  materiau?: IMateriau;
}

export const defaultValue: Readonly<ILigneBonCommande> = {};
