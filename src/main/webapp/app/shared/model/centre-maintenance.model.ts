import { Moment } from 'moment';
import { IMaintenance } from 'app/shared/model/maintenance.model';

export interface ICentreMaintenance {
  id?: number;
  libelle?: string;
  specialite?: string;
  responsable?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  userModif?: string;
  dateModif?: Moment;
  maintenances?: IMaintenance[];
}

export const defaultValue: Readonly<ICentreMaintenance> = {};
