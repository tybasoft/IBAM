import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface ILocation {
  id?: number;
  reference?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  tarif?: string;
  dureLocation?: string;
  montantLocation?: string;
  remarque?: string;
  userModif?: string;
  dateModif?: Moment;
  materiel?: IMateriel;
}

export const defaultValue: Readonly<ILocation> = {};
