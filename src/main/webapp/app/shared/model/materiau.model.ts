import { Moment } from 'moment';
import { ILigneBonReception } from 'app/shared/model/ligne-bon-reception.model';
import { ILigneBonCommande } from 'app/shared/model/ligne-bon-commande.model';
import { IMarque } from 'app/shared/model/marque.model';
import { IUnite } from 'app/shared/model/unite.model';
import { IFamille } from 'app/shared/model/famille.model';
import { ITva } from 'app/shared/model/tva.model';
import { IImage } from 'app/shared/model/image.model';

export interface IMateriau {
  id?: number;
  libelle?: string;
  reference?: string;
  poids?: string;
  volume?: string;
  userModif?: string;
  dateModif?: Moment;
  ligneBonRecs?: ILigneBonReception[];
  ligneBonComs?: ILigneBonCommande[];
  marque?: IMarque;
  unite?: IUnite;
  famille?: IFamille;
  tva?: ITva;
  image?: IImage;
}

export const defaultValue: Readonly<IMateriau> = {};
