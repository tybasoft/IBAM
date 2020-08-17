import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';
import { ICentreMaintenance } from 'app/shared/model/centre-maintenance.model';
import { IImage } from 'app/shared/model/image.model';

export interface IMaintenance {
  id?: number;
  reference?: string;
  datePanne?: string;
  frais?: string;
  technicien?: string;
  motif?: string;
  problemeFrequent?: boolean;
  remarque?: string;
  dureePanne?: string;
  userModif?: string;
  dateModif?: Moment;
  materiel?: IMateriel;
  centreMaintenance?: ICentreMaintenance;
  image?: IImage;
}

export const defaultValue: Readonly<IMaintenance> = {
  problemeFrequent: false
};
