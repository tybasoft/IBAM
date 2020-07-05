package com.tybasoft.ibam.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Assurance;
import com.tybasoft.ibam.domain.BonCommande;
import com.tybasoft.ibam.domain.BonReception;
import com.tybasoft.ibam.domain.CentreMaintenance;
import com.tybasoft.ibam.domain.Consommation;
import com.tybasoft.ibam.domain.Depot;
import com.tybasoft.ibam.domain.Document;
import com.tybasoft.ibam.domain.Document_;
import com.tybasoft.ibam.domain.Employe;
import com.tybasoft.ibam.domain.Entreprise;
import com.tybasoft.ibam.domain.Equipe;
import com.tybasoft.ibam.domain.Famille;
import com.tybasoft.ibam.domain.Fonction;
import com.tybasoft.ibam.domain.Fournisseur;
import com.tybasoft.ibam.domain.Horaire;
import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.domain.LigneBonCommande;
import com.tybasoft.ibam.domain.LigneBonReception;
import com.tybasoft.ibam.domain.Location;
import com.tybasoft.ibam.domain.Maintenance;
import com.tybasoft.ibam.domain.Marque;
import com.tybasoft.ibam.domain.Materiau;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.domain.Paie;
import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.domain.Projet;
import com.tybasoft.ibam.domain.TransfertMateriel;
import com.tybasoft.ibam.domain.Tva;
import com.tybasoft.ibam.domain.TypeMateriel;
import com.tybasoft.ibam.domain.Unite;
import com.tybasoft.ibam.domain.VisiteTechnique;
import com.tybasoft.ibam.repository.AssuranceRepository;
import com.tybasoft.ibam.repository.BonCommandeRepository;
import com.tybasoft.ibam.repository.BonReceptionRepository;
import com.tybasoft.ibam.repository.CentreMaintenanceRepository;
import com.tybasoft.ibam.repository.ConsommationRepository;
import com.tybasoft.ibam.repository.DepotRepository;
import com.tybasoft.ibam.repository.DocumentRepository;
import com.tybasoft.ibam.repository.EmployeRepository;
import com.tybasoft.ibam.repository.EntrepriseRepository;
import com.tybasoft.ibam.repository.EquipeRepository;
import com.tybasoft.ibam.repository.FamilleRepository;
import com.tybasoft.ibam.repository.FonctionRepository;
import com.tybasoft.ibam.repository.FournisseurRepository;
import com.tybasoft.ibam.repository.HoraireRepository;
import com.tybasoft.ibam.repository.ImageRepository;
import com.tybasoft.ibam.repository.LigneBonCommandeRepository;
import com.tybasoft.ibam.repository.LigneBonReceptionRepository;
import com.tybasoft.ibam.repository.LocationRepository;
import com.tybasoft.ibam.repository.MaintenanceRepository;
import com.tybasoft.ibam.repository.MarqueRepository;
import com.tybasoft.ibam.repository.MateriauRepository;
import com.tybasoft.ibam.repository.MaterielRepository;
import com.tybasoft.ibam.repository.PaieRepository;
import com.tybasoft.ibam.repository.PointageRepository;
import com.tybasoft.ibam.repository.ProjetRepository;
import com.tybasoft.ibam.repository.TransfertMaterielRepository;
import com.tybasoft.ibam.repository.TvaRepository;
import com.tybasoft.ibam.repository.TypeMaterielRepository;
import com.tybasoft.ibam.repository.UniteRepository;
import com.tybasoft.ibam.repository.VisiteTechniqueRepository;

@Service
public class PersistService {

    @Autowired
    private AssuranceRepository assurancerepo;
    @Autowired
    private BonCommandeRepository bCommandeRepo;
    @Autowired
    private BonReceptionRepository bReceptionRepo;
    @Autowired
    private CentreMaintenanceRepository CtrMaintenanceRepo;
    @Autowired
    private ConsommationRepository consommationRepo;
    @Autowired
    private DepotRepository depotRepo;
    @Autowired
    private DocumentRepository documentRepo;
    @Autowired
    private EmployeRepository employerepo;
    @Autowired
    private EntrepriseRepository entrepriseRepo;
    @Autowired
    private EquipeRepository equipeRepo;
    @Autowired
    private FamilleRepository familleRepo;
    @Autowired
    private FonctionRepository fonctionRepo;
    @Autowired
    private FournisseurRepository fournisseurRepo;
    @Autowired
    private HoraireRepository horaireRepo;
    @Autowired
    private ImageRepository imageRepo;
    @Autowired
    private LocationRepository locationRepo;
    @Autowired
    private LigneBonCommandeRepository ligneBonCommandeRepo;
    @Autowired
    private LigneBonReceptionRepository ligneBonReceptionRepo;
    @Autowired
    private MaintenanceRepository maintenanceRepo;
    @Autowired
    private MarqueRepository marqueRepo;
    @Autowired
    private MateriauRepository materiauRepo;
    @Autowired
    private MaterielRepository materielRepo;
    @Autowired
    private PaieRepository paieRepo;
    @Autowired
    private PointageRepository pointageRepo;
    @Autowired
    private ProjetRepository projetRepo;
    @Autowired
    private TransfertMaterielRepository transfertMaterielRepo;
    @Autowired
    private TvaRepository tvarepo;
    @Autowired
    private TypeMaterielRepository typeMaterielRepo;
    @Autowired
    private UniteRepository uniteRepo;
    @Autowired
    private VisiteTechniqueRepository visiteTechniqueRepo;

    private static final Logger log = LoggerFactory.getLogger(IbamApp.class);

    public void PerssistData(String name, String[] data) throws ParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-d");

        LocalDate dt;
        switch (name) {
            case ("assurance"):
                Assurance assurance = new Assurance();
                dt = LocalDate.parse(data[1], formatter);
                assurance.setDateDebut(dt);
                dt = LocalDate.parse(data[2], formatter);
                assurance.setDateFin(dt);
                assurance.setAgence(data[3]);
                assurancerepo.save(assurance);
                break;
            case ("bonCommande"):
                BonCommande bCommande = new BonCommande();
                dt = LocalDate.parse(data[1], formatter);
                bCommande.setDatePrevLiv(dt);
                bCommande.setRemarques(data[2]);
                dt = LocalDate.parse(data[3], formatter);
                bCommande.setDateCreation(dt);
                bCommande.setValide(Boolean.parseBoolean(data[4]));
                bCommandeRepo.save(bCommande);
                break;
            case ("bonReception"):
                BonReception bReception = new BonReception();
                bReception.setLivreur(data[1]);
                bReception.setRemarques(data[2]);
                dt = LocalDate.parse(data[3], formatter);
                bReception.setDateLivraison(dt);
                bReceptionRepo.save(bReception);
                break;
            case ("centreMaintenance"):
                CentreMaintenance CtrMaintenance = new CentreMaintenance();
                CtrMaintenance.setLibelle(data[1]);
                CtrMaintenance.setSpecialite(data[2]);
                CtrMaintenance.setResponsable(data[3]);
                CtrMaintenance.setAdresse(data[4]);
                CtrMaintenance.setTelephone(data[5]);
                CtrMaintenance.setEmail(data[6]);
                CtrMaintenanceRepo.save(CtrMaintenance);
                break;
            case ("consommation"):
                Consommation consommation = new Consommation();
                consommation.setReference(data[1]);
                dt = LocalDate.parse(data[2], formatter);
                consommation.setDateAchat(dt);
                consommation.setTypeCarburant(data[3]);
                consommation.setMontant(data[4]);
                consommation.setQuantite(data[5]);
                consommation.setKilometrage(data[6]);
                consommation.setCommentaire(data[7]);
                consommationRepo.save(consommation);
                break;
            case ("depot"):
                Depot depot = new Depot();
                depot.setLibelle(data[1]);
                depot.setAdresse(data[2]);
                depot.setTel(data[3]);
                depot.setVille(data[4]);
                depot.setPays(data[5]);
                depotRepo.save(depot);
                break;
            case ("document"):
                Document document = new Document();
                document.setTitre(data[1]);
                document.setType(data[2]);
                document.setPath(data[3]);
                document.setCommentaire(data[4]);
                documentRepo.save(document);
                break;
            case ("employe"):
                Employe employe = new Employe();
                employe.setNom(data[1]);
                employe.setPrenom(data[2]);
                employe.setMatricule(data[3]);
                employe.setCin(data[4]);
                employe.setSexe(data[5]);
                employe.setTarifJournalier(data[6]);
                dt = LocalDate.parse(data[7], formatter);
                employe.setDateNaissance(dt);
                employe.setLieuNaissance(data[8]);
                employe.setSituationFam(data[9]);
                employe.setNationalite(data[10]);
                dt = LocalDate.parse(data[11], formatter);
                employe.setDateEntree(dt);
                employe.setTel(data[12]);
                employe.setEmail(data[13]);
                employe.setAdresse(data[14]);
                employe.setDivision(data[15]);
                employe.setTypeContrat(data[16]);
                employe.setMultiPorjet(Boolean.valueOf(data[17]));
                dt = LocalDate.parse(data[18], formatter);
                employe.setDateDepart(dt);
                employe.setMotifDepart(data[19]);
                employerepo.save(employe);
                break;
            case ("entreprise"):
                Entreprise entreprise = new Entreprise();
                entreprise.setEntiteJuridique(data[1]);
                entreprise.setNomCommercial(data[2]);
                entreprise.setAdresse(data[3]);
                entreprise.setCapital(data[4]);
                entreprise.setDirection(data[5]);
                entreprise.setActivite(data[6]);
                entreprise.setTelephone(data[7]);
                entreprise.setEmail(data[8]);
                entrepriseRepo.save(entreprise);
                break;
            case ("equipe"):
                Equipe equipe = new Equipe();
                equipe.setLibelle(data[1]);
                equipeRepo.save(equipe);
                break;
            case ("famille"):
                Famille famille = new Famille();
                famille.setLibelle(data[1]);
                famille.setDescription(data[2]);
                familleRepo.save(famille);
                break;
            case ("fonction"):
                Fonction fonction = new Fonction();
                fonction.setLibelle(data[1]);
                fonction.setDescription(data[2]);
                fonction.setCompetences(data[3]);
                fonctionRepo.save(fonction);
                break;
            case ("fournisseur"):
                Fournisseur fournisseur = new Fournisseur();
                fournisseur.setNomCommercial(data[1]);
                fournisseur.setType(data[2]);
                fournisseur.setFax(data[3]);
                fournisseur.setNom(data[4]);
                fournisseur.setPrenom(data[5]);
                fournisseur.setEmail(data[6]);
                fournisseur.setTel(data[7]);
                fournisseur.setAdresse(data[8]);
                fournisseur.setDescription(data[9]);
                fournisseurRepo.save(fournisseur);
                break;
            case ("horaire"):
                Horaire horaire = new Horaire();
                horaire.setLibelle(data[1]);
                horaire.setNbrHeurParJr(data[2]);
                horaire.setNbrJourParSem(data[3]);
                horaire.setHeureDebutJr(data[4]);
                horaire.setHeureFinJr(data[5]);
                horaire.setDureePause(data[5]);
                horaireRepo.save(horaire);
                break;
            case ("image"):
                Image image = new Image();
                image.setTitre(data[1]);
                image.setPath(data[2]);
                imageRepo.save(image);
                break;
            case ("location"):
                Location location = new Location();
                location.setReference(data[1]);
                dt = LocalDate.parse(data[2], formatter);
                location.setDateDebut(dt);
                dt = LocalDate.parse(data[3], formatter);
                location.setDateFin(dt);
                location.setTarif(data[4]);
                location.setDureLocation(data[5]);
                location.setMontantLocation(data[6]);
                location.setRemarque(data[7]);
                locationRepo.save(location);
                break;
            case ("ligneBonCommande"):
                LigneBonCommande ligneBonCommande = new LigneBonCommande();
                ligneBonCommande.setQuantite(data[1]);
                ligneBonCommandeRepo.save(ligneBonCommande);
                break;
            case ("ligneBonReception"):
                LigneBonReception ligneBonReception = new LigneBonReception();
                ligneBonReception.setQuantite(data[1]);
                ligneBonReception.setPrixHt(data[2]);
                ligneBonReceptionRepo.save(ligneBonReception);
                break;
            case ("maintenance"):
                Maintenance maintenance = new Maintenance();
                maintenance.setReference(data[1]);
                dt = LocalDate.parse(data[2], formatter);
                maintenance.setDatePanne(dt);
                maintenance.setFrais(data[3]);
                maintenance.setTechnicien(data[4]);
                maintenance.setMotif(data[5]);
                maintenance.setProblemeFrequent(Boolean.valueOf(data[6]));
                maintenance.setRemarque(data[7]);
                maintenance.setDureePanne(data[8]);
                maintenanceRepo.save(maintenance);
                break;
            case ("marque"):
                Marque marque = new Marque();
                marque.setLibelle(data[1]);
                marque.setDescription(data[2]);
                marqueRepo.save(marque);
                break;
            case ("materiau"):
                Materiau materiau = new Materiau();
                materiau.setLibelle(data[1]);
                materiau.setReference(data[2]);
                materiau.setPoids(data[3]);
                materiau.setVolume(data[4]);
                materiauRepo.save(materiau);
                break;
            case ("materiel"):
                Materiel materiel = new Materiel();
                materiel.setLibelle(data[1]);
                materiel.setMatricule(data[2]);
                materiel.setModele(data[3]);
                materiel.setNumCarteGrise(data[4]);
                dt = LocalDate.parse(data[5], formatter);
                materiel.setDateIdentification(dt);
                materiel.setCompteurAchat(data[6]);
                materiel.setEtat(data[7]);
                materiel.setLocation(Boolean.valueOf(data[8]));
                materiel.setDescription(data[9]);
                materielRepo.save(materiel);
                break;
            case ("paie"):
                Paie paie = new Paie();
                dt = LocalDate.parse(data[1], formatter);
                paie.setDatePaiement(dt);
                paie.setNbrJourTravail(data[2]);
                paie.setMontantPay(data[3]);
                paie.setNbrHeurSup(data[4]);
                dt = LocalDate.parse(data[5], formatter);
                paie.setDateDebut(dt);
                dt = LocalDate.parse(data[6], formatter);
                paie.setDateFin(dt);
                paie.setRemarques(data[7]);
                paieRepo.save(paie);
                break;
            case ("pointage"):
                Pointage pointage = new Pointage();
                dt = LocalDate.parse(data[1], formatter);
                pointage.setDateJour(dt);
                pointage.setPresenceMatin(Boolean.valueOf(data[2]));
                pointage.setPresenceAPM(Boolean.valueOf(data[3]));
                pointage.setNbrHeureSup(data[4]);
                pointage.setRemarques(data[5]);
                pointageRepo.save(pointage);
                break;
            case ("projet"):
                Projet projet = new Projet();
                projet.setReference(data[1]);
                projet.setLibelle(data[2]);
                projet.setDescription(data[3]);
                dt = LocalDate.parse(data[4], formatter);
                projet.setDateDebut(dt);
                dt = LocalDate.parse(data[5], formatter);
                projet.setDateFin(dt);
                projet.setNbrEmploye(data[6]);
                projet.setBudget(data[7]);
                projet.setAdresse(data[8]);
                projet.setVille(data[9]);
                projet.setPays(data[10]);
                projetRepo.save(projet);
                break;
            case ("transfertMateriel"):
                TransfertMateriel transfertMateriel = new TransfertMateriel();
                transfertMateriel.setReference(data[1]);
                dt = LocalDate.parse(data[2], formatter);
                transfertMateriel.setDateTransfert(dt);
                transfertMateriel.setCommentaire(data[3]);
                transfertMaterielRepo.save(transfertMateriel);
                break;
            case ("tva"):
                Tva tva = new Tva();
                tva.setTaux(data[1]);
                tvarepo.save(tva);
                break;
            case ("typeMateriel"):
                TypeMateriel typeMateriel = new TypeMateriel();
                typeMateriel.setType(data[1]);
                typeMaterielRepo.save(typeMateriel);
                break;
            case ("unite"):
                Unite unite = new Unite();
                unite.setLibelle(data[1]);
                unite.setSymbole(data[2]);
                unite.setDescription(data[3]);
                uniteRepo.save(unite);
                break;
            case ("visiteTechnique"):
                VisiteTechnique visiteTechnique = new VisiteTechnique();
                visiteTechnique.setReference(data[1]);
                dt = LocalDate.parse(data[2], formatter);
                visiteTechnique.setDateVisite(dt);
                visiteTechnique.setRemarque(data[3]);
                visiteTechniqueRepo.save(visiteTechnique);

                break;
            default:
                log.info("DEFAULT-------------------------------------");
                break;
        }
    }

}