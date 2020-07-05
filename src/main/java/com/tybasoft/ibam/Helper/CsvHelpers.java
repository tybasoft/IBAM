package com.tybasoft.ibam.Helper;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.tybasoft.ibam.domain.Assurance;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.AssuranceRepository;
import com.tybasoft.ibam.repository.MaterielRepository;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.QuoteMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CsvHelpers {
    public static String TYPE = "text/csv";
    static String[] HEADERs = { "Id", "Title", "Description", "Published" };
    private static SimpleDateFormat userFormat = new SimpleDateFormat("dd/MM/yyyy");
    private static SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
    @Autowired
    private MaterielRepository materielRepo;
    @Autowired
    private AssuranceRepository assuranceRepo;

    public static boolean hasCSVFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public List<Assurance> csvToAssurances(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                CSVParser csvParser = new CSVParser(fileReader,
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

            List<Assurance> Assurances = new ArrayList<Assurance>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                LocalDate dt;

                dt = LocalDate.parse(myFormat.format(userFormat.parse(csvRecord.get("dateDebut"))));

                LocalDate dt1 = LocalDate.parse(myFormat.format(userFormat.parse(csvRecord.get("dateFin"))));
                LocalDate dt2 = LocalDate.parse(myFormat.format(userFormat.parse(csvRecord.get("dateModif"))));
                Optional<Materiel> mt = materielRepo.findById(Long.parseLong(csvRecord.get("materiel_id")));
                Assurance assurance = new Assurance(Long.parseLong(csvRecord.get("id")), dt, dt1,
                        csvRecord.get("agence"), csvRecord.get("userModif"), dt2, mt.get()

                );
                Assurances.add(assurance);

            }

            return Assurances;
        } catch (Exception e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }

    public static ByteArrayInputStream AssurancesToCSV(List<Assurance> Assurances) {
        final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream();
                CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
            for (Assurance assurance : Assurances) {
                List<String> data = Arrays.asList(String.valueOf(assurance.getId()),
                        String.valueOf(assurance.getDateDebut()), String.valueOf(assurance.getDateFin()),
                        assurance.getAgence(), assurance.getUserModif(), String.valueOf(assurance.getDateModif()),
                        String.valueOf(assurance.getMateriel().getId()));

                csvPrinter.printRecord(data);
            }

            csvPrinter.flush();
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to CSV file: " + e.getMessage());
        }
    }

    public void save(MultipartFile file) {
        try {
            List<Assurance> Assurances = csvToAssurances(file.getInputStream());
            assuranceRepo.saveAll(Assurances);
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public ByteArrayInputStream load() {
        List<Assurance> Assurances = assuranceRepo.findAll();

        ByteArrayInputStream in = AssurancesToCSV(Assurances);
        return in;
    }

    public List<Assurance> getAllAssurances() {
        return assuranceRepo.findAll();
    }
}