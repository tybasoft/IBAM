package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Entreprise;
import com.tybasoft.ibam.repository.EntrepriseRepository;

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
 * Integration tests for the {@link EntrepriseResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EntrepriseResourceIT {

    private static final String DEFAULT_ENTITE_JURIDIQUE = "AAAAAAAAAA";
    private static final String UPDATED_ENTITE_JURIDIQUE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM_COMMERCIAL = "AAAAAAAAAA";
    private static final String UPDATED_NOM_COMMERCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_CAPITAL = "AAAAAAAAAA";
    private static final String UPDATED_CAPITAL = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECTION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECTION = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVITE = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVITE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntrepriseMockMvc;

    private Entreprise entreprise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entreprise createEntity(EntityManager em) {
        Entreprise entreprise = new Entreprise()
            .entiteJuridique(DEFAULT_ENTITE_JURIDIQUE)
            .nomCommercial(DEFAULT_NOM_COMMERCIAL)
            .adresse(DEFAULT_ADRESSE)
            .capital(DEFAULT_CAPITAL)
            .direction(DEFAULT_DIRECTION)
            .activite(DEFAULT_ACTIVITE)
            .telephone(DEFAULT_TELEPHONE)
            .email(DEFAULT_EMAIL)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return entreprise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entreprise createUpdatedEntity(EntityManager em) {
        Entreprise entreprise = new Entreprise()
            .entiteJuridique(UPDATED_ENTITE_JURIDIQUE)
            .nomCommercial(UPDATED_NOM_COMMERCIAL)
            .adresse(UPDATED_ADRESSE)
            .capital(UPDATED_CAPITAL)
            .direction(UPDATED_DIRECTION)
            .activite(UPDATED_ACTIVITE)
            .telephone(UPDATED_TELEPHONE)
            .email(UPDATED_EMAIL)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return entreprise;
    }

    @BeforeEach
    public void initTest() {
        entreprise = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntreprise() throws Exception {
        int databaseSizeBeforeCreate = entrepriseRepository.findAll().size();

        // Create the Entreprise
        restEntrepriseMockMvc.perform(post("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isCreated());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeCreate + 1);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getEntiteJuridique()).isEqualTo(DEFAULT_ENTITE_JURIDIQUE);
        assertThat(testEntreprise.getNomCommercial()).isEqualTo(DEFAULT_NOM_COMMERCIAL);
        assertThat(testEntreprise.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testEntreprise.getCapital()).isEqualTo(DEFAULT_CAPITAL);
        assertThat(testEntreprise.getDirection()).isEqualTo(DEFAULT_DIRECTION);
        assertThat(testEntreprise.getActivite()).isEqualTo(DEFAULT_ACTIVITE);
        assertThat(testEntreprise.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testEntreprise.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEntreprise.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testEntreprise.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createEntrepriseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entrepriseRepository.findAll().size();

        // Create the Entreprise with an existing ID
        entreprise.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntrepriseMockMvc.perform(post("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomCommercialIsRequired() throws Exception {
        int databaseSizeBeforeTest = entrepriseRepository.findAll().size();
        // set the field null
        entreprise.setNomCommercial(null);

        // Create the Entreprise, which fails.

        restEntrepriseMockMvc.perform(post("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isBadRequest());

        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEntreprises() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        // Get all the entrepriseList
        restEntrepriseMockMvc.perform(get("/api/entreprises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entreprise.getId().intValue())))
            .andExpect(jsonPath("$.[*].entiteJuridique").value(hasItem(DEFAULT_ENTITE_JURIDIQUE)))
            .andExpect(jsonPath("$.[*].nomCommercial").value(hasItem(DEFAULT_NOM_COMMERCIAL)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].capital").value(hasItem(DEFAULT_CAPITAL)))
            .andExpect(jsonPath("$.[*].direction").value(hasItem(DEFAULT_DIRECTION)))
            .andExpect(jsonPath("$.[*].activite").value(hasItem(DEFAULT_ACTIVITE)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        // Get the entreprise
        restEntrepriseMockMvc.perform(get("/api/entreprises/{id}", entreprise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entreprise.getId().intValue()))
            .andExpect(jsonPath("$.entiteJuridique").value(DEFAULT_ENTITE_JURIDIQUE))
            .andExpect(jsonPath("$.nomCommercial").value(DEFAULT_NOM_COMMERCIAL))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.capital").value(DEFAULT_CAPITAL))
            .andExpect(jsonPath("$.direction").value(DEFAULT_DIRECTION))
            .andExpect(jsonPath("$.activite").value(DEFAULT_ACTIVITE))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntreprise() throws Exception {
        // Get the entreprise
        restEntrepriseMockMvc.perform(get("/api/entreprises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();

        // Update the entreprise
        Entreprise updatedEntreprise = entrepriseRepository.findById(entreprise.getId()).get();
        // Disconnect from session so that the updates on updatedEntreprise are not directly saved in db
        em.detach(updatedEntreprise);
        updatedEntreprise
            .entiteJuridique(UPDATED_ENTITE_JURIDIQUE)
            .nomCommercial(UPDATED_NOM_COMMERCIAL)
            .adresse(UPDATED_ADRESSE)
            .capital(UPDATED_CAPITAL)
            .direction(UPDATED_DIRECTION)
            .activite(UPDATED_ACTIVITE)
            .telephone(UPDATED_TELEPHONE)
            .email(UPDATED_EMAIL)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restEntrepriseMockMvc.perform(put("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntreprise)))
            .andExpect(status().isOk());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
        Entreprise testEntreprise = entrepriseList.get(entrepriseList.size() - 1);
        assertThat(testEntreprise.getEntiteJuridique()).isEqualTo(UPDATED_ENTITE_JURIDIQUE);
        assertThat(testEntreprise.getNomCommercial()).isEqualTo(UPDATED_NOM_COMMERCIAL);
        assertThat(testEntreprise.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testEntreprise.getCapital()).isEqualTo(UPDATED_CAPITAL);
        assertThat(testEntreprise.getDirection()).isEqualTo(UPDATED_DIRECTION);
        assertThat(testEntreprise.getActivite()).isEqualTo(UPDATED_ACTIVITE);
        assertThat(testEntreprise.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testEntreprise.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEntreprise.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testEntreprise.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingEntreprise() throws Exception {
        int databaseSizeBeforeUpdate = entrepriseRepository.findAll().size();

        // Create the Entreprise

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntrepriseMockMvc.perform(put("/api/entreprises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entreprise)))
            .andExpect(status().isBadRequest());

        // Validate the Entreprise in the database
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntreprise() throws Exception {
        // Initialize the database
        entrepriseRepository.saveAndFlush(entreprise);

        int databaseSizeBeforeDelete = entrepriseRepository.findAll().size();

        // Delete the entreprise
        restEntrepriseMockMvc.perform(delete("/api/entreprises/{id}", entreprise.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Entreprise> entrepriseList = entrepriseRepository.findAll();
        assertThat(entrepriseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
