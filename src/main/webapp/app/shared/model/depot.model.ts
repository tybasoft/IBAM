import { Moment } from 'moment';
import { IBonCommande } from 'app/shared/model/bon-commande.model';
import { IBonReception } from 'app/shared/model/bon-reception.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface IDepot {
  id?: number;
  libelle?: string;
  adresse?: string;
  tel?: string;
  ville?: string;
  pays?: string;
  userModif?: string;
  dateModif?: Moment;
  bonCommandes?: IBonCommande[];
  bonReceptions?: IBonReception[];
  projets?: IProjet[];
}

export const defaultValue: Readonly<IDepot> = {};
