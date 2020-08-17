import { Moment } from 'moment';
import { IMateriel } from 'app/shared/model/materiel.model';
import { IEquipe } from 'app/shared/model/equipe.model';
import { IPointage } from 'app/shared/model/pointage.model';
import { IPaie } from 'app/shared/model/paie.model';
import { IProjet } from 'app/shared/model/projet.model';
import { IFonction } from 'app/shared/model/fonction.model';
import { IImage } from 'app/shared/model/image.model';

export interface IEmploye {
  id?: number;
  nom?: string;
  prenom?: string;
  matricule?: string;
  cin?: string;
  sexe?: string;
  tarifJournalier?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  situationFam?: string;
  nationalite?: string;
  dateEntree?: string;
  tel?: string;
  email?: string;
  adresse?: string;
  division?: string;
  typeContrat?: string;
  multiPorjet?: boolean;
  dateDepart?: string;
  motifDepart?: string;
  userModif?: string;
  dateModif?: Moment;
  materiels?: IMateriel[];
  employes?: IEquipe[];
  pointages?: IPointage[];
  paies?: IPaie[];
  projet?: IProjet;
  equipe?: IEquipe;
  fonction?: IFonction;
  image?: IImage;
}

export const defaultValue: Readonly<IEmploye> = {
  multiPorjet: false
};
