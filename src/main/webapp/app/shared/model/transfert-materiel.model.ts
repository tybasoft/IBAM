import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface ITransfertMateriel {
  id?: number;
  reference?: string;
  dateTransfert?: string;
  commentaire?: string;
  userModif?: string;
  dateModif?: Moment;
  materiel?: IMateriel;
  projet?: IProjet;
}

export const defaultValue: Readonly<ITransfertMateriel> = {};
