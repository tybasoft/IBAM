package com.tybasoft.ibam.service;

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
import com.tybasoft.ibam.domain.Tva;
import com.tybasoft.ibam.repository.AssuranceRepository;
import com.tybasoft.ibam.repository.BonCommandeRepository;
import com.tybasoft.ibam.repository.BonReceptionRepository;
import com.tybasoft.ibam.repository.CentreMaintenanceRepository;
import com.tybasoft.ibam.repository.ConsommationRepository;
import com.tybasoft.ibam.repository.DepotRepository;
import com.tybasoft.ibam.repository.DocumentRepository;
import com.tybasoft.ibam.repository.MarqueRepository;
import com.tybasoft.ibam.repository.TvaRepository;
import java.io.BufferedReader;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.swing.text.DateFormatter;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRCsvExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleWriterExporterOutput;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.joda.LocalDateParser;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import ch.qos.logback.classic.pattern.DateConverter;

@Service
public class ReportService {
    private static final Logger log = LoggerFactory.getLogger(IbamApp.class);
    private String Name;
    private List<Object> dataSource;

    @Autowired
    private FileStorageService fs;

    @Autowired
    private AssuranceRepository assurancerepo;

    @Autowired
    private MarqueRepository marquerepo;

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
    private TvaRepository tvarepo;

    @Autowired
    private static EntitesCreationService ecs;

    public boolean exportConsommationReport(Set data, Long id) {
        boolean generated = true;
        String home = System.getProperty("user.home");

        try {
            File file = ResourceUtils.getFile("classpath:Files/consommation.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(data);
            Map<String, Object> parameters = new HashMap<>();
            // parameters.put("identifiant",materielId);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            JasperExportManager.exportReportToPdfFile(jasperPrint, home + "/Downloads/" + this.Name + ".pdf");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            generated = false;
        }

        return generated;
    }

    public boolean exportReport(String Format) {
        String home = System.getProperty("user.home");
        boolean generated = true;
        try {
            File file = ResourceUtils.getFile("classpath:Files/" + this.Name + ".jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(this.dataSource);
            Map<String, Object> parameters = new HashMap<>();
            // parameters.put("identifiant",materielId);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            if (Format.equalsIgnoreCase("csv")) {
                SimpleExporterInput input = new SimpleExporterInput(jasperPrint);
                SimpleWriterExporterOutput output = new SimpleWriterExporterOutput(
                        home + "/Downloads/" + this.Name + ".csv");
                JRCsvExporter exporter = new JRCsvExporter();
                exporter.setExporterInput(input);
                exporter.setExporterOutput(output);
                exporter.exportReport();
            }
            if (Format.equalsIgnoreCase("pdf")) {
                JasperExportManager.exportReportToPdfFile(jasperPrint, home + "/Downloads/" + this.Name + ".pdf");
            }
        } catch (Exception e) {
            generated = false;
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return (generated);
    }

    public void PerssistData(String name, String[] data) throws ParseException {
        SimpleDateFormat fromUser = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
        LocalDate dt;
        switch (name) {
            case ("assurance"):
                Assurance assurance = new Assurance();
                dt = LocalDate.parse(myFormat.format(fromUser.parse(data[1])));
                assurance.setDateDebut(dt);
                dt = LocalDate.parse(myFormat.format(fromUser.parse(data[2])));
                assurance.setDateFin(dt);
                assurance.setAgence(data[3]);
                assurancerepo.save(assurance);
                break;
            case ("bonCommande"):
                BonCommande bCommande = new BonCommande();
                dt = LocalDate.parse(myFormat.format(fromUser.parse(data[1])));
                bCommande.setDatePrevLiv(dt);
                bCommande.setRemarques(data[2]);
                dt = LocalDate.parse(myFormat.format(fromUser.parse(data[3])));
                bCommande.setDateCreation(dt);
                bCommande.setValide(Boolean.parseBoolean(data[4]));
                bCommandeRepo.save(bCommande);
                break;
            case ("bonReception"):
                BonReception bReception = new BonReception();
                bReception.setLivreur(data[1]);
                bReception.setRemarques(data[2]);
                dt = LocalDate.parse(myFormat.format(fromUser.parse(data[3])));
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
                dt = LocalDate.parse(myFormat.format(fromUser.parse(data[2])));
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

                break;
            case ("entreprise"):
                // function
                break;
            case ("equipe"):
                // function
                break;
            case ("famille"):
                // function
                break;
            case ("fonction"):
                // function
                break;
            case ("fournisseur"):
                // function
                break;
            case ("horaire"):
                // function
                break;
            case ("image"):
                // function
                break;
            case ("location"):
                // function
                break;
            case ("maintenance"):
                // function
                break;
            case ("marque"):
                // function
                break;
            case ("materiau"):
                // function
                break;
            case ("materiel"):
                // function
                break;
            case ("paie"):
                // function
                break;
            case ("pointage"):
                // function
                break;
            case ("projet"):
                // function
                break;
            case ("transfertMateriel"):
                // function
                break;
            case ("tva"):
                Tva tva = new Tva();
                tva.setTaux(data[1]);
                tvarepo.save(tva);
                break;
            case ("typeMateriel"):
                // function
                break;
            case ("unite"):
                // function
                break;
            case ("visiteTechnique"):
                // function
                break;
            default:
                log.info("DEFAULT-------------------------------------");
                break;
        }
    }

    public void importReport(String filename, String name) {
        String absolutepath = Paths.get("./src/main/webapp/content/uploads/Imports").resolve(filename).toAbsolutePath()
                .normalize().toString();

        Path pathToFile = Paths.get(absolutepath);
        // create an instance of BufferedReader
        // using try with resource, Java 7 feature to close resources
        try (BufferedReader br = Files.newBufferedReader(pathToFile, StandardCharsets.US_ASCII)) { // read the first
            // line from the
            // text file
            br.readLine();
            String line = br.readLine();
            // loop until all lines are read
            while (line != null) {
                // use string.split to load a string array with the values from
                // each line of
                // the file, using a comma as the delimiter
                String[] attributes = line.split(",");

                this.PerssistData(name, attributes);
                // read next line before looping
                // if end of file reached, line would be null
                line = br.readLine();
            }
        } catch (Exception e) {
            log.info(e.getMessage());
        }
    }

    public List<Object> getDataSource() {
        return dataSource;
    }

    public void setDataSource(List<Object> list) {
        this.dataSource = list;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }
}
