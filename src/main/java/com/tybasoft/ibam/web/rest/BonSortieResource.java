package com.tybasoft.ibam.web.rest;

import com.itextpdf.text.*;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.tybasoft.ibam.domain.*;
import com.tybasoft.ibam.repository.BonSortieRepository;
import com.tybasoft.ibam.repository.EntrepriseRepository;
import com.tybasoft.ibam.repository.LigneBonSortieRepository;
import com.tybasoft.ibam.service.ReportService;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.money.Monetary;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.BonSortie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BonSortieResource {

    private final Logger log = LoggerFactory.getLogger(BonSortieResource.class);

    private static final String ENTITY_NAME = "bonSortie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BonSortieRepository bonSortieRepository;

    @Autowired
    private LigneBonSortieRepository ligneBonSortieRepository;
    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    ReportService reportService;

    public BonSortieResource(BonSortieRepository bonSortieRepository) {
        this.bonSortieRepository = bonSortieRepository;
    }

    /**
     * {@code POST  /bon-sorties} : Create a new bonSortie.
     *
     * @param bonSortie the bonSortie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bonSortie, or with status {@code 400 (Bad Request)} if the bonSortie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bon-sorties")
    public ResponseEntity<?> createBonSortie(@RequestBody BonSortie bonSortie) throws URISyntaxException {
        log.debug("REST request to save BonReception : {}", bonSortie.getLigneBonSortie());
        if (bonSortie.getId() != null) {
            throw new BadRequestAlertException("A new bonSortie cannot already have an ID", ENTITY_NAME, "idexists");
        }

//        com.tybasoft.ibam.domain.Image image = imageRepository.save(bonReception.getImage());
        BonSortie result = bonSortieRepository.save(bonSortie);
        log.info("My BonSortie lines");
        List<LigneBonSortie> ligneBonSortieList = bonSortie.getLigneBonSortie();
//        log.info(ligneBonReceptionList.toString());
        for(int i=0 ; i<ligneBonSortieList.size() ;i++){
            System.out.println(ligneBonSortieList.get(i).getType());
            LigneBonSortie ligneBonSortie = new LigneBonSortie();
            if(ligneBonSortieList.get(i).getType().equals("materiel")){
                ligneBonSortie.setMateriel(ligneBonSortieList.get(i).getMateriel()); }
            if(ligneBonSortieList.get(i).getType().equals("materiau")){
                ligneBonSortie.setMateriau(ligneBonSortieList.get(i).getMateriau()); }
            if(ligneBonSortieList.get(i).getType().equals("both")){
                ligneBonSortie.setMateriau(ligneBonSortieList.get(i).getMateriau());
                ligneBonSortie.setMateriel(ligneBonSortieList.get(i).getMateriel());}
            ligneBonSortie.setPrixHt(ligneBonSortieList.get(i).getPrixHt());
            ligneBonSortie.setQuantite(ligneBonSortieList.get(i).getQuantite());
            ligneBonSortie.setType(ligneBonSortieList.get(i).getType());
//            ligneBonReception.setMateriau(ligneBonReceptionList.get(i).getMateriau());
            ligneBonSortie.setBonSortie(result);
            ligneBonSortieRepository.save(ligneBonSortie);
        }
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code PUT  /bon-sorties} : Updates an existing bonSortie.
     *
     * @param bonSortie the bonSortie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bonSortie,
     * or with status {@code 400 (Bad Request)} if the bonSortie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bonSortie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bon-sorties")
    public ResponseEntity<BonSortie> updateBonSortie(@Valid @RequestBody BonSortie bonSortie) throws URISyntaxException {
        log.debug("REST request to update BonSortie : {}", bonSortie);
        if (bonSortie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BonSortie result = bonSortieRepository.save(bonSortie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonSortie.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bon-sorties} : get all the bonSorties.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bonSorties in body.
     */
    @GetMapping("/bon-sorties")
    public ResponseEntity<List<BonSortie>> getAllBonSorties(Pageable pageable) {
        log.debug("REST request to get a page of BonSorties");
        Page<BonSortie> page = bonSortieRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bon-sorties/:id} : get the "id" bonSortie.
     *
     * @param id the id of the bonSortie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bonSortie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bon-sorties/{id}")
    public ResponseEntity<BonSortie> getBonSortie(@PathVariable Long id) {
        log.debug("REST request to get BonSortie : {}", id);
        Optional<BonSortie> bonSortie = bonSortieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonSortie);
    }

    /**
     * {@code DELETE  /bon-sorties/:id} : delete the "id" bonSortie.
     *
     * @param id the id of the bonSortie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bon-sorties/{id}")
    public ResponseEntity<Void> deleteBonSortie(@PathVariable Long id) {
        log.debug("REST request to delete BonSortie : {}", id);
        bonSortieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/bon-sorties/report/{id}")
    @ResponseBody
    public Resource getFile(HttpServletRequest request , @PathVariable Long id) throws IOException, URISyntaxException, BadElementException {
        log.debug("DOWNLOAD FILE TEST : {}",id);
        BonSortie bonSortie = bonSortieRepository
            .findById(id).orElseThrow(
                ()-> new BadRequestAlertException("BonSortie not found", ENTITY_NAME, "Bon de Reception"));


        List<LigneBonSortie> ligneBonSortieList = ligneBonSortieRepository.findAllByBonSortie_Id(id);
        int size =  ligneBonSortieList.size();

        Entreprise entreprise = entrepriseRepository.findById(1L).orElseThrow(
            ()-> new BadRequestAlertException("Entreprise not found", ENTITY_NAME, "Entreprise"));
        com.itextpdf.text.Document document = new com.itextpdf.text.Document();
        String logoPath = Paths.get("./src/main/webapp/content/images/").resolve("logo.png").toAbsolutePath()
            .normalize().toString();
        com.itextpdf.text.Image img = Image.getInstance(logoPath);
        PdfPTable table = new PdfPTable(5);
        PdfPTable table1 = new PdfPTable(4);
        PdfPTable table2 = new PdfPTable(5);
        Date dateDownload = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        try
        {
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("HelloWorld.pdf"));
            document.open();
//            document.addTitle("My first PDF");
            Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD,20,BaseColor.BLACK);
            Chunk chunk = new Chunk("\n                               Bon de Sortie");
            chunk.setFont(titleFont);
            LocalDate date = LocalDate.now();
            Paragraph p = new Paragraph();
            p.add(entreprise.getNomCommercial()+"                                                                                                le "+formatter.format(dateDownload));
            p.add("\n "+entreprise.getEntiteJuridique());
            p.add("\n "+entreprise.getEmail());
            p.add("\n "+entreprise.getTelephone());
            p.add("\n "+entreprise.getActivite());
            document.add(img);
            document.add(p);
            document.add(chunk);
            Chunk chunk1 = new Chunk("\n        ");
            document.add(chunk1);
            Paragraph p1 = new Paragraph();
            p1.add("\n                Date de Sortie    : ............................................................."+bonSortie.getProjet().getLibelle());
            p1.add("\n                Date de Creation: ............................................................."+bonSortie.getDateCreation().toString());
            p1.add("\n                Projet                  : ............................................................."+bonSortie.getProjet().getLibelle());
            p1.add("\n                Remarque          : ............................................................."+bonSortie.getRemarques());
            p1.add("                                                                                                                                ");
            document.add(p1);
//            Stream.of("Date de Sortie", "Date de Creation","Projet"  ,"Remarque" ).forEach(columnTitle -> {
//                PdfPCell header1 = new PdfPCell();
//                header1.setBackgroundColor(BaseColor.LIGHT_GRAY);
//                header1.setBorderWidth(2);
//                header1.setPhrase(new Phrase(columnTitle));
//                table1.addCell(header1);
//            });
//            table1.addCell(bonSortie.getDateSortie().toString());
//            table1.addCell(bonSortie.getDateCreation().toString());
//            table1.addCell(bonSortie.getProjet().getLibelle());
//            table1.addCell(bonSortie.getRemarques());
            Chunk chunk2 = new Chunk("\n");
            document.add(table1);
//            document.add(chunk2);
            Stream.of("Les lignes de Bon de reception","Materiau", "Materiel","Quantite","Prix Ht").forEach(columnTitle -> {
                PdfPCell header = new PdfPCell();
                header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(columnTitle));
                table.addCell(header);
            });
            long sumPrix = 0;
            for(int i =0 ; i<size ; i++){
                table.addCell(ligneBonSortieList.get(i).getId().toString());
                System.out.println(ligneBonSortieList.get(i).getType());
                if(ligneBonSortieList.get(i).getType().equals("materiau")){
                    table.addCell(ligneBonSortieList.get(i).getMateriau().getLibelle());
                    table.addCell("--------");
                }
                if(ligneBonSortieList.get(i).getType().equals("materiel")){
                    table.addCell("---------");
                    table.addCell(ligneBonSortieList.get(i).getMateriel().getLibelle());
                }
                if(ligneBonSortieList.get(i).getType().equals("both")){
                    table.addCell(ligneBonSortieList.get(i).getMateriau().getLibelle());
                    table.addCell(ligneBonSortieList.get(i).getMateriel().getLibelle());
                }
                table.addCell(ligneBonSortieList.get(i).getQuantite());
                table.addCell(ligneBonSortieList.get(i).getPrixHt());
                sumPrix = sumPrix + Long.parseLong(ligneBonSortieList.get(i).getPrixHt());


            }
            //CALCULATION OF TVA
            long tva = 0;
            tva = (sumPrix * 20)/100;

            table.addCell("");
            table.addCell("");
            table.addCell("");
            table.addCell("Totale");
            table.addCell(Long.toString(sumPrix));
            //***************************//
            table.addCell("");
            table.addCell("");
            table.addCell("");
            table.addCell("TVA 20%");
            table.addCell(Long.toString(tva));
            //*************************//
            table.addCell("");
            table.addCell("");
            table.addCell("");
            table.addCell("Totale TTC");
            table.addCell(Long.toString(sumPrix+tva));

            System.out.println(sumPrix);
            document.add(table);
            Chunk chunk3 = new Chunk("\n       ");
            document.add(chunk3);
            document.add(table2);
            Chunk chunk4 = new Chunk("\n       ");
            document.add(chunk4);
//            table2.addCell("Le Montant Restant");
//            table2.addCell("");
//            table2.addCell("");
//            table2.addCell(situationFinanciereCourante.getMontantEnCours());
//            document.add(table2);

            document.close();
            writer.close();

            log.info("DONE CREATING FILE");

        } catch (DocumentException e)
        {
            e.printStackTrace();
        } catch (FileNotFoundException e)
        {
            e.printStackTrace();
        }
//        CurrencyUnit usd = Monetary.getCurrencies();
        log.info("Money");
        log.info(Monetary.getCurrencies().toString());
        log.info(Monetary.getCurrencyProviderNames().toString());

        Resource resource = reportService.downloadReport(request,"HelloWorld.pdf");

        return resource;
    }
}
