import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';
import { IConsommation } from 'app/shared/model/consommation.model';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { IBonReception } from 'app/shared/model/bon-reception.model';

export interface IFournisseur {
  id?: number;
  nomCommercial?: string;
  type?: string;
  fax?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  tel?: string;
  adresse?: string;
  description?: string;
  userModif?: string;
  dateModif?: Moment;
  materiels?: IMateriel[];
  consommations?: IConsommation[];
  bonCommandes?: IBonCommande[];
  bonReceptions?: IBonReception[];
}

export const defaultValue: Readonly<IFournisseur> = {};
