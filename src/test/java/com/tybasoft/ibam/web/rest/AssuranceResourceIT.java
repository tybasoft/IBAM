package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Assurance;
import com.tybasoft.ibam.repository.AssuranceRepository;

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
 * Integration tests for the {@link AssuranceResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class AssuranceResourceIT {

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_AGENCE = "AAAAAAAAAA";
    private static final String UPDATED_AGENCE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AssuranceRepository assuranceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAssuranceMockMvc;

    private Assurance assurance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Assurance createEntity(EntityManager em) {
        Assurance assurance = new Assurance()
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .agence(DEFAULT_AGENCE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return assurance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Assurance createUpdatedEntity(EntityManager em) {
        Assurance assurance = new Assurance()
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .agence(UPDATED_AGENCE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return assurance;
    }

    @BeforeEach
    public void initTest() {
        assurance = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssurance() throws Exception {
        int databaseSizeBeforeCreate = assuranceRepository.findAll().size();

        // Create the Assurance
        restAssuranceMockMvc.perform(post("/api/assurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(assurance)))
            .andExpect(status().isCreated());

        // Validate the Assurance in the database
        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeCreate + 1);
        Assurance testAssurance = assuranceList.get(assuranceList.size() - 1);
        assertThat(testAssurance.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testAssurance.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testAssurance.getAgence()).isEqualTo(DEFAULT_AGENCE);
        assertThat(testAssurance.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testAssurance.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createAssuranceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assuranceRepository.findAll().size();

        // Create the Assurance with an existing ID
        assurance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssuranceMockMvc.perform(post("/api/assurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(assurance)))
            .andExpect(status().isBadRequest());

        // Validate the Assurance in the database
        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = assuranceRepository.findAll().size();
        // set the field null
        assurance.setDateDebut(null);

        // Create the Assurance, which fails.

        restAssuranceMockMvc.perform(post("/api/assurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(assurance)))
            .andExpect(status().isBadRequest());

        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = assuranceRepository.findAll().size();
        // set the field null
        assurance.setDateFin(null);

        // Create the Assurance, which fails.

        restAssuranceMockMvc.perform(post("/api/assurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(assurance)))
            .andExpect(status().isBadRequest());

        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAgenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = assuranceRepository.findAll().size();
        // set the field null
        assurance.setAgence(null);

        // Create the Assurance, which fails.

        restAssuranceMockMvc.perform(post("/api/assurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(assurance)))
            .andExpect(status().isBadRequest());

        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAssurances() throws Exception {
        // Initialize the database
        assuranceRepository.saveAndFlush(assurance);

        // Get all the assuranceList
        restAssuranceMockMvc.perform(get("/api/assurances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assurance.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].agence").value(hasItem(DEFAULT_AGENCE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getAssurance() throws Exception {
        // Initialize the database
        assuranceRepository.saveAndFlush(assurance);

        // Get the assurance
        restAssuranceMockMvc.perform(get("/api/assurances/{id}", assurance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(assurance.getId().intValue()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.agence").value(DEFAULT_AGENCE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAssurance() throws Exception {
        // Get the assurance
        restAssuranceMockMvc.perform(get("/api/assurances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssurance() throws Exception {
        // Initialize the database
        assuranceRepository.saveAndFlush(assurance);

        int databaseSizeBeforeUpdate = assuranceRepository.findAll().size();

        // Update the assurance
        Assurance updatedAssurance = assuranceRepository.findById(assurance.getId()).get();
        // Disconnect from session so that the updates on updatedAssurance are not directly saved in db
        em.detach(updatedAssurance);
        updatedAssurance
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .agence(UPDATED_AGENCE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restAssuranceMockMvc.perform(put("/api/assurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssurance)))
            .andExpect(status().isOk());

        // Validate the Assurance in the database
        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeUpdate);
        Assurance testAssurance = assuranceList.get(assuranceList.size() - 1);
        assertThat(testAssurance.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testAssurance.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testAssurance.getAgence()).isEqualTo(UPDATED_AGENCE);
        assertThat(testAssurance.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testAssurance.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingAssurance() throws Exception {
        int databaseSizeBeforeUpdate = assuranceRepository.findAll().size();

        // Create the Assurance

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssuranceMockMvc.perform(put("/api/assurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(assurance)))
            .andExpect(status().isBadRequest());

        // Validate the Assurance in the database
        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAssurance() throws Exception {
        // Initialize the database
        assuranceRepository.saveAndFlush(assurance);

        int databaseSizeBeforeDelete = assuranceRepository.findAll().size();

        // Delete the assurance
        restAssuranceMockMvc.perform(delete("/api/assurances/{id}", assurance.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Assurance> assuranceList = assuranceRepository.findAll();
        assertThat(assuranceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
