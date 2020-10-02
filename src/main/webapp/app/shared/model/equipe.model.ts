import { Moment } from 'moment';
import { IEmploye } from 'app/shared/model/employe.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface IEquipe {
  id?: number;
  libelle?: string;
  userModif?: string;
  dateModif?: Moment;
  employes?: IEmploye[];
  projet?: IProjet;
  equipe?: IEmploye;
}

export const defaultValue: Readonly<IEquipe> = {};
