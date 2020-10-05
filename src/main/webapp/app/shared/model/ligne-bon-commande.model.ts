import { Moment } from 'moment';
import { IMateriau } from 'app/shared/model/materiau.model';
import { IMateriel } from 'app/shared/model/materiel.model';
import { IBonCommande } from 'app/shared/model/bon-commande.model';

export interface ILigneBonCommande {
  id?: number;
  quantite?: string;
  userModif?: string;
  dateModif?: string;
  materiau?: IMateriau;
  materiel?: IMateriel;
  bonCommande?: IBonCommande;
}

export const defaultValue: Readonly<ILigneBonCommande> = {};
