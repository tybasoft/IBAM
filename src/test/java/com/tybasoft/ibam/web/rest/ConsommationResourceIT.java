package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Consommation;
import com.tybasoft.ibam.repository.ConsommationRepository;

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
 * Integration tests for the {@link ConsommationResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ConsommationResourceIT {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_ACHAT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ACHAT = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TYPE_CARBURANT = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_CARBURANT = "BBBBBBBBBB";

    private static final String DEFAULT_MONTANT = "AAAAAAAAAA";
    private static final String UPDATED_MONTANT = "BBBBBBBBBB";

    private static final String DEFAULT_QUANTITE = "AAAAAAAAAA";
    private static final String UPDATED_QUANTITE = "BBBBBBBBBB";

    private static final String DEFAULT_KILOMETRAGE = "AAAAAAAAAA";
    private static final String UPDATED_KILOMETRAGE = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ConsommationRepository consommationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsommationMockMvc;

    private Consommation consommation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consommation createEntity(EntityManager em) {
        Consommation consommation = new Consommation()
            .reference(DEFAULT_REFERENCE)
            .dateAchat(DEFAULT_DATE_ACHAT)
            .typeCarburant(DEFAULT_TYPE_CARBURANT)
            .montant(DEFAULT_MONTANT)
            .quantite(DEFAULT_QUANTITE)
            .kilometrage(DEFAULT_KILOMETRAGE)
            .commentaire(DEFAULT_COMMENTAIRE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return consommation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consommation createUpdatedEntity(EntityManager em) {
        Consommation consommation = new Consommation()
            .reference(UPDATED_REFERENCE)
            .dateAchat(UPDATED_DATE_ACHAT)
            .typeCarburant(UPDATED_TYPE_CARBURANT)
            .montant(UPDATED_MONTANT)
            .quantite(UPDATED_QUANTITE)
            .kilometrage(UPDATED_KILOMETRAGE)
            .commentaire(UPDATED_COMMENTAIRE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return consommation;
    }

    @BeforeEach
    public void initTest() {
        consommation = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsommation() throws Exception {
        int databaseSizeBeforeCreate = consommationRepository.findAll().size();

        // Create the Consommation
        restConsommationMockMvc.perform(post("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consommation)))
            .andExpect(status().isCreated());

        // Validate the Consommation in the database
        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeCreate + 1);
        Consommation testConsommation = consommationList.get(consommationList.size() - 1);
        assertThat(testConsommation.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testConsommation.getDateAchat()).isEqualTo(DEFAULT_DATE_ACHAT);
        assertThat(testConsommation.getTypeCarburant()).isEqualTo(DEFAULT_TYPE_CARBURANT);
        assertThat(testConsommation.getMontant()).isEqualTo(DEFAULT_MONTANT);
        assertThat(testConsommation.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testConsommation.getKilometrage()).isEqualTo(DEFAULT_KILOMETRAGE);
        assertThat(testConsommation.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testConsommation.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testConsommation.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createConsommationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consommationRepository.findAll().size();

        // Create the Consommation with an existing ID
        consommation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsommationMockMvc.perform(post("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consommation)))
            .andExpect(status().isBadRequest());

        // Validate the Consommation in the database
        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkReferenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = consommationRepository.findAll().size();
        // set the field null
        consommation.setReference(null);

        // Create the Consommation, which fails.

        restConsommationMockMvc.perform(post("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consommation)))
            .andExpect(status().isBadRequest());

        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateAchatIsRequired() throws Exception {
        int databaseSizeBeforeTest = consommationRepository.findAll().size();
        // set the field null
        consommation.setDateAchat(null);

        // Create the Consommation, which fails.

        restConsommationMockMvc.perform(post("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consommation)))
            .andExpect(status().isBadRequest());

        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMontantIsRequired() throws Exception {
        int databaseSizeBeforeTest = consommationRepository.findAll().size();
        // set the field null
        consommation.setMontant(null);

        // Create the Consommation, which fails.

        restConsommationMockMvc.perform(post("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consommation)))
            .andExpect(status().isBadRequest());

        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = consommationRepository.findAll().size();
        // set the field null
        consommation.setQuantite(null);

        // Create the Consommation, which fails.

        restConsommationMockMvc.perform(post("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consommation)))
            .andExpect(status().isBadRequest());

        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConsommations() throws Exception {
        // Initialize the database
        consommationRepository.saveAndFlush(consommation);

        // Get all the consommationList
        restConsommationMockMvc.perform(get("/api/consommations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consommation.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].dateAchat").value(hasItem(DEFAULT_DATE_ACHAT.toString())))
            .andExpect(jsonPath("$.[*].typeCarburant").value(hasItem(DEFAULT_TYPE_CARBURANT)))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT)))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].kilometrage").value(hasItem(DEFAULT_KILOMETRAGE)))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getConsommation() throws Exception {
        // Initialize the database
        consommationRepository.saveAndFlush(consommation);

        // Get the consommation
        restConsommationMockMvc.perform(get("/api/consommations/{id}", consommation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consommation.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.dateAchat").value(DEFAULT_DATE_ACHAT.toString()))
            .andExpect(jsonPath("$.typeCarburant").value(DEFAULT_TYPE_CARBURANT))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.kilometrage").value(DEFAULT_KILOMETRAGE))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConsommation() throws Exception {
        // Get the consommation
        restConsommationMockMvc.perform(get("/api/consommations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsommation() throws Exception {
        // Initialize the database
        consommationRepository.saveAndFlush(consommation);

        int databaseSizeBeforeUpdate = consommationRepository.findAll().size();

        // Update the consommation
        Consommation updatedConsommation = consommationRepository.findById(consommation.getId()).get();
        // Disconnect from session so that the updates on updatedConsommation are not directly saved in db
        em.detach(updatedConsommation);
        updatedConsommation
            .reference(UPDATED_REFERENCE)
            .dateAchat(UPDATED_DATE_ACHAT)
            .typeCarburant(UPDATED_TYPE_CARBURANT)
            .montant(UPDATED_MONTANT)
            .quantite(UPDATED_QUANTITE)
            .kilometrage(UPDATED_KILOMETRAGE)
            .commentaire(UPDATED_COMMENTAIRE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restConsommationMockMvc.perform(put("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsommation)))
            .andExpect(status().isOk());

        // Validate the Consommation in the database
        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeUpdate);
        Consommation testConsommation = consommationList.get(consommationList.size() - 1);
        assertThat(testConsommation.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testConsommation.getDateAchat()).isEqualTo(UPDATED_DATE_ACHAT);
        assertThat(testConsommation.getTypeCarburant()).isEqualTo(UPDATED_TYPE_CARBURANT);
        assertThat(testConsommation.getMontant()).isEqualTo(UPDATED_MONTANT);
        assertThat(testConsommation.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testConsommation.getKilometrage()).isEqualTo(UPDATED_KILOMETRAGE);
        assertThat(testConsommation.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testConsommation.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testConsommation.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingConsommation() throws Exception {
        int databaseSizeBeforeUpdate = consommationRepository.findAll().size();

        // Create the Consommation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsommationMockMvc.perform(put("/api/consommations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consommation)))
            .andExpect(status().isBadRequest());

        // Validate the Consommation in the database
        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsommation() throws Exception {
        // Initialize the database
        consommationRepository.saveAndFlush(consommation);

        int databaseSizeBeforeDelete = consommationRepository.findAll().size();

        // Delete the consommation
        restConsommationMockMvc.perform(delete("/api/consommations/{id}", consommation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Consommation> consommationList = consommationRepository.findAll();
        assertThat(consommationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
