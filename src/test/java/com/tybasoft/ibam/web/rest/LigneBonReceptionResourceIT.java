package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.LigneBonReception;
import com.tybasoft.ibam.repository.LigneBonReceptionRepository;

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
 * Integration tests for the {@link LigneBonReceptionResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LigneBonReceptionResourceIT {

    private static final String DEFAULT_QUANTITE = "AAAAAAAAAA";
    private static final String UPDATED_QUANTITE = "BBBBBBBBBB";

    private static final String DEFAULT_PRIX_HT = "AAAAAAAAAA";
    private static final String UPDATED_PRIX_HT = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LigneBonReceptionRepository ligneBonReceptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneBonReceptionMockMvc;

    private LigneBonReception ligneBonReception;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneBonReception createEntity(EntityManager em) {
        LigneBonReception ligneBonReception = new LigneBonReception()
            .quantite(DEFAULT_QUANTITE)
            .prixHt(DEFAULT_PRIX_HT)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return ligneBonReception;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneBonReception createUpdatedEntity(EntityManager em) {
        LigneBonReception ligneBonReception = new LigneBonReception()
            .quantite(UPDATED_QUANTITE)
            .prixHt(UPDATED_PRIX_HT)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return ligneBonReception;
    }

    @BeforeEach
    public void initTest() {
        ligneBonReception = createEntity(em);
    }

    @Test
    @Transactional
    public void createLigneBonReception() throws Exception {
        int databaseSizeBeforeCreate = ligneBonReceptionRepository.findAll().size();
        // Create the LigneBonReception
        restLigneBonReceptionMockMvc.perform(post("/api/ligne-bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonReception)))
            .andExpect(status().isCreated());

        // Validate the LigneBonReception in the database
        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAll();
        assertThat(ligneBonReceptionList).hasSize(databaseSizeBeforeCreate + 1);
        LigneBonReception testLigneBonReception = ligneBonReceptionList.get(ligneBonReceptionList.size() - 1);
        assertThat(testLigneBonReception.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testLigneBonReception.getPrixHt()).isEqualTo(DEFAULT_PRIX_HT);
        assertThat(testLigneBonReception.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testLigneBonReception.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createLigneBonReceptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ligneBonReceptionRepository.findAll().size();

        // Create the LigneBonReception with an existing ID
        ligneBonReception.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneBonReceptionMockMvc.perform(post("/api/ligne-bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonReception)))
            .andExpect(status().isBadRequest());

        // Validate the LigneBonReception in the database
        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAll();
        assertThat(ligneBonReceptionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneBonReceptionRepository.findAll().size();
        // set the field null
        ligneBonReception.setQuantite(null);

        // Create the LigneBonReception, which fails.


        restLigneBonReceptionMockMvc.perform(post("/api/ligne-bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonReception)))
            .andExpect(status().isBadRequest());

        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAll();
        assertThat(ligneBonReceptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLigneBonReceptions() throws Exception {
        // Initialize the database
        ligneBonReceptionRepository.saveAndFlush(ligneBonReception);

        // Get all the ligneBonReceptionList
        restLigneBonReceptionMockMvc.perform(get("/api/ligne-bon-receptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneBonReception.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].prixHt").value(hasItem(DEFAULT_PRIX_HT)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }

    @Test
    @Transactional
    public void getLigneBonReception() throws Exception {
        // Initialize the database
        ligneBonReceptionRepository.saveAndFlush(ligneBonReception);

        // Get the ligneBonReception
        restLigneBonReceptionMockMvc.perform(get("/api/ligne-bon-receptions/{id}", ligneBonReception.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneBonReception.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.prixHt").value(DEFAULT_PRIX_HT))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLigneBonReception() throws Exception {
        // Get the ligneBonReception
        restLigneBonReceptionMockMvc.perform(get("/api/ligne-bon-receptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLigneBonReception() throws Exception {
        // Initialize the database
        ligneBonReceptionRepository.saveAndFlush(ligneBonReception);

        int databaseSizeBeforeUpdate = ligneBonReceptionRepository.findAll().size();

        // Update the ligneBonReception
        LigneBonReception updatedLigneBonReception = ligneBonReceptionRepository.findById(ligneBonReception.getId()).get();
        // Disconnect from session so that the updates on updatedLigneBonReception are not directly saved in db
        em.detach(updatedLigneBonReception);
        updatedLigneBonReception
            .quantite(UPDATED_QUANTITE)
            .prixHt(UPDATED_PRIX_HT)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restLigneBonReceptionMockMvc.perform(put("/api/ligne-bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLigneBonReception)))
            .andExpect(status().isOk());

        // Validate the LigneBonReception in the database
        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAll();
        assertThat(ligneBonReceptionList).hasSize(databaseSizeBeforeUpdate);
        LigneBonReception testLigneBonReception = ligneBonReceptionList.get(ligneBonReceptionList.size() - 1);
        assertThat(testLigneBonReception.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneBonReception.getPrixHt()).isEqualTo(UPDATED_PRIX_HT);
        assertThat(testLigneBonReception.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testLigneBonReception.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingLigneBonReception() throws Exception {
        int databaseSizeBeforeUpdate = ligneBonReceptionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneBonReceptionMockMvc.perform(put("/api/ligne-bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonReception)))
            .andExpect(status().isBadRequest());

        // Validate the LigneBonReception in the database
        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAll();
        assertThat(ligneBonReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLigneBonReception() throws Exception {
        // Initialize the database
        ligneBonReceptionRepository.saveAndFlush(ligneBonReception);

        int databaseSizeBeforeDelete = ligneBonReceptionRepository.findAll().size();

        // Delete the ligneBonReception
        restLigneBonReceptionMockMvc.perform(delete("/api/ligne-bon-receptions/{id}", ligneBonReception.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneBonReception> ligneBonReceptionList = ligneBonReceptionRepository.findAll();
        assertThat(ligneBonReceptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
