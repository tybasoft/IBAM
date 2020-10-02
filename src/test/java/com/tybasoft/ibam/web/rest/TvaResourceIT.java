package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Tva;
import com.tybasoft.ibam.repository.TvaRepository;

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
 * Integration tests for the {@link TvaResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TvaResourceIT {

    private static final String DEFAULT_TAUX = "AAAAAAAAAA";
    private static final String UPDATED_TAUX = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TvaRepository tvaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTvaMockMvc;

    private Tva tva;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tva createEntity(EntityManager em) {
        Tva tva = new Tva()
            .taux(DEFAULT_TAUX)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return tva;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tva createUpdatedEntity(EntityManager em) {
        Tva tva = new Tva()
            .taux(UPDATED_TAUX)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return tva;
    }

    @BeforeEach
    public void initTest() {
        tva = createEntity(em);
    }

    @Test
    @Transactional
    public void createTva() throws Exception {
        int databaseSizeBeforeCreate = tvaRepository.findAll().size();

        // Create the Tva
        restTvaMockMvc.perform(post("/api/tvas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tva)))
            .andExpect(status().isCreated());

        // Validate the Tva in the database
        List<Tva> tvaList = tvaRepository.findAll();
        assertThat(tvaList).hasSize(databaseSizeBeforeCreate + 1);
        Tva testTva = tvaList.get(tvaList.size() - 1);
        assertThat(testTva.getTaux()).isEqualTo(DEFAULT_TAUX);
        assertThat(testTva.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testTva.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createTvaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tvaRepository.findAll().size();

        // Create the Tva with an existing ID
        tva.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTvaMockMvc.perform(post("/api/tvas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tva)))
            .andExpect(status().isBadRequest());

        // Validate the Tva in the database
        List<Tva> tvaList = tvaRepository.findAll();
        assertThat(tvaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTauxIsRequired() throws Exception {
        int databaseSizeBeforeTest = tvaRepository.findAll().size();
        // set the field null
        tva.setTaux(null);

        // Create the Tva, which fails.

        restTvaMockMvc.perform(post("/api/tvas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tva)))
            .andExpect(status().isBadRequest());

        List<Tva> tvaList = tvaRepository.findAll();
        assertThat(tvaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTvas() throws Exception {
        // Initialize the database
        tvaRepository.saveAndFlush(tva);

        // Get all the tvaList
        restTvaMockMvc.perform(get("/api/tvas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tva.getId().intValue())))
            .andExpect(jsonPath("$.[*].taux").value(hasItem(DEFAULT_TAUX)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getTva() throws Exception {
        // Initialize the database
        tvaRepository.saveAndFlush(tva);

        // Get the tva
        restTvaMockMvc.perform(get("/api/tvas/{id}", tva.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tva.getId().intValue()))
            .andExpect(jsonPath("$.taux").value(DEFAULT_TAUX))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTva() throws Exception {
        // Get the tva
        restTvaMockMvc.perform(get("/api/tvas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTva() throws Exception {
        // Initialize the database
        tvaRepository.saveAndFlush(tva);

        int databaseSizeBeforeUpdate = tvaRepository.findAll().size();

        // Update the tva
        Tva updatedTva = tvaRepository.findById(tva.getId()).get();
        // Disconnect from session so that the updates on updatedTva are not directly saved in db
        em.detach(updatedTva);
        updatedTva
            .taux(UPDATED_TAUX)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restTvaMockMvc.perform(put("/api/tvas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTva)))
            .andExpect(status().isOk());

        // Validate the Tva in the database
        List<Tva> tvaList = tvaRepository.findAll();
        assertThat(tvaList).hasSize(databaseSizeBeforeUpdate);
        Tva testTva = tvaList.get(tvaList.size() - 1);
        assertThat(testTva.getTaux()).isEqualTo(UPDATED_TAUX);
        assertThat(testTva.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testTva.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingTva() throws Exception {
        int databaseSizeBeforeUpdate = tvaRepository.findAll().size();

        // Create the Tva

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTvaMockMvc.perform(put("/api/tvas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tva)))
            .andExpect(status().isBadRequest());

        // Validate the Tva in the database
        List<Tva> tvaList = tvaRepository.findAll();
        assertThat(tvaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTva() throws Exception {
        // Initialize the database
        tvaRepository.saveAndFlush(tva);

        int databaseSizeBeforeDelete = tvaRepository.findAll().size();

        // Delete the tva
        restTvaMockMvc.perform(delete("/api/tvas/{id}", tva.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tva> tvaList = tvaRepository.findAll();
        assertThat(tvaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
