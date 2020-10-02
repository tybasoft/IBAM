import { Moment } from 'moment';
import { ILigneBonCommande } from 'app/shared/model/ligne-bon-commande.model';
import { IDepot } from 'app/shared/model/depot.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

export interface IBonCommande {
  id?: number;
  datePrevLiv?: Moment;
  remarques?: string;
  dateCreation?: Moment;
  valide?: boolean;
  userModif?: string;
  dateModif?: Moment;
  ligneBonComs?: ILigneBonCommande[];
  depot?: IDepot;
  fournisseur?: IFournisseur;
}

export const defaultValue: Readonly<IBonCommande> = {
  valide: false
};
