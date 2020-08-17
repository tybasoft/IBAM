import { Moment } from 'moment';
import { ILigneBonCommande } from 'app/shared/model/ligne-bon-commande.model';
import { IDepot } from 'app/shared/model/depot.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

export interface IBonCommande {
  id?: number;
  datePrevLiv?: string;
  remarques?: string;
  dateCreation?: string;
  valide?: boolean;
  userModif?: string;
  dateModif?: string;
  ligneBonComs?: ILigneBonCommande[];
  depot?: IDepot;
  fournisseur?: IFournisseur;
}

export const defaultValue: Readonly<IBonCommande> = {
  valide: false
};
