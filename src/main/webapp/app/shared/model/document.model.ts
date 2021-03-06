import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface IDocument {
  id?: number;
  titre?: string;
  type?: string;
  path?: string;
  commentaire?: string;
  userModif?: string;
  dateModif?: Moment;
  materiels?: IMateriel[];
}

export const defaultValue: Readonly<IDocument> = {};
