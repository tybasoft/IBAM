package com.tybasoft.ibam.web.rest;

import com.itextpdf.text.*;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.tybasoft.ibam.domain.*;
import com.tybasoft.ibam.repository.BonReceptionRepository;
import com.tybasoft.ibam.repository.EntrepriseRepository;
import com.tybasoft.ibam.repository.ImageRepository;
import com.tybasoft.ibam.repository.LigneBonReceptionRepository;
import com.tybasoft.ibam.service.FileStorageService;
import com.tybasoft.ibam.service.ImageService;
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
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.money.CurrencyUnit;
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
import java.util.*;
import java.util.List;
import java.util.stream.Stream;

/**
 * REST controller for managing {@link com.tybasoft.ibam.domain.BonReception}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BonReceptionResource {

    private final Logger log = LoggerFactory.getLogger(BonReceptionResource.class);

    private static final String ENTITY_NAME = "bonReception";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    LigneBonReceptionRepository ligneBonReceptionRepository;
    @Autowired
    ImageRepository imageRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    ReportService reportService;
    @Autowired
    ImageService imageService;

    @Autowired
    EntrepriseRepository entrepriseRepository;

    private final BonReceptionRepository bonReceptionRepository;

    public BonReceptionResource(BonReceptionRepository bonReceptionRepository) {
        this.bonReceptionRepository = bonReceptionRepository;
    }

    /**
     * {@code POST  /bon-receptions} : Create a new bonReception.
     *
     * @param bonReception the bonReception to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bonReception, or with status {@code 400 (Bad Request)} if the bonReception has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
//    @PostMapping("/bon-receptions")
//    public ResponseEntity<BonReception> createBonReception( @RequestBody BonReception bonReception) throws URISyntaxException {
//        log.debug("REST request to save BonReception : {}", bonReception);
//        if (bonReception.getId() != null) {
//            throw new BadRequestAlertException("A new bonReception cannot already have an ID", ENTITY_NAME, "idexists");
//        }
//        BonReception result = bonReceptionRepository.save(bonReception);
//        return ResponseEntity.created(new URI("/api/bon-receptions/" + result.getId()))
//            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
//            .body(result);
//    }

    @PostMapping("/bon-receptions")
    public ResponseEntity<?> createBonReception(@RequestBody BonReception bonReception) throws URISyntaxException {
        log.debug("REST request to save BonReception : {}", bonReception.getLigneBonRecs());
        if (bonReception.getId() != null) {
            throw new BadRequestAlertException("A new bonReception cannot already have an ID", ENTITY_NAME, "idexists");
        }
        com.tybasoft.ibam.domain.Image resultImage= imageService.createImageEntity(bonReception.getImage());

//        com.tybasoft.ibam.domain.Image image = imageRepository.save(bonReception.getImage());
        BonReception result = bonReceptionRepository.save(bonReception);
        result.setImage(resultImage);
        log.info("My Command lines");
        List<LigneBonReception> ligneBonReceptionList = bonReception.getLigneBonRecs();
//        log.info(ligneBonReceptionList.toString());
        for(int i=0 ; i<ligneBonReceptionList.size() ;i++){
            System.out.println(ligneBonReceptionList.get(i).getType());
            LigneBonReception ligneBonReception = new LigneBonReception();
            if(ligneBonReceptionList.get(i).getType().equals("materiel")){
                ligneBonReception.setMateriel(ligneBonReceptionList.get(i).getMateriel()); }
            if(ligneBonReceptionList.get(i).getType().equals("materiau")){
                ligneBonReception.setMateriau(ligneBonReceptionList.get(i).getMateriau()); }
            if(ligneBonReceptionList.get(i).getType().equals("both")){
                ligneBonReception.setMateriau(ligneBonReceptionList.get(i).getMateriau());
                ligneBonReception.setMateriel(ligneBonReceptionList.get(i).getMateriel());}
            ligneBonReception.setPrixHt(ligneBonReceptionList.get(i).getPrixHt());
            ligneBonReception.setQuantite(ligneBonReceptionList.get(i).getQuantite());
            ligneBonReception.setCurrency(ligneBonReceptionList.get(i).getCurrency());
            ligneBonReception.setType(ligneBonReceptionList.get(i).getType());
//            ligneBonReception.setMateriau(ligneBonReceptionList.get(i).getMateriau());
            ligneBonReception.setBonReception(result);
            ligneBonReceptionRepository.save(ligneBonReception);
        }
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code PUT  /bon-receptions} : Updates an existing bonReception.
     *
     * @param bonReception the bonReception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bonReception,
     * or with status {@code 400 (Bad Request)} if the bonReception is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bonReception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bon-receptions")
    public ResponseEntity<BonReception> updateBonReception(@Valid @RequestBody BonReception bonReception) throws URISyntaxException {
        log.debug("REST request to update BonReception : {}", bonReception);
        if (bonReception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BonReception result = bonReceptionRepository.save(bonReception);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bonReception.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bon-receptions} : get all the bonReceptions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bonReceptions in body.
     */
    @GetMapping("/bon-receptions")
    public ResponseEntity<List<BonReception>> getAllBonReceptions(Pageable pageable) {
        log.debug("REST request to get a page of BonReceptions");
        Page<BonReception> page = bonReceptionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bon-receptions/:id} : get the "id" bonReception.
     *
     * @param id the id of the bonReception to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bonReception, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bon-receptions/{id}")
    public ResponseEntity<BonReception> getBonReception(@PathVariable Long id) {
        log.debug("REST request to get BonReception : {}", id);
        Optional<BonReception> bonReception = bonReceptionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bonReception);
    }

    @GetMapping("/bon-receptions/image/{id}")
    public Resource getImage(@PathVariable Long id){
        BonReception bonReception = bonReceptionRepository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));
        Resource resource = fileStorageService.loadFileAsResource(bonReception.getImage().getPath());
        log.debug("Image : {}", resource);
        return resource;
    }

    /**
     * {@code DELETE  /bon-receptions/:id} : delete the "id" bonReception.
     *
     * @param id the id of the bonReception to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bon-receptions/{id}")
    public ResponseEntity<Void> deleteBonReception(@PathVariable Long id) {
        log.debug("REST request to delete BonReception : {}", id);
        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAllByBonReception_Id(id);
        ligneBonReceptionRepository.deleteAll(ligneBonReceptionList);
        bonReceptionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/bon-receptions/report/{id}")
    @ResponseBody
    public Resource getFile(HttpServletRequest request , @PathVariable Long id) throws IOException, URISyntaxException, BadElementException {
        log.debug("DOWNLOAD FILE TEST : {}",id);
        BonReception bonReception = bonReceptionRepository
            .findById(id).orElseThrow(
                ()-> new BadRequestAlertException("Bon de Reception not found", ENTITY_NAME, "Bon de Reception"));


        List<LigneBonReception> ligneBonCommandesList = ligneBonReceptionRepository.findAllByBonReception_Id(id);
        int size =  ligneBonCommandesList.size();

        Entreprise entreprise = entrepriseRepository.findById(1L).orElseThrow(
            ()-> new BadRequestAlertException("Entreprise not found", ENTITY_NAME, "Entreprise"));
        com.itextpdf.text.Document document = new com.itextpdf.text.Document();
        String logoPath = Paths.get("./src/main/webapp/content/images/").resolve("logo.png").toAbsolutePath()
            .normalize().toString();
        com.itextpdf.text.Image img = Image.getInstance(logoPath);
        PdfPTable table = new PdfPTable(5);
        PdfPTable table1 = new PdfPTable(5);
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
            Chunk chunk = new Chunk("\n                               Bon de Reception");
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
            Stream.of("Livreur", "Date de Livraison","Projet" , "Fournisseur" ,"Remarque" ).forEach(columnTitle -> {
                PdfPCell header1 = new PdfPCell();
                header1.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header1.setBorderWidth(2);
                header1.setPhrase(new Phrase(columnTitle));
                table1.addCell(header1);
            });
            table1.addCell(bonReception.getLivreur());
            table1.addCell(bonReception.getDateLivraison().toString());
            table1.addCell(bonReception.getProjet().getLibelle());
            table1.addCell(bonReception.getFournisseur().getEmail());
            table1.addCell(bonReception.getRemarques());
            Chunk chunk2 = new Chunk("\n       ");
            document.add(table1);
            document.add(chunk2);
            Stream.of("Les lignes de Bon de reception","Materiau", "Materiel","Quantite","Prix Ht").forEach(columnTitle -> {
                PdfPCell header = new PdfPCell();
                header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                header.setBorderWidth(2);
                header.setPhrase(new Phrase(columnTitle));
                table.addCell(header);
            });
            long sumPrix = 0;
            for(int i =0 ; i<size ; i++){
                table.addCell(ligneBonCommandesList.get(i).getId().toString());
                System.out.println(ligneBonCommandesList.get(i).getType());
                if(ligneBonCommandesList.get(i).getType().equals("materiau")){
                    table.addCell(ligneBonCommandesList.get(i).getMateriau().getLibelle());
                    table.addCell("--------");
                }
                if(ligneBonCommandesList.get(i).getType().equals("materiel")){
                    table.addCell("---------");
                    table.addCell(ligneBonCommandesList.get(i).getMateriel().getLibelle());
                }
                if(ligneBonCommandesList.get(i).getType().equals("both")){
                    table.addCell(ligneBonCommandesList.get(i).getMateriau().getLibelle());
                    table.addCell(ligneBonCommandesList.get(i).getMateriel().getLibelle());
                }
                table.addCell(ligneBonCommandesList.get(i).getQuantite());
                table.addCell(ligneBonCommandesList.get(i).getPrixHt());
                sumPrix = sumPrix + Long.parseLong(ligneBonCommandesList.get(i).getPrixHt());


            }
//            table.addCell(ligneBonCommandesList.getId().toString());
//            table.addCell(ligneBonCommandesList.getDateFacturation().toString());
//            table.addCell(ligneBonCommandesList.getMontantFacture());
//            table.addCell(ligneBonCommandesList.getMontantEnCours());
            table2.addCell("La Somme Totale");
            table2.addCell("");
            table2.addCell("");
            table2.addCell("");
            table2.addCell(Long.toString(sumPrix));
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

    @GetMapping("/bon-receptions/currencies")
    public Collection<CurrencyUnit> getCurrencies() {
        log.debug("GET ALL CURRENCIES ");
        Collection<CurrencyUnit> currencyUnits =Monetary.getCurrencies();
        return currencyUnits;
    }






}
