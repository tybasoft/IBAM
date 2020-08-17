import { Moment } from 'moment';
import { ILigneBonReception } from 'app/shared/model/ligne-bon-reception.model';
import { IDepot } from 'app/shared/model/depot.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IImage } from 'app/shared/model/image.model';

export interface IBonReception {
  id?: number;
  livreur?: string;
  remarques?: string;
  dateLivraison?: string;
  userModif?: string;
  dateModif?: string;
  ligneBonRecs?: ILigneBonReception[];
  depot?: IDepot;
  fournisseur?: IFournisseur;
  image?: IImage;
}

export const defaultValue: Readonly<IBonReception> = {};
