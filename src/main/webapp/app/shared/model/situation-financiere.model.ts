import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';

export interface ISituationFinanciere {
  id?: number;
  montantFacture?: string;
  montantEnCours?: string;
  dateFacturation?: string;
  projet?: IProjet;
}

export const defaultValue: Readonly<ISituationFinanciere> = {};
