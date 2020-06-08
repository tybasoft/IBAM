package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Maintenance;
import com.tybasoft.ibam.repository.MaintenanceRepository;

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

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MaintenanceResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MaintenanceResourceIT {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_PANNE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_PANNE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FRAIS = "AAAAAAAAAA";
    private static final String UPDATED_FRAIS = "BBBBBBBBBB";

    private static final String DEFAULT_TECHNICIEN = "AAAAAAAAAA";
    private static final String UPDATED_TECHNICIEN = "BBBBBBBBBB";

    private static final String DEFAULT_MOTIF = "AAAAAAAAAA";
    private static final String UPDATED_MOTIF = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PROBLEME_FREQUENT = false;
    private static final Boolean UPDATED_PROBLEME_FREQUENT = true;

    private static final String DEFAULT_REMARQUE = "AAAAAAAAAA";
    private static final String UPDATED_REMARQUE = "BBBBBBBBBB";

    private static final String DEFAULT_DUREE_PANNE = "AAAAAAAAAA";
    private static final String UPDATED_DUREE_PANNE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_MODIF = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIF = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMaintenanceMockMvc;

    private Maintenance maintenance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Maintenance createEntity(EntityManager em) {
        Maintenance maintenance = new Maintenance()
            .reference(DEFAULT_REFERENCE)
            .datePanne(DEFAULT_DATE_PANNE)
            .frais(DEFAULT_FRAIS)
            .technicien(DEFAULT_TECHNICIEN)
            .motif(DEFAULT_MOTIF)
            .problemeFrequent(DEFAULT_PROBLEME_FREQUENT)
            .remarque(DEFAULT_REMARQUE)
            .dureePanne(DEFAULT_DUREE_PANNE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return maintenance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Maintenance createUpdatedEntity(EntityManager em) {
        Maintenance maintenance = new Maintenance()
            .reference(UPDATED_REFERENCE)
            .datePanne(UPDATED_DATE_PANNE)
            .frais(UPDATED_FRAIS)
            .technicien(UPDATED_TECHNICIEN)
            .motif(UPDATED_MOTIF)
            .problemeFrequent(UPDATED_PROBLEME_FREQUENT)
            .remarque(UPDATED_REMARQUE)
            .dureePanne(UPDATED_DUREE_PANNE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return maintenance;
    }

    @BeforeEach
    public void initTest() {
        maintenance = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaintenance() throws Exception {
        int databaseSizeBeforeCreate = maintenanceRepository.findAll().size();

        // Create the Maintenance
        restMaintenanceMockMvc.perform(post("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(maintenance)))
            .andExpect(status().isCreated());

        // Validate the Maintenance in the database
        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeCreate + 1);
        Maintenance testMaintenance = maintenanceList.get(maintenanceList.size() - 1);
        assertThat(testMaintenance.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testMaintenance.getDatePanne()).isEqualTo(DEFAULT_DATE_PANNE);
        assertThat(testMaintenance.getFrais()).isEqualTo(DEFAULT_FRAIS);
        assertThat(testMaintenance.getTechnicien()).isEqualTo(DEFAULT_TECHNICIEN);
        assertThat(testMaintenance.getMotif()).isEqualTo(DEFAULT_MOTIF);
        assertThat(testMaintenance.isProblemeFrequent()).isEqualTo(DEFAULT_PROBLEME_FREQUENT);
        assertThat(testMaintenance.getRemarque()).isEqualTo(DEFAULT_REMARQUE);
        assertThat(testMaintenance.getDureePanne()).isEqualTo(DEFAULT_DUREE_PANNE);
        assertThat(testMaintenance.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testMaintenance.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createMaintenanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = maintenanceRepository.findAll().size();

        // Create the Maintenance with an existing ID
        maintenance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaintenanceMockMvc.perform(post("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(maintenance)))
            .andExpect(status().isBadRequest());

        // Validate the Maintenance in the database
        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkReferenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = maintenanceRepository.findAll().size();
        // set the field null
        maintenance.setReference(null);

        // Create the Maintenance, which fails.

        restMaintenanceMockMvc.perform(post("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(maintenance)))
            .andExpect(status().isBadRequest());

        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDatePanneIsRequired() throws Exception {
        int databaseSizeBeforeTest = maintenanceRepository.findAll().size();
        // set the field null
        maintenance.setDatePanne(null);

        // Create the Maintenance, which fails.

        restMaintenanceMockMvc.perform(post("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(maintenance)))
            .andExpect(status().isBadRequest());

        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFraisIsRequired() throws Exception {
        int databaseSizeBeforeTest = maintenanceRepository.findAll().size();
        // set the field null
        maintenance.setFrais(null);

        // Create the Maintenance, which fails.

        restMaintenanceMockMvc.perform(post("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(maintenance)))
            .andExpect(status().isBadRequest());

        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMotifIsRequired() throws Exception {
        int databaseSizeBeforeTest = maintenanceRepository.findAll().size();
        // set the field null
        maintenance.setMotif(null);

        // Create the Maintenance, which fails.

        restMaintenanceMockMvc.perform(post("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(maintenance)))
            .andExpect(status().isBadRequest());

        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMaintenances() throws Exception {
        // Initialize the database
        maintenanceRepository.saveAndFlush(maintenance);

        // Get all the maintenanceList
        restMaintenanceMockMvc.perform(get("/api/maintenances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maintenance.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].datePanne").value(hasItem(DEFAULT_DATE_PANNE.toString())))
            .andExpect(jsonPath("$.[*].frais").value(hasItem(DEFAULT_FRAIS)))
            .andExpect(jsonPath("$.[*].technicien").value(hasItem(DEFAULT_TECHNICIEN)))
            .andExpect(jsonPath("$.[*].motif").value(hasItem(DEFAULT_MOTIF)))
            .andExpect(jsonPath("$.[*].problemeFrequent").value(hasItem(DEFAULT_PROBLEME_FREQUENT.booleanValue())))
            .andExpect(jsonPath("$.[*].remarque").value(hasItem(DEFAULT_REMARQUE)))
            .andExpect(jsonPath("$.[*].dureePanne").value(hasItem(DEFAULT_DUREE_PANNE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getMaintenance() throws Exception {
        // Initialize the database
        maintenanceRepository.saveAndFlush(maintenance);

        // Get the maintenance
        restMaintenanceMockMvc.perform(get("/api/maintenances/{id}", maintenance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(maintenance.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.datePanne").value(DEFAULT_DATE_PANNE.toString()))
            .andExpect(jsonPath("$.frais").value(DEFAULT_FRAIS))
            .andExpect(jsonPath("$.technicien").value(DEFAULT_TECHNICIEN))
            .andExpect(jsonPath("$.motif").value(DEFAULT_MOTIF))
            .andExpect(jsonPath("$.problemeFrequent").value(DEFAULT_PROBLEME_FREQUENT.booleanValue()))
            .andExpect(jsonPath("$.remarque").value(DEFAULT_REMARQUE))
            .andExpect(jsonPath("$.dureePanne").value(DEFAULT_DUREE_PANNE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaintenance() throws Exception {
        // Get the maintenance
        restMaintenanceMockMvc.perform(get("/api/maintenances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaintenance() throws Exception {
        // Initialize the database
        maintenanceRepository.saveAndFlush(maintenance);

        int databaseSizeBeforeUpdate = maintenanceRepository.findAll().size();

        // Update the maintenance
        Maintenance updatedMaintenance = maintenanceRepository.findById(maintenance.getId()).get();
        // Disconnect from session so that the updates on updatedMaintenance are not directly saved in db
        em.detach(updatedMaintenance);
        updatedMaintenance
            .reference(UPDATED_REFERENCE)
            .datePanne(UPDATED_DATE_PANNE)
            .frais(UPDATED_FRAIS)
            .technicien(UPDATED_TECHNICIEN)
            .motif(UPDATED_MOTIF)
            .problemeFrequent(UPDATED_PROBLEME_FREQUENT)
            .remarque(UPDATED_REMARQUE)
            .dureePanne(UPDATED_DUREE_PANNE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restMaintenanceMockMvc.perform(put("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaintenance)))
            .andExpect(status().isOk());

        // Validate the Maintenance in the database
        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeUpdate);
        Maintenance testMaintenance = maintenanceList.get(maintenanceList.size() - 1);
        assertThat(testMaintenance.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testMaintenance.getDatePanne()).isEqualTo(UPDATED_DATE_PANNE);
        assertThat(testMaintenance.getFrais()).isEqualTo(UPDATED_FRAIS);
        assertThat(testMaintenance.getTechnicien()).isEqualTo(UPDATED_TECHNICIEN);
        assertThat(testMaintenance.getMotif()).isEqualTo(UPDATED_MOTIF);
        assertThat(testMaintenance.isProblemeFrequent()).isEqualTo(UPDATED_PROBLEME_FREQUENT);
        assertThat(testMaintenance.getRemarque()).isEqualTo(UPDATED_REMARQUE);
        assertThat(testMaintenance.getDureePanne()).isEqualTo(UPDATED_DUREE_PANNE);
        assertThat(testMaintenance.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testMaintenance.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingMaintenance() throws Exception {
        int databaseSizeBeforeUpdate = maintenanceRepository.findAll().size();

        // Create the Maintenance

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMaintenanceMockMvc.perform(put("/api/maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(maintenance)))
            .andExpect(status().isBadRequest());

        // Validate the Maintenance in the database
        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMaintenance() throws Exception {
        // Initialize the database
        maintenanceRepository.saveAndFlush(maintenance);

        int databaseSizeBeforeDelete = maintenanceRepository.findAll().size();

        // Delete the maintenance
        restMaintenanceMockMvc.perform(delete("/api/maintenances/{id}", maintenance.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Maintenance> maintenanceList = maintenanceRepository.findAll();
        assertThat(maintenanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
