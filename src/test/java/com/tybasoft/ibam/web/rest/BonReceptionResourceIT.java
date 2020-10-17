package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.BonReception;
import com.tybasoft.ibam.repository.BonReceptionRepository;

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
 * Integration tests for the {@link BonReceptionResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class BonReceptionResourceIT {

    private static final String DEFAULT_LIVREUR = "AAAAAAAAAA";
    private static final String UPDATED_LIVREUR = "BBBBBBBBBB";

    private static final String DEFAULT_REMARQUES = "AAAAAAAAAA";
    private static final String UPDATED_REMARQUES = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_LIVRAISON = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_LIVRAISON = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private BonReceptionRepository bonReceptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBonReceptionMockMvc;

    private BonReception bonReception;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonReception createEntity(EntityManager em) {
        BonReception bonReception = new BonReception()
            .livreur(DEFAULT_LIVREUR)
            .remarques(DEFAULT_REMARQUES)
            .dateLivraison(DEFAULT_DATE_LIVRAISON)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return bonReception;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonReception createUpdatedEntity(EntityManager em) {
        BonReception bonReception = new BonReception()
            .livreur(UPDATED_LIVREUR)
            .remarques(UPDATED_REMARQUES)
            .dateLivraison(UPDATED_DATE_LIVRAISON)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return bonReception;
    }

    @BeforeEach
    public void initTest() {
        bonReception = createEntity(em);
    }

    @Test
    @Transactional
    public void createBonReception() throws Exception {
        int databaseSizeBeforeCreate = bonReceptionRepository.findAll().size();

        // Create the BonReception
        restBonReceptionMockMvc.perform(post("/api/bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonReception)))
            .andExpect(status().isCreated());

        // Validate the BonReception in the database
        List<BonReception> bonReceptionList = bonReceptionRepository.findAll();
        assertThat(bonReceptionList).hasSize(databaseSizeBeforeCreate + 1);
        BonReception testBonReception = bonReceptionList.get(bonReceptionList.size() - 1);
        assertThat(testBonReception.getLivreur()).isEqualTo(DEFAULT_LIVREUR);
        assertThat(testBonReception.getRemarques()).isEqualTo(DEFAULT_REMARQUES);
        assertThat(testBonReception.getDateLivraison()).isEqualTo(DEFAULT_DATE_LIVRAISON);
        assertThat(testBonReception.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testBonReception.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createBonReceptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bonReceptionRepository.findAll().size();

        // Create the BonReception with an existing ID
        bonReception.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBonReceptionMockMvc.perform(post("/api/bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonReception)))
            .andExpect(status().isBadRequest());

        // Validate the BonReception in the database
        List<BonReception> bonReceptionList = bonReceptionRepository.findAll();
        assertThat(bonReceptionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateLivraisonIsRequired() throws Exception {
        int databaseSizeBeforeTest = bonReceptionRepository.findAll().size();
        // set the field null
        bonReception.setDateLivraison(null);

        // Create the BonReception, which fails.

        restBonReceptionMockMvc.perform(post("/api/bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonReception)))
            .andExpect(status().isBadRequest());

        List<BonReception> bonReceptionList = bonReceptionRepository.findAll();
        assertThat(bonReceptionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBonReceptions() throws Exception {
        // Initialize the database
        bonReceptionRepository.saveAndFlush(bonReception);

        // Get all the bonReceptionList
        restBonReceptionMockMvc.perform(get("/api/bon-receptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bonReception.getId().intValue())))
            .andExpect(jsonPath("$.[*].livreur").value(hasItem(DEFAULT_LIVREUR)))
            .andExpect(jsonPath("$.[*].remarques").value(hasItem(DEFAULT_REMARQUES)))
            .andExpect(jsonPath("$.[*].dateLivraison").value(hasItem(DEFAULT_DATE_LIVRAISON.toString())))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getBonReception() throws Exception {
        // Initialize the database
        bonReceptionRepository.saveAndFlush(bonReception);

        // Get the bonReception
        restBonReceptionMockMvc.perform(get("/api/bon-receptions/{id}", bonReception.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bonReception.getId().intValue()))
            .andExpect(jsonPath("$.livreur").value(DEFAULT_LIVREUR))
            .andExpect(jsonPath("$.remarques").value(DEFAULT_REMARQUES))
            .andExpect(jsonPath("$.dateLivraison").value(DEFAULT_DATE_LIVRAISON.toString()))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBonReception() throws Exception {
        // Get the bonReception
        restBonReceptionMockMvc.perform(get("/api/bon-receptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBonReception() throws Exception {
        // Initialize the database
        bonReceptionRepository.saveAndFlush(bonReception);

        int databaseSizeBeforeUpdate = bonReceptionRepository.findAll().size();

        // Update the bonReception
        BonReception updatedBonReception = bonReceptionRepository.findById(bonReception.getId()).get();
        // Disconnect from session so that the updates on updatedBonReception are not directly saved in db
        em.detach(updatedBonReception);
        updatedBonReception
            .livreur(UPDATED_LIVREUR)
            .remarques(UPDATED_REMARQUES)
            .dateLivraison(UPDATED_DATE_LIVRAISON)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restBonReceptionMockMvc.perform(put("/api/bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBonReception)))
            .andExpect(status().isOk());

        // Validate the BonReception in the database
        List<BonReception> bonReceptionList = bonReceptionRepository.findAll();
        assertThat(bonReceptionList).hasSize(databaseSizeBeforeUpdate);
        BonReception testBonReception = bonReceptionList.get(bonReceptionList.size() - 1);
        assertThat(testBonReception.getLivreur()).isEqualTo(UPDATED_LIVREUR);
        assertThat(testBonReception.getRemarques()).isEqualTo(UPDATED_REMARQUES);
        assertThat(testBonReception.getDateLivraison()).isEqualTo(UPDATED_DATE_LIVRAISON);
        assertThat(testBonReception.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testBonReception.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingBonReception() throws Exception {
        int databaseSizeBeforeUpdate = bonReceptionRepository.findAll().size();

        // Create the BonReception

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBonReceptionMockMvc.perform(put("/api/bon-receptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonReception)))
            .andExpect(status().isBadRequest());

        // Validate the BonReception in the database
        List<BonReception> bonReceptionList = bonReceptionRepository.findAll();
        assertThat(bonReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBonReception() throws Exception {
        // Initialize the database
        bonReceptionRepository.saveAndFlush(bonReception);

        int databaseSizeBeforeDelete = bonReceptionRepository.findAll().size();

        // Delete the bonReception
        restBonReceptionMockMvc.perform(delete("/api/bon-receptions/{id}", bonReception.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BonReception> bonReceptionList = bonReceptionRepository.findAll();
        assertThat(bonReceptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
