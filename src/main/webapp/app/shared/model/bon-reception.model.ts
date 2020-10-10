import { Moment } from 'moment';
import { ILigneBonReception } from 'app/shared/model/ligne-bon-reception.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IImage } from 'app/shared/model/image.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface IBonReception {
  id?: number;
  livreur?: string;
  remarques?: string;
  dateLivraison?: string;
  userModif?: string;
  dateModif?: string;
  ligneBonRecs?: ILigneBonReception[];
  fournisseur?: IFournisseur;
  image?: IImage;
  projet?: IProjet;
}

export const defaultValue: Readonly<IBonReception> = {};
