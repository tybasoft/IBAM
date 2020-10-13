import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';
import { ILigneBonReception } from 'app/shared/model/ligne-bon-reception.model';

export interface IBonSortie {
  id?: number;
  dateSortie?: string;
  dateCreation?: string;
  userModif?: string;
  dateModif?: string;
  remarques?: string;
  projet?: IProjet;
  ligneBonSor?: ILigneBonReception[];
}

export const defaultValue: Readonly<IBonSortie> = {};
