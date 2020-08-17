package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.repository.PointageRepository;

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
 * Integration tests for the {@link PointageResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PointageResourceIT {

    private static final LocalDate DEFAULT_DATE_JOUR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_JOUR = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_PRESENCE_MATIN = false;
    private static final Boolean UPDATED_PRESENCE_MATIN = true;

    private static final Boolean DEFAULT_PRESENCE_APM = false;
    private static final Boolean UPDATED_PRESENCE_APM = true;

    private static final String DEFAULT_NBR_HEURE_SUP = "AAAAAAAAAA";
    private static final String UPDATED_NBR_HEURE_SUP = "BBBBBBBBBB";

    private static final String DEFAULT_REMARQUES = "AAAAAAAAAA";
    private static final String UPDATED_REMARQUES = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private PointageRepository pointageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPointageMockMvc;

    private Pointage pointage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pointage createEntity(EntityManager em) {
        Pointage pointage = new Pointage()
            .dateJour(DEFAULT_DATE_JOUR)
            .presenceMatin(DEFAULT_PRESENCE_MATIN)
            .presenceAPM(DEFAULT_PRESENCE_APM)
            .nbrHeureSup(DEFAULT_NBR_HEURE_SUP)
            .remarques(DEFAULT_REMARQUES)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return pointage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pointage createUpdatedEntity(EntityManager em) {
        Pointage pointage = new Pointage()
            .dateJour(UPDATED_DATE_JOUR)
            .presenceMatin(UPDATED_PRESENCE_MATIN)
            .presenceAPM(UPDATED_PRESENCE_APM)
            .nbrHeureSup(UPDATED_NBR_HEURE_SUP)
            .remarques(UPDATED_REMARQUES)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return pointage;
    }

    @BeforeEach
    public void initTest() {
        pointage = createEntity(em);
    }

    @Test
    @Transactional
    public void createPointage() throws Exception {
        int databaseSizeBeforeCreate = pointageRepository.findAll().size();

        // Create the Pointage
        restPointageMockMvc.perform(post("/api/pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointage)))
            .andExpect(status().isCreated());

        // Validate the Pointage in the database
        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeCreate + 1);
        Pointage testPointage = pointageList.get(pointageList.size() - 1);
        assertThat(testPointage.getDateJour()).isEqualTo(DEFAULT_DATE_JOUR);
        assertThat(testPointage.isPresenceMatin()).isEqualTo(DEFAULT_PRESENCE_MATIN);
        assertThat(testPointage.isPresenceAPM()).isEqualTo(DEFAULT_PRESENCE_APM);
        assertThat(testPointage.getNbrHeureSup()).isEqualTo(DEFAULT_NBR_HEURE_SUP);
        assertThat(testPointage.getRemarques()).isEqualTo(DEFAULT_REMARQUES);
        assertThat(testPointage.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testPointage.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createPointageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pointageRepository.findAll().size();

        // Create the Pointage with an existing ID
        pointage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPointageMockMvc.perform(post("/api/pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointage)))
            .andExpect(status().isBadRequest());

        // Validate the Pointage in the database
        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateJourIsRequired() throws Exception {
        int databaseSizeBeforeTest = pointageRepository.findAll().size();
        // set the field null
        pointage.setDateJour(null);

        // Create the Pointage, which fails.

        restPointageMockMvc.perform(post("/api/pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointage)))
            .andExpect(status().isBadRequest());

        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPresenceMatinIsRequired() throws Exception {
        int databaseSizeBeforeTest = pointageRepository.findAll().size();
        // set the field null
        pointage.setPresenceMatin(null);

        // Create the Pointage, which fails.

        restPointageMockMvc.perform(post("/api/pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointage)))
            .andExpect(status().isBadRequest());

        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPresenceAPMIsRequired() throws Exception {
        int databaseSizeBeforeTest = pointageRepository.findAll().size();
        // set the field null
        pointage.setPresenceAPM(null);

        // Create the Pointage, which fails.

        restPointageMockMvc.perform(post("/api/pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointage)))
            .andExpect(status().isBadRequest());

        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPointages() throws Exception {
        // Initialize the database
        pointageRepository.saveAndFlush(pointage);

        // Get all the pointageList
        restPointageMockMvc.perform(get("/api/pointages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pointage.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateJour").value(hasItem(DEFAULT_DATE_JOUR.toString())))
            .andExpect(jsonPath("$.[*].presenceMatin").value(hasItem(DEFAULT_PRESENCE_MATIN.booleanValue())))
            .andExpect(jsonPath("$.[*].presenceAPM").value(hasItem(DEFAULT_PRESENCE_APM.booleanValue())))
            .andExpect(jsonPath("$.[*].nbrHeureSup").value(hasItem(DEFAULT_NBR_HEURE_SUP)))
            .andExpect(jsonPath("$.[*].remarques").value(hasItem(DEFAULT_REMARQUES)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getPointage() throws Exception {
        // Initialize the database
        pointageRepository.saveAndFlush(pointage);

        // Get the pointage
        restPointageMockMvc.perform(get("/api/pointages/{id}", pointage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pointage.getId().intValue()))
            .andExpect(jsonPath("$.dateJour").value(DEFAULT_DATE_JOUR.toString()))
            .andExpect(jsonPath("$.presenceMatin").value(DEFAULT_PRESENCE_MATIN.booleanValue()))
            .andExpect(jsonPath("$.presenceAPM").value(DEFAULT_PRESENCE_APM.booleanValue()))
            .andExpect(jsonPath("$.nbrHeureSup").value(DEFAULT_NBR_HEURE_SUP))
            .andExpect(jsonPath("$.remarques").value(DEFAULT_REMARQUES))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPointage() throws Exception {
        // Get the pointage
        restPointageMockMvc.perform(get("/api/pointages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePointage() throws Exception {
        // Initialize the database
        pointageRepository.saveAndFlush(pointage);

        int databaseSizeBeforeUpdate = pointageRepository.findAll().size();

        // Update the pointage
        Pointage updatedPointage = pointageRepository.findById(pointage.getId()).get();
        // Disconnect from session so that the updates on updatedPointage are not directly saved in db
        em.detach(updatedPointage);
        updatedPointage
            .dateJour(UPDATED_DATE_JOUR)
            .presenceMatin(UPDATED_PRESENCE_MATIN)
            .presenceAPM(UPDATED_PRESENCE_APM)
            .nbrHeureSup(UPDATED_NBR_HEURE_SUP)
            .remarques(UPDATED_REMARQUES)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restPointageMockMvc.perform(put("/api/pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPointage)))
            .andExpect(status().isOk());

        // Validate the Pointage in the database
        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeUpdate);
        Pointage testPointage = pointageList.get(pointageList.size() - 1);
        assertThat(testPointage.getDateJour()).isEqualTo(UPDATED_DATE_JOUR);
        assertThat(testPointage.isPresenceMatin()).isEqualTo(UPDATED_PRESENCE_MATIN);
        assertThat(testPointage.isPresenceAPM()).isEqualTo(UPDATED_PRESENCE_APM);
        assertThat(testPointage.getNbrHeureSup()).isEqualTo(UPDATED_NBR_HEURE_SUP);
        assertThat(testPointage.getRemarques()).isEqualTo(UPDATED_REMARQUES);
        assertThat(testPointage.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testPointage.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingPointage() throws Exception {
        int databaseSizeBeforeUpdate = pointageRepository.findAll().size();

        // Create the Pointage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPointageMockMvc.perform(put("/api/pointages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(pointage)))
            .andExpect(status().isBadRequest());

        // Validate the Pointage in the database
        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePointage() throws Exception {
        // Initialize the database
        pointageRepository.saveAndFlush(pointage);

        int databaseSizeBeforeDelete = pointageRepository.findAll().size();

        // Delete the pointage
        restPointageMockMvc.perform(delete("/api/pointages/{id}", pointage.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pointage> pointageList = pointageRepository.findAll();
        assertThat(pointageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
