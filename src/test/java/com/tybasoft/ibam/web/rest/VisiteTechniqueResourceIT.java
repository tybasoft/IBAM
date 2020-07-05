package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.VisiteTechnique;
import com.tybasoft.ibam.repository.VisiteTechniqueRepository;

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
 * Integration tests for the {@link VisiteTechniqueResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class VisiteTechniqueResourceIT {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_VISITE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_VISITE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REMARQUE = "AAAAAAAAAA";
    private static final String UPDATED_REMARQUE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private VisiteTechniqueRepository visiteTechniqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVisiteTechniqueMockMvc;

    private VisiteTechnique visiteTechnique;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisiteTechnique createEntity(EntityManager em) {
        VisiteTechnique visiteTechnique = new VisiteTechnique()
            .reference(DEFAULT_REFERENCE)
            .dateVisite(DEFAULT_DATE_VISITE)
            .remarque(DEFAULT_REMARQUE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return visiteTechnique;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VisiteTechnique createUpdatedEntity(EntityManager em) {
        VisiteTechnique visiteTechnique = new VisiteTechnique()
            .reference(UPDATED_REFERENCE)
            .dateVisite(UPDATED_DATE_VISITE)
            .remarque(UPDATED_REMARQUE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return visiteTechnique;
    }

    @BeforeEach
    public void initTest() {
        visiteTechnique = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisiteTechnique() throws Exception {
        int databaseSizeBeforeCreate = visiteTechniqueRepository.findAll().size();

        // Create the VisiteTechnique
        restVisiteTechniqueMockMvc.perform(post("/api/visite-techniques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visiteTechnique)))
            .andExpect(status().isCreated());

        // Validate the VisiteTechnique in the database
        List<VisiteTechnique> visiteTechniqueList = visiteTechniqueRepository.findAll();
        assertThat(visiteTechniqueList).hasSize(databaseSizeBeforeCreate + 1);
        VisiteTechnique testVisiteTechnique = visiteTechniqueList.get(visiteTechniqueList.size() - 1);
        assertThat(testVisiteTechnique.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testVisiteTechnique.getDateVisite()).isEqualTo(DEFAULT_DATE_VISITE);
        assertThat(testVisiteTechnique.getRemarque()).isEqualTo(DEFAULT_REMARQUE);
        assertThat(testVisiteTechnique.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testVisiteTechnique.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createVisiteTechniqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visiteTechniqueRepository.findAll().size();

        // Create the VisiteTechnique with an existing ID
        visiteTechnique.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisiteTechniqueMockMvc.perform(post("/api/visite-techniques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visiteTechnique)))
            .andExpect(status().isBadRequest());

        // Validate the VisiteTechnique in the database
        List<VisiteTechnique> visiteTechniqueList = visiteTechniqueRepository.findAll();
        assertThat(visiteTechniqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkReferenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = visiteTechniqueRepository.findAll().size();
        // set the field null
        visiteTechnique.setReference(null);

        // Create the VisiteTechnique, which fails.

        restVisiteTechniqueMockMvc.perform(post("/api/visite-techniques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visiteTechnique)))
            .andExpect(status().isBadRequest());

        List<VisiteTechnique> visiteTechniqueList = visiteTechniqueRepository.findAll();
        assertThat(visiteTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateVisiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = visiteTechniqueRepository.findAll().size();
        // set the field null
        visiteTechnique.setDateVisite(null);

        // Create the VisiteTechnique, which fails.

        restVisiteTechniqueMockMvc.perform(post("/api/visite-techniques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visiteTechnique)))
            .andExpect(status().isBadRequest());

        List<VisiteTechnique> visiteTechniqueList = visiteTechniqueRepository.findAll();
        assertThat(visiteTechniqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVisiteTechniques() throws Exception {
        // Initialize the database
        visiteTechniqueRepository.saveAndFlush(visiteTechnique);

        // Get all the visiteTechniqueList
        restVisiteTechniqueMockMvc.perform(get("/api/visite-techniques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visiteTechnique.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].dateVisite").value(hasItem(DEFAULT_DATE_VISITE.toString())))
            .andExpect(jsonPath("$.[*].remarque").value(hasItem(DEFAULT_REMARQUE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getVisiteTechnique() throws Exception {
        // Initialize the database
        visiteTechniqueRepository.saveAndFlush(visiteTechnique);

        // Get the visiteTechnique
        restVisiteTechniqueMockMvc.perform(get("/api/visite-techniques/{id}", visiteTechnique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(visiteTechnique.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.dateVisite").value(DEFAULT_DATE_VISITE.toString()))
            .andExpect(jsonPath("$.remarque").value(DEFAULT_REMARQUE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVisiteTechnique() throws Exception {
        // Get the visiteTechnique
        restVisiteTechniqueMockMvc.perform(get("/api/visite-techniques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisiteTechnique() throws Exception {
        // Initialize the database
        visiteTechniqueRepository.saveAndFlush(visiteTechnique);

        int databaseSizeBeforeUpdate = visiteTechniqueRepository.findAll().size();

        // Update the visiteTechnique
        VisiteTechnique updatedVisiteTechnique = visiteTechniqueRepository.findById(visiteTechnique.getId()).get();
        // Disconnect from session so that the updates on updatedVisiteTechnique are not directly saved in db
        em.detach(updatedVisiteTechnique);
        updatedVisiteTechnique
            .reference(UPDATED_REFERENCE)
            .dateVisite(UPDATED_DATE_VISITE)
            .remarque(UPDATED_REMARQUE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restVisiteTechniqueMockMvc.perform(put("/api/visite-techniques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVisiteTechnique)))
            .andExpect(status().isOk());

        // Validate the VisiteTechnique in the database
        List<VisiteTechnique> visiteTechniqueList = visiteTechniqueRepository.findAll();
        assertThat(visiteTechniqueList).hasSize(databaseSizeBeforeUpdate);
        VisiteTechnique testVisiteTechnique = visiteTechniqueList.get(visiteTechniqueList.size() - 1);
        assertThat(testVisiteTechnique.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testVisiteTechnique.getDateVisite()).isEqualTo(UPDATED_DATE_VISITE);
        assertThat(testVisiteTechnique.getRemarque()).isEqualTo(UPDATED_REMARQUE);
        assertThat(testVisiteTechnique.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testVisiteTechnique.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingVisiteTechnique() throws Exception {
        int databaseSizeBeforeUpdate = visiteTechniqueRepository.findAll().size();

        // Create the VisiteTechnique

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisiteTechniqueMockMvc.perform(put("/api/visite-techniques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(visiteTechnique)))
            .andExpect(status().isBadRequest());

        // Validate the VisiteTechnique in the database
        List<VisiteTechnique> visiteTechniqueList = visiteTechniqueRepository.findAll();
        assertThat(visiteTechniqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisiteTechnique() throws Exception {
        // Initialize the database
        visiteTechniqueRepository.saveAndFlush(visiteTechnique);

        int databaseSizeBeforeDelete = visiteTechniqueRepository.findAll().size();

        // Delete the visiteTechnique
        restVisiteTechniqueMockMvc.perform(delete("/api/visite-techniques/{id}", visiteTechnique.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VisiteTechnique> visiteTechniqueList = visiteTechniqueRepository.findAll();
        assertThat(visiteTechniqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
