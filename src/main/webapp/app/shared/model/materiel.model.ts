import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { IAssurance } from 'app/shared/model/assurance.model';
import { ITransfertMateriel } from 'app/shared/model/transfert-materiel.model';
import { IConsommation } from 'app/shared/model/consommation.model';
import { IMaintenance } from 'app/shared/model/maintenance.model';
import { IVisiteTechnique } from 'app/shared/model/visite-technique.model';
import { IFamille } from 'app/shared/model/famille.model';
import { ITypeMateriel } from 'app/shared/model/type-materiel.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IMarque } from 'app/shared/model/marque.model';
import { IDocument } from 'app/shared/model/document.model';
import { IEmploye } from 'app/shared/model/employe.model';
import { IImage } from 'app/shared/model/image.model';
import { IProjet } from 'app/shared/model/projet.model';

export interface IMateriel {
  id?: number;
  libelle?: string;
  matricule?: string;
  modele?: string;
  numCarteGrise?: string;
  dateIdentification?: string;
  compteurAchat?: string;
  etat?: string;
  location?: boolean;
  description?: string;
  userModif?: string;
  dateModif?: string;
  multiProjet?: boolean;
  locations?: ILocation[];
  assurances?: IAssurance[];
  transferts?: ITransfertMateriel[];
  consommations?: IConsommation[];
  maintenances?: IMaintenance[];
  visitetechniques?: IVisiteTechnique[];
  famille?: IFamille;
  typeMateriel?: ITypeMateriel;
  fournisseur?: IFournisseur;
  marque?: IMarque;
  document?: IDocument;
  employe?: IEmploye;
  image?: IImage;
  projet?: IProjet;
}

export const defaultValue: Readonly<IMateriel> = {
  location: false,
  multiProjet: false
};
