package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.CentreMaintenance;
import com.tybasoft.ibam.repository.CentreMaintenanceRepository;

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
 * Integration tests for the {@link CentreMaintenanceResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CentreMaintenanceResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_SPECIALITE = "AAAAAAAAAA";
    private static final String UPDATED_SPECIALITE = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSABLE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSABLE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CentreMaintenanceRepository centreMaintenanceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCentreMaintenanceMockMvc;

    private CentreMaintenance centreMaintenance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CentreMaintenance createEntity(EntityManager em) {
        CentreMaintenance centreMaintenance = new CentreMaintenance()
            .libelle(DEFAULT_LIBELLE)
            .specialite(DEFAULT_SPECIALITE)
            .responsable(DEFAULT_RESPONSABLE)
            .adresse(DEFAULT_ADRESSE)
            .telephone(DEFAULT_TELEPHONE)
            .email(DEFAULT_EMAIL)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return centreMaintenance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CentreMaintenance createUpdatedEntity(EntityManager em) {
        CentreMaintenance centreMaintenance = new CentreMaintenance()
            .libelle(UPDATED_LIBELLE)
            .specialite(UPDATED_SPECIALITE)
            .responsable(UPDATED_RESPONSABLE)
            .adresse(UPDATED_ADRESSE)
            .telephone(UPDATED_TELEPHONE)
            .email(UPDATED_EMAIL)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return centreMaintenance;
    }

    @BeforeEach
    public void initTest() {
        centreMaintenance = createEntity(em);
    }

    @Test
    @Transactional
    public void createCentreMaintenance() throws Exception {
        int databaseSizeBeforeCreate = centreMaintenanceRepository.findAll().size();

        // Create the CentreMaintenance
        restCentreMaintenanceMockMvc.perform(post("/api/centre-maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(centreMaintenance)))
            .andExpect(status().isCreated());

        // Validate the CentreMaintenance in the database
        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeCreate + 1);
        CentreMaintenance testCentreMaintenance = centreMaintenanceList.get(centreMaintenanceList.size() - 1);
        assertThat(testCentreMaintenance.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testCentreMaintenance.getSpecialite()).isEqualTo(DEFAULT_SPECIALITE);
        assertThat(testCentreMaintenance.getResponsable()).isEqualTo(DEFAULT_RESPONSABLE);
        assertThat(testCentreMaintenance.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testCentreMaintenance.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testCentreMaintenance.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCentreMaintenance.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testCentreMaintenance.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createCentreMaintenanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = centreMaintenanceRepository.findAll().size();

        // Create the CentreMaintenance with an existing ID
        centreMaintenance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCentreMaintenanceMockMvc.perform(post("/api/centre-maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(centreMaintenance)))
            .andExpect(status().isBadRequest());

        // Validate the CentreMaintenance in the database
        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = centreMaintenanceRepository.findAll().size();
        // set the field null
        centreMaintenance.setLibelle(null);

        // Create the CentreMaintenance, which fails.

        restCentreMaintenanceMockMvc.perform(post("/api/centre-maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(centreMaintenance)))
            .andExpect(status().isBadRequest());

        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = centreMaintenanceRepository.findAll().size();
        // set the field null
        centreMaintenance.setAdresse(null);

        // Create the CentreMaintenance, which fails.

        restCentreMaintenanceMockMvc.perform(post("/api/centre-maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(centreMaintenance)))
            .andExpect(status().isBadRequest());

        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = centreMaintenanceRepository.findAll().size();
        // set the field null
        centreMaintenance.setTelephone(null);

        // Create the CentreMaintenance, which fails.

        restCentreMaintenanceMockMvc.perform(post("/api/centre-maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(centreMaintenance)))
            .andExpect(status().isBadRequest());

        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCentreMaintenances() throws Exception {
        // Initialize the database
        centreMaintenanceRepository.saveAndFlush(centreMaintenance);

        // Get all the centreMaintenanceList
        restCentreMaintenanceMockMvc.perform(get("/api/centre-maintenances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(centreMaintenance.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].specialite").value(hasItem(DEFAULT_SPECIALITE)))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getCentreMaintenance() throws Exception {
        // Initialize the database
        centreMaintenanceRepository.saveAndFlush(centreMaintenance);

        // Get the centreMaintenance
        restCentreMaintenanceMockMvc.perform(get("/api/centre-maintenances/{id}", centreMaintenance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(centreMaintenance.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.specialite").value(DEFAULT_SPECIALITE))
            .andExpect(jsonPath("$.responsable").value(DEFAULT_RESPONSABLE))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCentreMaintenance() throws Exception {
        // Get the centreMaintenance
        restCentreMaintenanceMockMvc.perform(get("/api/centre-maintenances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCentreMaintenance() throws Exception {
        // Initialize the database
        centreMaintenanceRepository.saveAndFlush(centreMaintenance);

        int databaseSizeBeforeUpdate = centreMaintenanceRepository.findAll().size();

        // Update the centreMaintenance
        CentreMaintenance updatedCentreMaintenance = centreMaintenanceRepository.findById(centreMaintenance.getId()).get();
        // Disconnect from session so that the updates on updatedCentreMaintenance are not directly saved in db
        em.detach(updatedCentreMaintenance);
        updatedCentreMaintenance
            .libelle(UPDATED_LIBELLE)
            .specialite(UPDATED_SPECIALITE)
            .responsable(UPDATED_RESPONSABLE)
            .adresse(UPDATED_ADRESSE)
            .telephone(UPDATED_TELEPHONE)
            .email(UPDATED_EMAIL)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restCentreMaintenanceMockMvc.perform(put("/api/centre-maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCentreMaintenance)))
            .andExpect(status().isOk());

        // Validate the CentreMaintenance in the database
        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeUpdate);
        CentreMaintenance testCentreMaintenance = centreMaintenanceList.get(centreMaintenanceList.size() - 1);
        assertThat(testCentreMaintenance.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testCentreMaintenance.getSpecialite()).isEqualTo(UPDATED_SPECIALITE);
        assertThat(testCentreMaintenance.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testCentreMaintenance.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testCentreMaintenance.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testCentreMaintenance.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCentreMaintenance.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testCentreMaintenance.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingCentreMaintenance() throws Exception {
        int databaseSizeBeforeUpdate = centreMaintenanceRepository.findAll().size();

        // Create the CentreMaintenance

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCentreMaintenanceMockMvc.perform(put("/api/centre-maintenances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(centreMaintenance)))
            .andExpect(status().isBadRequest());

        // Validate the CentreMaintenance in the database
        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCentreMaintenance() throws Exception {
        // Initialize the database
        centreMaintenanceRepository.saveAndFlush(centreMaintenance);

        int databaseSizeBeforeDelete = centreMaintenanceRepository.findAll().size();

        // Delete the centreMaintenance
        restCentreMaintenanceMockMvc.perform(delete("/api/centre-maintenances/{id}", centreMaintenance.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CentreMaintenance> centreMaintenanceList = centreMaintenanceRepository.findAll();
        assertThat(centreMaintenanceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
