import { Moment } from 'moment';
import { IEmploye } from 'app/shared/model/employe.model';

export interface IPlanification {
  id?: number;
  nom_tache?: string;
  description_tache?: string;
  date_debut?: string;
  date_fin?: string;
  employes?: IEmploye[];
}

export const defaultValue: Readonly<IPlanification> = {};
