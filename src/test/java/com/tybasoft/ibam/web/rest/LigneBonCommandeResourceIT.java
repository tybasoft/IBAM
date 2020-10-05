package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.LigneBonCommande;
import com.tybasoft.ibam.domain.BonCommande;
import com.tybasoft.ibam.repository.LigneBonCommandeRepository;

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
 * Integration tests for the {@link LigneBonCommandeResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LigneBonCommandeResourceIT {

    private static final String DEFAULT_QUANTITE = "AAAAAAAAAA";
    private static final String UPDATED_QUANTITE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LigneBonCommandeRepository ligneBonCommandeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneBonCommandeMockMvc;

    private LigneBonCommande ligneBonCommande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneBonCommande createEntity(EntityManager em) {
        LigneBonCommande ligneBonCommande = new LigneBonCommande()
            .quantite(DEFAULT_QUANTITE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        // Add required entity
        BonCommande bonCommande;
        if (TestUtil.findAll(em, BonCommande.class).isEmpty()) {
            bonCommande = BonCommandeResourceIT.createEntity(em);
            em.persist(bonCommande);
            em.flush();
        } else {
            bonCommande = TestUtil.findAll(em, BonCommande.class).get(0);
        }
        ligneBonCommande.setBonCommande(bonCommande);
        return ligneBonCommande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneBonCommande createUpdatedEntity(EntityManager em) {
        LigneBonCommande ligneBonCommande = new LigneBonCommande()
            .quantite(UPDATED_QUANTITE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        // Add required entity
        BonCommande bonCommande;
        if (TestUtil.findAll(em, BonCommande.class).isEmpty()) {
            bonCommande = BonCommandeResourceIT.createUpdatedEntity(em);
            em.persist(bonCommande);
            em.flush();
        } else {
            bonCommande = TestUtil.findAll(em, BonCommande.class).get(0);
        }
        ligneBonCommande.setBonCommande(bonCommande);
        return ligneBonCommande;
    }

    @BeforeEach
    public void initTest() {
        ligneBonCommande = createEntity(em);
    }

    @Test
    @Transactional
    public void createLigneBonCommande() throws Exception {
        int databaseSizeBeforeCreate = ligneBonCommandeRepository.findAll().size();
        // Create the LigneBonCommande
        restLigneBonCommandeMockMvc.perform(post("/api/ligne-bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonCommande)))
            .andExpect(status().isCreated());

        // Validate the LigneBonCommande in the database
        List<LigneBonCommande> ligneBonCommandeList = ligneBonCommandeRepository.findAll();
        assertThat(ligneBonCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        LigneBonCommande testLigneBonCommande = ligneBonCommandeList.get(ligneBonCommandeList.size() - 1);
        assertThat(testLigneBonCommande.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testLigneBonCommande.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testLigneBonCommande.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createLigneBonCommandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ligneBonCommandeRepository.findAll().size();

        // Create the LigneBonCommande with an existing ID
        ligneBonCommande.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneBonCommandeMockMvc.perform(post("/api/ligne-bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonCommande)))
            .andExpect(status().isBadRequest());

        // Validate the LigneBonCommande in the database
        List<LigneBonCommande> ligneBonCommandeList = ligneBonCommandeRepository.findAll();
        assertThat(ligneBonCommandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = ligneBonCommandeRepository.findAll().size();
        // set the field null
        ligneBonCommande.setQuantite(null);

        // Create the LigneBonCommande, which fails.


        restLigneBonCommandeMockMvc.perform(post("/api/ligne-bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonCommande)))
            .andExpect(status().isBadRequest());

        List<LigneBonCommande> ligneBonCommandeList = ligneBonCommandeRepository.findAll();
        assertThat(ligneBonCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLigneBonCommandes() throws Exception {
        // Initialize the database
        ligneBonCommandeRepository.saveAndFlush(ligneBonCommande);

        // Get all the ligneBonCommandeList
        restLigneBonCommandeMockMvc.perform(get("/api/ligne-bon-commandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneBonCommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }

    @Test
    @Transactional
    public void getLigneBonCommande() throws Exception {
        // Initialize the database
        ligneBonCommandeRepository.saveAndFlush(ligneBonCommande);

        // Get the ligneBonCommande
        restLigneBonCommandeMockMvc.perform(get("/api/ligne-bon-commandes/{id}", ligneBonCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneBonCommande.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLigneBonCommande() throws Exception {
        // Get the ligneBonCommande
        restLigneBonCommandeMockMvc.perform(get("/api/ligne-bon-commandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLigneBonCommande() throws Exception {
        // Initialize the database
        ligneBonCommandeRepository.saveAndFlush(ligneBonCommande);

        int databaseSizeBeforeUpdate = ligneBonCommandeRepository.findAll().size();

        // Update the ligneBonCommande
        LigneBonCommande updatedLigneBonCommande = ligneBonCommandeRepository.findById(ligneBonCommande.getId()).get();
        // Disconnect from session so that the updates on updatedLigneBonCommande are not directly saved in db
        em.detach(updatedLigneBonCommande);
        updatedLigneBonCommande
            .quantite(UPDATED_QUANTITE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restLigneBonCommandeMockMvc.perform(put("/api/ligne-bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLigneBonCommande)))
            .andExpect(status().isOk());

        // Validate the LigneBonCommande in the database
        List<LigneBonCommande> ligneBonCommandeList = ligneBonCommandeRepository.findAll();
        assertThat(ligneBonCommandeList).hasSize(databaseSizeBeforeUpdate);
        LigneBonCommande testLigneBonCommande = ligneBonCommandeList.get(ligneBonCommandeList.size() - 1);
        assertThat(testLigneBonCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneBonCommande.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testLigneBonCommande.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingLigneBonCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneBonCommandeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneBonCommandeMockMvc.perform(put("/api/ligne-bon-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ligneBonCommande)))
            .andExpect(status().isBadRequest());

        // Validate the LigneBonCommande in the database
        List<LigneBonCommande> ligneBonCommandeList = ligneBonCommandeRepository.findAll();
        assertThat(ligneBonCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLigneBonCommande() throws Exception {
        // Initialize the database
        ligneBonCommandeRepository.saveAndFlush(ligneBonCommande);

        int databaseSizeBeforeDelete = ligneBonCommandeRepository.findAll().size();

        // Delete the ligneBonCommande
        restLigneBonCommandeMockMvc.perform(delete("/api/ligne-bon-commandes/{id}", ligneBonCommande.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneBonCommande> ligneBonCommandeList = ligneBonCommandeRepository.findAll();
        assertThat(ligneBonCommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
