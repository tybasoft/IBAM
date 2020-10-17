package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.BonCommande;
import com.tybasoft.ibam.repository.BonCommandeRepository;

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
 * Integration tests for the {@link BonCommandeResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class BonCommandeResourceIT {

    private static final LocalDate DEFAULT_DATE_PREV_LIV = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_PREV_LIV = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REMARQUES = "AAAAAAAAAA";
    private static final String UPDATED_REMARQUES = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_CREATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CREATION = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_VALIDE = false;
    private static final Boolean UPDATED_VALIDE = true;

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private BonCommandeRepository bonCommandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBonCommandeMockMvc;

    private BonCommande bonCommande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonCommande createEntity(EntityManager em) {
        BonCommande bonCommande = new BonCommande()
            .datePrevLiv(DEFAULT_DATE_PREV_LIV)
            .remarques(DEFAULT_REMARQUES)
            .dateCreation(DEFAULT_DATE_CREATION)
            .valide(DEFAULT_VALIDE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return bonCommande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonCommande createUpdatedEntity(EntityManager em) {
        BonCommande bonCommande = new BonCommande()
            .datePrevLiv(UPDATED_DATE_PREV_LIV)
            .remarques(UPDATED_REMARQUES)
            .dateCreation(UPDATED_DATE_CREATION)
            .valide(UPDATED_VALIDE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return bonCommande;
    }

    @BeforeEach
    public void initTest() {
        bonCommande = createEntity(em);
    }

    @Test
    @Transactional
    public void createBonCommande() throws Exception {
        int databaseSizeBeforeCreate = bonCommandeRepository.findAll().size();

        // Create the BonCommande
        restBonCommandeMockMvc.perform(post("/api/bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonCommande)))
            .andExpect(status().isCreated());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        BonCommande testBonCommande = bonCommandeList.get(bonCommandeList.size() - 1);
        assertThat(testBonCommande.getDatePrevLiv()).isEqualTo(DEFAULT_DATE_PREV_LIV);
        assertThat(testBonCommande.getRemarques()).isEqualTo(DEFAULT_REMARQUES);
        assertThat(testBonCommande.getDateCreation()).isEqualTo(DEFAULT_DATE_CREATION);
        assertThat(testBonCommande.isValide()).isEqualTo(DEFAULT_VALIDE);
        assertThat(testBonCommande.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testBonCommande.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createBonCommandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bonCommandeRepository.findAll().size();

        // Create the BonCommande with an existing ID
        bonCommande.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBonCommandeMockMvc.perform(post("/api/bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonCommande)))
            .andExpect(status().isBadRequest());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateCreationIsRequired() throws Exception {
        int databaseSizeBeforeTest = bonCommandeRepository.findAll().size();
        // set the field null
        bonCommande.setDateCreation(null);

        // Create the BonCommande, which fails.

        restBonCommandeMockMvc.perform(post("/api/bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonCommande)))
            .andExpect(status().isBadRequest());

        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBonCommandes() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        // Get all the bonCommandeList
        restBonCommandeMockMvc.perform(get("/api/bon-commandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bonCommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].datePrevLiv").value(hasItem(DEFAULT_DATE_PREV_LIV.toString())))
            .andExpect(jsonPath("$.[*].remarques").value(hasItem(DEFAULT_REMARQUES)))
            .andExpect(jsonPath("$.[*].dateCreation").value(hasItem(DEFAULT_DATE_CREATION.toString())))
            .andExpect(jsonPath("$.[*].valide").value(hasItem(DEFAULT_VALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getBonCommande() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        // Get the bonCommande
        restBonCommandeMockMvc.perform(get("/api/bon-commandes/{id}", bonCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bonCommande.getId().intValue()))
            .andExpect(jsonPath("$.datePrevLiv").value(DEFAULT_DATE_PREV_LIV.toString()))
            .andExpect(jsonPath("$.remarques").value(DEFAULT_REMARQUES))
            .andExpect(jsonPath("$.dateCreation").value(DEFAULT_DATE_CREATION.toString()))
            .andExpect(jsonPath("$.valide").value(DEFAULT_VALIDE.booleanValue()))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBonCommande() throws Exception {
        // Get the bonCommande
        restBonCommandeMockMvc.perform(get("/api/bon-commandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBonCommande() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();

        // Update the bonCommande
        BonCommande updatedBonCommande = bonCommandeRepository.findById(bonCommande.getId()).get();
        // Disconnect from session so that the updates on updatedBonCommande are not directly saved in db
        em.detach(updatedBonCommande);
        updatedBonCommande
            .datePrevLiv(UPDATED_DATE_PREV_LIV)
            .remarques(UPDATED_REMARQUES)
            .dateCreation(UPDATED_DATE_CREATION)
            .valide(UPDATED_VALIDE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restBonCommandeMockMvc.perform(put("/api/bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBonCommande)))
            .andExpect(status().isOk());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
        BonCommande testBonCommande = bonCommandeList.get(bonCommandeList.size() - 1);
        assertThat(testBonCommande.getDatePrevLiv()).isEqualTo(UPDATED_DATE_PREV_LIV);
        assertThat(testBonCommande.getRemarques()).isEqualTo(UPDATED_REMARQUES);
        assertThat(testBonCommande.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
        assertThat(testBonCommande.isValide()).isEqualTo(UPDATED_VALIDE);
        assertThat(testBonCommande.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testBonCommande.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = bonCommandeRepository.findAll().size();

        // Create the BonCommande

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBonCommandeMockMvc.perform(put("/api/bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonCommande)))
            .andExpect(status().isBadRequest());

        // Validate the BonCommande in the database
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBonCommande() throws Exception {
        // Initialize the database
        bonCommandeRepository.saveAndFlush(bonCommande);

        int databaseSizeBeforeDelete = bonCommandeRepository.findAll().size();

        // Delete the bonCommande
        restBonCommandeMockMvc.perform(delete("/api/bon-commandes/{id}", bonCommande.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BonCommande> bonCommandeList = bonCommandeRepository.findAll();
        assertThat(bonCommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
