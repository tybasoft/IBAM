package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.MaterielRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MaterielResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MaterielResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_MATRICULE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE = "BBBBBBBBBB";

    private static final String DEFAULT_MODELE = "AAAAAAAAAA";
    private static final String UPDATED_MODELE = "BBBBBBBBBB";

    private static final String DEFAULT_NUM_CARTE_GRISE = "AAAAAAAAAA";
    private static final String UPDATED_NUM_CARTE_GRISE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_IDENTIFICATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_IDENTIFICATION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMPTEUR_ACHAT = "AAAAAAAAAA";
    private static final String UPDATED_COMPTEUR_ACHAT = "BBBBBBBBBB";

    private static final String DEFAULT_ETAT = "AAAAAAAAAA";
    private static final String UPDATED_ETAT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_LOCATION = false;
    private static final Boolean UPDATED_LOCATION = true;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_MULTI_PROJET = false;
    private static final Boolean UPDATED_MULTI_PROJET = true;

    @Autowired
    private MaterielRepository materielRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMaterielMockMvc;

    private Materiel materiel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Materiel createEntity(EntityManager em) {
        Materiel materiel = new Materiel()
            .libelle(DEFAULT_LIBELLE)
            .matricule(DEFAULT_MATRICULE)
            .modele(DEFAULT_MODELE)
            .numCarteGrise(DEFAULT_NUM_CARTE_GRISE)
            .dateIdentification(DEFAULT_DATE_IDENTIFICATION)
            .compteurAchat(DEFAULT_COMPTEUR_ACHAT)
            .etat(DEFAULT_ETAT)
            .location(DEFAULT_LOCATION)
            .description(DEFAULT_DESCRIPTION)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF)
            .multiProjet(DEFAULT_MULTI_PROJET);
        return materiel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Materiel createUpdatedEntity(EntityManager em) {
        Materiel materiel = new Materiel()
            .libelle(UPDATED_LIBELLE)
            .matricule(UPDATED_MATRICULE)
            .modele(UPDATED_MODELE)
            .numCarteGrise(UPDATED_NUM_CARTE_GRISE)
            .dateIdentification(UPDATED_DATE_IDENTIFICATION)
            .compteurAchat(UPDATED_COMPTEUR_ACHAT)
            .etat(UPDATED_ETAT)
            .location(UPDATED_LOCATION)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF)
            .multiProjet(UPDATED_MULTI_PROJET);
        return materiel;
    }

    @BeforeEach
    public void initTest() {
        materiel = createEntity(em);
    }

    @Test
    @Transactional
    public void createMateriel() throws Exception {
        int databaseSizeBeforeCreate = materielRepository.findAll().size();
        // Create the Materiel
        restMaterielMockMvc.perform(post("/api/materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isCreated());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeCreate + 1);
        Materiel testMateriel = materielList.get(materielList.size() - 1);
        assertThat(testMateriel.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testMateriel.getMatricule()).isEqualTo(DEFAULT_MATRICULE);
        assertThat(testMateriel.getModele()).isEqualTo(DEFAULT_MODELE);
        assertThat(testMateriel.getNumCarteGrise()).isEqualTo(DEFAULT_NUM_CARTE_GRISE);
        assertThat(testMateriel.getDateIdentification()).isEqualTo(DEFAULT_DATE_IDENTIFICATION);
        assertThat(testMateriel.getCompteurAchat()).isEqualTo(DEFAULT_COMPTEUR_ACHAT);
        assertThat(testMateriel.getEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testMateriel.isLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testMateriel.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMateriel.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testMateriel.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
        assertThat(testMateriel.isMultiProjet()).isEqualTo(DEFAULT_MULTI_PROJET);
    }

    @Test
    @Transactional
    public void createMaterielWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materielRepository.findAll().size();

        // Create the Materiel with an existing ID
        materiel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterielMockMvc.perform(post("/api/materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = materielRepository.findAll().size();
        // set the field null
        materiel.setLibelle(null);

        // Create the Materiel, which fails.


        restMaterielMockMvc.perform(post("/api/materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumCarteGriseIsRequired() throws Exception {
        int databaseSizeBeforeTest = materielRepository.findAll().size();
        // set the field null
        materiel.setNumCarteGrise(null);

        // Create the Materiel, which fails.


        restMaterielMockMvc.perform(post("/api/materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMultiProjetIsRequired() throws Exception {
        int databaseSizeBeforeTest = materielRepository.findAll().size();
        // set the field null
        materiel.setMultiProjet(null);

        // Create the Materiel, which fails.


        restMaterielMockMvc.perform(post("/api/materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMateriels() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        // Get all the materielList
        restMaterielMockMvc.perform(get("/api/materiels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materiel.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].modele").value(hasItem(DEFAULT_MODELE)))
            .andExpect(jsonPath("$.[*].numCarteGrise").value(hasItem(DEFAULT_NUM_CARTE_GRISE)))
            .andExpect(jsonPath("$.[*].dateIdentification").value(hasItem(DEFAULT_DATE_IDENTIFICATION.toString())))
            .andExpect(jsonPath("$.[*].compteurAchat").value(hasItem(DEFAULT_COMPTEUR_ACHAT)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.booleanValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())))
            .andExpect(jsonPath("$.[*].multiProjet").value(hasItem(DEFAULT_MULTI_PROJET.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getMateriel() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        // Get the materiel
        restMaterielMockMvc.perform(get("/api/materiels/{id}", materiel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(materiel.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.modele").value(DEFAULT_MODELE))
            .andExpect(jsonPath("$.numCarteGrise").value(DEFAULT_NUM_CARTE_GRISE))
            .andExpect(jsonPath("$.dateIdentification").value(DEFAULT_DATE_IDENTIFICATION.toString()))
            .andExpect(jsonPath("$.compteurAchat").value(DEFAULT_COMPTEUR_ACHAT))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.booleanValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()))
            .andExpect(jsonPath("$.multiProjet").value(DEFAULT_MULTI_PROJET.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMateriel() throws Exception {
        // Get the materiel
        restMaterielMockMvc.perform(get("/api/materiels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMateriel() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        int databaseSizeBeforeUpdate = materielRepository.findAll().size();

        // Update the materiel
        Materiel updatedMateriel = materielRepository.findById(materiel.getId()).get();
        // Disconnect from session so that the updates on updatedMateriel are not directly saved in db
        em.detach(updatedMateriel);
        updatedMateriel
            .libelle(UPDATED_LIBELLE)
            .matricule(UPDATED_MATRICULE)
            .modele(UPDATED_MODELE)
            .numCarteGrise(UPDATED_NUM_CARTE_GRISE)
            .dateIdentification(UPDATED_DATE_IDENTIFICATION)
            .compteurAchat(UPDATED_COMPTEUR_ACHAT)
            .etat(UPDATED_ETAT)
            .location(UPDATED_LOCATION)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF)
            .multiProjet(UPDATED_MULTI_PROJET);

        restMaterielMockMvc.perform(put("/api/materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMateriel)))
            .andExpect(status().isOk());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
        Materiel testMateriel = materielList.get(materielList.size() - 1);
        assertThat(testMateriel.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testMateriel.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testMateriel.getModele()).isEqualTo(UPDATED_MODELE);
        assertThat(testMateriel.getNumCarteGrise()).isEqualTo(UPDATED_NUM_CARTE_GRISE);
        assertThat(testMateriel.getDateIdentification()).isEqualTo(UPDATED_DATE_IDENTIFICATION);
        assertThat(testMateriel.getCompteurAchat()).isEqualTo(UPDATED_COMPTEUR_ACHAT);
        assertThat(testMateriel.getEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testMateriel.isLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testMateriel.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMateriel.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testMateriel.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
        assertThat(testMateriel.isMultiProjet()).isEqualTo(UPDATED_MULTI_PROJET);
    }

    @Test
    @Transactional
    public void updateNonExistingMateriel() throws Exception {
        int databaseSizeBeforeUpdate = materielRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaterielMockMvc.perform(put("/api/materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(materiel)))
            .andExpect(status().isBadRequest());

        // Validate the Materiel in the database
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMateriel() throws Exception {
        // Initialize the database
        materielRepository.saveAndFlush(materiel);

        int databaseSizeBeforeDelete = materielRepository.findAll().size();

        // Delete the materiel
        restMaterielMockMvc.perform(delete("/api/materiels/{id}", materiel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Materiel> materielList = materielRepository.findAll();
        assertThat(materielList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
