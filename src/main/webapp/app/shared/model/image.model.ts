import { Moment } from 'moment';
import { IMateriau } from 'app/shared/model/materiau.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { IMateriel } from 'app/shared/model/materiel.model';
import { IConsommation } from 'app/shared/model/consommation.model';
import { IMaintenance } from 'app/shared/model/maintenance.model';
import { IEmploye } from 'app/shared/model/employe.model';
import { IBonReception } from 'app/shared/model/bon-reception.model';

export interface IImage {
  id?: number;
  titre?: string;
  path?: string;
  userModif?: string;
  dateModif?: Moment;
  materiaus?: IMateriau[];
  entreprises?: IEntreprise[];
  materiels?: IMateriel[];
  consommations?: IConsommation[];
  maintenances?: IMaintenance[];
  employees?: IEmploye[];
  bonReceptions?: IBonReception[];
}

export const defaultValue: Readonly<IImage> = {};
