import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';
import { IImage } from 'app/shared/model/image.model';

export interface IEntreprise {
  id?: number;
  entiteJuridique?: string;
  nomCommercial?: string;
  adresse?: string;
  capital?: string;
  direction?: string;
  activite?: string;
  telephone?: string;
  email?: string;
  userModif?: string;
  dateModif?: Moment;
  projets?: IProjet[];
  image?: IImage;
}

export const defaultValue: Readonly<IEntreprise> = {};
