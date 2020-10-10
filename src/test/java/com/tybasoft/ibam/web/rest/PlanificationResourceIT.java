package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Planification;
import com.tybasoft.ibam.repository.PlanificationRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.tybasoft.ibam.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlanificationResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlanificationResourceIT {

    private static final String DEFAULT_NOM_TACHE = "AAAAAAAAAA";
    private static final String UPDATED_NOM_TACHE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_TACHE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_TACHE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_DEBUT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_DEBUT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_DATE_FIN = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_FIN = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private PlanificationRepository planificationRepository;

    @Mock
    private PlanificationRepository planificationRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanificationMockMvc;

    private Planification planification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planification createEntity(EntityManager em) {
        Planification planification = new Planification()
            .nom_tache(DEFAULT_NOM_TACHE)
            .description_tache(DEFAULT_DESCRIPTION_TACHE)
            .date_debut(DEFAULT_DATE_DEBUT)
            .date_fin(DEFAULT_DATE_FIN);
        return planification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planification createUpdatedEntity(EntityManager em) {
        Planification planification = new Planification()
            .nom_tache(UPDATED_NOM_TACHE)
            .description_tache(UPDATED_DESCRIPTION_TACHE)
            .date_debut(UPDATED_DATE_DEBUT)
            .date_fin(UPDATED_DATE_FIN);
        return planification;
    }

    @BeforeEach
    public void initTest() {
        planification = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlanification() throws Exception {
        int databaseSizeBeforeCreate = planificationRepository.findAll().size();
        // Create the Planification
        restPlanificationMockMvc.perform(post("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planification)))
            .andExpect(status().isCreated());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeCreate + 1);
        Planification testPlanification = planificationList.get(planificationList.size() - 1);
        assertThat(testPlanification.getNom_tache()).isEqualTo(DEFAULT_NOM_TACHE);
        assertThat(testPlanification.getDescription_tache()).isEqualTo(DEFAULT_DESCRIPTION_TACHE);
        assertThat(testPlanification.getDate_debut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testPlanification.getDate_fin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    public void createPlanificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planificationRepository.findAll().size();

        // Create the Planification with an existing ID
        planification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanificationMockMvc.perform(post("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planification)))
            .andExpect(status().isBadRequest());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlanifications() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        // Get all the planificationList
        restPlanificationMockMvc.perform(get("/api/planifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planification.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom_tache").value(hasItem(DEFAULT_NOM_TACHE)))
            .andExpect(jsonPath("$.[*].description_tache").value(hasItem(DEFAULT_DESCRIPTION_TACHE)))
            .andExpect(jsonPath("$.[*].date_debut").value(hasItem(sameInstant(DEFAULT_DATE_DEBUT))))
            .andExpect(jsonPath("$.[*].date_fin").value(hasItem(sameInstant(DEFAULT_DATE_FIN))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPlanificationsWithEagerRelationshipsIsEnabled() throws Exception {
        when(planificationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPlanificationMockMvc.perform(get("/api/planifications?eagerload=true"))
            .andExpect(status().isOk());

        verify(planificationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPlanificationsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(planificationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restPlanificationMockMvc.perform(get("/api/planifications?eagerload=true"))
            .andExpect(status().isOk());

        verify(planificationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPlanification() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        // Get the planification
        restPlanificationMockMvc.perform(get("/api/planifications/{id}", planification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planification.getId().intValue()))
            .andExpect(jsonPath("$.nom_tache").value(DEFAULT_NOM_TACHE))
            .andExpect(jsonPath("$.description_tache").value(DEFAULT_DESCRIPTION_TACHE))
            .andExpect(jsonPath("$.date_debut").value(sameInstant(DEFAULT_DATE_DEBUT)))
            .andExpect(jsonPath("$.date_fin").value(sameInstant(DEFAULT_DATE_FIN)));
    }
    @Test
    @Transactional
    public void getNonExistingPlanification() throws Exception {
        // Get the planification
        restPlanificationMockMvc.perform(get("/api/planifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlanification() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        int databaseSizeBeforeUpdate = planificationRepository.findAll().size();

        // Update the planification
        Planification updatedPlanification = planificationRepository.findById(planification.getId()).get();
        // Disconnect from session so that the updates on updatedPlanification are not directly saved in db
        em.detach(updatedPlanification);
        updatedPlanification
            .nom_tache(UPDATED_NOM_TACHE)
            .description_tache(UPDATED_DESCRIPTION_TACHE)
            .date_debut(UPDATED_DATE_DEBUT)
            .date_fin(UPDATED_DATE_FIN);

        restPlanificationMockMvc.perform(put("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlanification)))
            .andExpect(status().isOk());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeUpdate);
        Planification testPlanification = planificationList.get(planificationList.size() - 1);
        assertThat(testPlanification.getNom_tache()).isEqualTo(UPDATED_NOM_TACHE);
        assertThat(testPlanification.getDescription_tache()).isEqualTo(UPDATED_DESCRIPTION_TACHE);
        assertThat(testPlanification.getDate_debut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testPlanification.getDate_fin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingPlanification() throws Exception {
        int databaseSizeBeforeUpdate = planificationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanificationMockMvc.perform(put("/api/planifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planification)))
            .andExpect(status().isBadRequest());

        // Validate the Planification in the database
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlanification() throws Exception {
        // Initialize the database
        planificationRepository.saveAndFlush(planification);

        int databaseSizeBeforeDelete = planificationRepository.findAll().size();

        // Delete the planification
        restPlanificationMockMvc.perform(delete("/api/planifications/{id}", planification.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Planification> planificationList = planificationRepository.findAll();
        assertThat(planificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
