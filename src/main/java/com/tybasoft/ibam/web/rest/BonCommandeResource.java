package com.tybasoft.ibam.web.rest;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.tybasoft.ibam.domain.BonCommande;
import com.tybasoft.ibam.domain.Entreprise;
import com.tybasoft.ibam.domain.LigneBonCommande;
import com.tybasoft.ibam.domain.SituationFinanciere;
import com.tybasoft.ibam.repository.BonCommandeRepository;
import com.tybasoft.ibam.repository.EntrepriseRepository;
import com.tybasoft.ibam.repository.LigneBonCommandeRepository;
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
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.BonCommande}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BonCommandeResource {

    private final Logger log = LoggerFactory.getLogger(BonCommandeResource.class);

    private static final String ENTITY_NAME = "bonCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    ReportService reportService;

    @Autowired
    EntrepriseRepository entrepriseRepository;

    private final BonCommandeRepository bonCommandeRepository;

    @Autowired
    private LigneBonCommandeRepository ligneBonCommandeRepository;

    public BonCommandeResource(BonCommandeRepository bonCommandeRepository) {
        this.bonCommandeRepository = bonCommandeRepository;
    }

    /**
     * {@code POST  /bon-commandes} : Create a new bonCommande.
     *
     * @param bonCommande the bonCommande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bonCommande, or with status {@code 400 (Bad Request)} if the bonCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bon-commandes")
    public ResponseEntity<?> createBonCommande(@RequestBody BonCommande bonCommande) throws URISyntaxException {
        log.debug("REST request to save BonCommande : {}", bonCommande.getLigneBonComs());
        if (bonCommande.getId() != null) {
            throw new BadRequestAlertException("A new bonCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        System.out.println("Ligne Bon de commande");
        System.out.println(bonCommande);
        BonCommande result = bonCommandeRepository.save(bonCommande);
        log.info("My Command lines");
        List<LigneBonCommande> ligneBonCommandes = bonCommande.getLigneBonComs();
        for(int i=0 ; i<ligneBonCommandes.size() ;i++){
            LigneBonCommande ligneBonCommande = ligneBonCommandes.get(i);
            ligneBonCommande.setBonCommande(result);
            ligneBonCommandeRepository.save(ligneBonCommandes.get(i));
        }
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code PUT  /bon-commandes} : Updates an existing bonCommande.
     *
     * @param bonCommande the bonCommande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bonCommande,
     * or with status {@code 400 (Bad Request)} if the bonCommande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bonCommande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bon-commandes")
    public ResponseEntity<BonCommande> updateBonCommande(@Valid @RequestBody BonCommande bonCommande) throws URISyntaxException {
        log.debug("REST request to update BonCommande : {}", bonCommande);
        if (bonCommande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BonCommande result = bonCommandeRepository.save(bonCommande);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonCommande.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bon-commandes} : get all the bonCommandes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bonCommandes in body.
     */
    @GetMapping("/bon-commandes")
    public ResponseEntity<List<BonCommande>> getAllBonCommandes(Pageable pageable) {
        log.debug("REST request to get a page of BonCommandes");
        Page<BonCommande> page = bonCommandeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bon-commandes/:id} : get the "id" bonCommande.
     *
     * @param id the id of the bonCommande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bonCommande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bon-commandes/{id}")
    public ResponseEntity<BonCommande> getBonCommande(@PathVariable Long id) {
        log.debug("REST request to get BonCommande : {}", id);
        Optional<BonCommande> bonCommande = bonCommandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonCommande);
    }

    /**
     * {@code DELETE  /bon-commandes/:id} : delete the "id" bonCommande.
     *
     * @param id the id of the bonCommande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bon-commandes/{id}")
    public ResponseEntity<Void> deleteBonCommande(@PathVariable Long id) {
        log.debug("REST request to delete BonCommande : {}", id);
        bonCommandeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/bon-commandes/report/{id}")
    @ResponseBody
    public Resource getFile(HttpServletRequest request , @PathVariable Long id) throws IOException, URISyntaxException, BadElementException {
        log.debug("DOWNLOAD FILE TEST : {}",id);
        BonCommande bonCommande = bonCommandeRepository
            .findById(id).orElseThrow(
                ()-> new BadRequestAlertException("Bon de Commande not found", ENTITY_NAME, "Bon de Commande"));


        List<LigneBonCommande> ligneBonCommandesList = ligneBonCommandeRepository.findAllByBonCommande_Id(id);
        int size =  ligneBonCommandesList.size();

        Entreprise entreprise = entrepriseRepository.findById(1L).orElseThrow(
            ()-> new BadRequestAlertException("Entreprise not found", ENTITY_NAME, "Entreprise"));
        Document document = new Document();
        String logoPath = Paths.get("./src/main/webapp/content/images/").resolve("logo.png").toAbsolutePath()
            .normalize().toString();
        Image img = Image.getInstance(logoPath);
        PdfPTable table = new PdfPTable(4);
        PdfPTable table1 = new PdfPTable(5);
        PdfPTable table2 = new PdfPTable(4);
        Date dateDownload = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

        try
        {
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("HelloWorld.pdf"));
            document.open();
            document.addTitle("My first PDF");
            Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD,20,BaseColor.BLACK);
            Chunk chunk = new Chunk("\n                               Bon de Commande");
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
            Stream.of("Date Prev liv", "Date de creation","Fournisseur" , "Projet" ,"Remarque" ).forEach(columnTitle -> {
                PdfPCell header1 = new PdfPCell();
                header1.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header1.setBorderWidth(2);
                header1.setPhrase(new Phrase(columnTitle));
                table1.addCell(header1);
            });
            table1.addCell(bonCommande.getDatePrevLiv().toString());
            table1.addCell(bonCommande.getDateCreation().toString());
            table1.addCell(bonCommande.getProjet().getLibelle());
            table1.addCell(bonCommande.getFournisseur().getEmail());
            table1.addCell(bonCommande.getRemarques());
            Chunk chunk2 = new Chunk("\n       ");
            document.add(table1);
            document.add(chunk2);
            Stream.of("Les lignes de Bon de commande","Quantite","Materiau", "Materiel").forEach(columnTitle -> {
                PdfPCell header = new PdfPCell();
                header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(columnTitle));
                table.addCell(header);
            });
            for(int i =0 ; i<size ; i++){
                table.addCell(ligneBonCommandesList.get(i).getId().toString());
                table.addCell(ligneBonCommandesList.get(i).getQuantite());
                table.addCell(ligneBonCommandesList.get(i).getMateriau().getLibelle());
                table.addCell(ligneBonCommandesList.get(i).getMateriel().getLibelle());
            }
//            table.addCell(ligneBonCommandesList.getId().toString());
//            table.addCell(ligneBonCommandesList.getDateFacturation().toString());
//            table.addCell(ligneBonCommandesList.getMontantFacture());
//            table.addCell(ligneBonCommandesList.getMontantEnCours());
            document.add(table);
            Chunk chunk3 = new Chunk("\n       ");
            document.add(chunk3);
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

        Resource resource = reportService.downloadReport(request,"HelloWorld.pdf");

        return resource;
    }
}
