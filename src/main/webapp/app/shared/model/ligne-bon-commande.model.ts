import { Moment } from 'moment';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { IMateriau } from 'app/shared/model/materiau.model';
import { IMateriel } from './materiel.model';

export interface ILigneBonCommande {
  id?: number;
  quantite?: string;
  userModif?: string;
  dateModif?: Moment;
  bonCommande?: IBonCommande;
  materiau?: IMateriau;
  materiel?: IMateriel;
}

export const defaultValue: Readonly<ILigneBonCommande> = {};
