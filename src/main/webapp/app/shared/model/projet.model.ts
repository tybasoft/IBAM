import { Moment } from 'moment';
import { ITransfertMateriel } from 'app/shared/model/transfert-materiel.model';
import { IEquipe } from 'app/shared/model/equipe.model';
import { IEmploye } from 'app/shared/model/employe.model';
import { IEntreprise } from 'app/shared/model/entreprise.model';
import { IHoraire } from 'app/shared/model/horaire.model';
import { IDepot } from 'app/shared/model/depot.model';

export interface IProjet {
  id?: number;
  reference?: string;
  libelle?: string;
  description?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
  nbrEmploye?: string;
  budget?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  userModif?: string;
  dateModif?: Moment;
  transferts?: ITransfertMateriel[];
  equipes?: IEquipe[];
  employes?: IEmploye[];
  entreprise?: IEntreprise;
  horaire?: IHoraire;
  depot?: IDepot;
}

export const defaultValue: Readonly<IProjet> = {};
