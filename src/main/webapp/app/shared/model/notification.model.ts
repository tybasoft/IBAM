import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';

export interface INotification {
  id?: number;
  libelle?: string;
  description?: string;
  date?: string;
  source?: string;
  visualise?: boolean;
  user?: IUser;
}

export const defaultValue: Readonly<INotification> = {
  visualise: false
};
