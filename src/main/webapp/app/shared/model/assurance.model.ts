import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface IAssurance {
  id?: number;
  dateDebut?: string;
  dateFin?: string;
  agence?: string;
  userModif?: string;
  dateModif?: Moment;
  materiel?: IMateriel;
}

export const defaultValue: Readonly<IAssurance> = {};
