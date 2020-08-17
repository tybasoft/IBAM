import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface IVisiteTechnique {
  id?: number;
  reference?: string;
  dateVisite?: string;
  remarque?: string;
  userModif?: string;
  dateModif?: Moment;
  materiel?: IMateriel;
}

export const defaultValue: Readonly<IVisiteTechnique> = {};
