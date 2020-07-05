package com.tybasoft.ibam.service;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Assurance;
import com.tybasoft.ibam.domain.Consommation;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.ConsommationRepository;
import com.tybasoft.ibam.repository.MaterielRepository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.jasperreports.engine.JRParameter;
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
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

@Service
public class ReportService {
    private static final Logger log = LoggerFactory.getLogger(IbamApp.class);
    private String Name;
    private List<Object> dataSource;

    @Autowired
    private PersistService persistService;
    @Autowired
    private ConsommationRepository consommationRepository;
    @Autowired
    private MaterielRepository materielRepository;
    @Autowired
    private FileStorageService fs;

    public boolean exportConsommationReportParMateriel(Long id) {
        boolean generated = true;
        String home = System.getProperty("user.home");
        List data = consommationRepository.findByMaterielId(id);

        try {
            File file = ResourceUtils.getFile("classpath:Files/carburant.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(data);
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("title", "IBAM");
            parameters.put("subtitle", "Intelligent Best Application of Management");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            JasperExportManager.exportReportToPdfFile(jasperPrint, home + "/Downloads/Materiel" + id + ".pdf");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            generated = false;
        }

        return generated;
    }

    public boolean exportConsommationReportParProjet(Long id) {
        boolean generated = true;
        String home = System.getProperty("user.home");
        List<Materiel> list = materielRepository.findAllByProjetId(id);
        List<Consommation> data = new ArrayList<Consommation>();
        List<Consommation> tmp;
        for (Materiel object : list) {
            tmp = consommationRepository.findByMaterielId(object.getId());
            data.addAll(tmp);
        }
        try {
            File file = ResourceUtils.getFile("classpath:Files/carburant.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(data);
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("title", "IBAM");
            parameters.put("subtitle", "Intelligent Best Application of Management");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            JasperExportManager.exportReportToPdfFile(jasperPrint, home + "/Downloads/Projet" + id + ".pdf");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            generated = false;
        }

        return generated;
    }

    private void ExportCSV() {
        String home = System.getProperty("user.home");
        try {
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(this.dataSource);
            File file;
            if (!this.Name.equalsIgnoreCase("employe")) {
                file = ResourceUtils.getFile("classpath:Files/" + this.Name + ".jrxml");
            } else {
                file = ResourceUtils.getFile("classpath:Files/" + this.Name + "-csv.jrxml");
            }
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            Map<String, Object> parameters = new HashMap<>();
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            SimpleExporterInput input = new SimpleExporterInput(jasperPrint);
            SimpleWriterExporterOutput output = new SimpleWriterExporterOutput(
                    home + "/Downloads/" + this.Name + ".csv");
            JRCsvExporter exporter = new JRCsvExporter();
            exporter.setExporterInput(input);
            exporter.setExporterOutput(output);
            exporter.exportReport();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void ExportPDF() {
        String home = System.getProperty("user.home");
        try {
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(this.dataSource);
            File file = ResourceUtils.getFile("classpath:Files/" + this.Name + ".jrxml");

            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("title", "IBAM");
            parameters.put("subtitle", "Intelligent Best Application of Management");
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            JasperExportManager.exportReportToPdfFile(jasperPrint, home + "/Downloads/" + this.Name + ".pdf");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean exportReport(String Format) {

        boolean generated = true;

        if (Format.equalsIgnoreCase("csv")) {
            ExportCSV();
        }
        if (Format.equalsIgnoreCase("pdf")) {
            ExportPDF();
        }

        return (generated);
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

                persistService.PerssistData(name, attributes);
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
