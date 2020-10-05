import { Moment } from 'moment';
import { ILigneBonCommande } from 'app/shared/model/ligne-bon-commande.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface IBonCommande {
  id?: number;
  datePrevLiv?: string;
  remarques?: string;
  dateCreation?: string;
  valide?: boolean;
  userModif?: string;
  dateModif?: string;
  ligneBonComs?: ILigneBonCommande[];
  fournisseur?: IFournisseur;
  projet?: IProjet;
}

export const defaultValue: Readonly<IBonCommande> = {
  valide: false
};
