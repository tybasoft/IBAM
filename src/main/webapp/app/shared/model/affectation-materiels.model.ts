import { Moment } from 'moment';
import { IProjet } from 'app/shared/model/projet.model';
import { IMateriel } from 'app/shared/model/materiel.model';

export interface IAffectationMateriels {
  id?: number;
  dateDebut?: string;
  dateFin?: string;
  description?: string;
  projet?: IProjet;
  materiel?: IMateriel;
}

export const defaultValue: Readonly<IAffectationMateriels> = {};
