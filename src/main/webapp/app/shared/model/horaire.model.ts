import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';

export interface IHoraire {
  id?: number;
  libelle?: string;
  nbrHeurParJr?: string;
  nbrJourParSem?: string;
  heureDebutJr?: string;
  heureFinJr?: string;
  dureePause?: string;
  userModif?: string;
  dateModif?: Moment;
  projets?: IProjet[];
}

export const defaultValue: Readonly<IHoraire> = {};
