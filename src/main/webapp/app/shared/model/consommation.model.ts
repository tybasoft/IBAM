import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IImage } from 'app/shared/model/image.model';

export interface IConsommation {
  id?: number;
  reference?: string;
  dateAchat?: string;
  typeCarburant?: string;
  montant?: string;
  quantite?: string;
  kilometrage?: string;
  commentaire?: string;
  userModif?: string;
  dateModif?: Moment;
  materiel?: IMateriel;
  fournisseur?: IFournisseur;
  image?: IImage;
}

export const defaultValue: Readonly<IConsommation> = {};
