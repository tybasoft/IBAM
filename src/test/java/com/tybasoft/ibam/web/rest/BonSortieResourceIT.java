package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.BonSortie;
import com.tybasoft.ibam.domain.Projet;
import com.tybasoft.ibam.repository.BonSortieRepository;

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
 * Integration tests for the {@link BonSortieResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BonSortieResourceIT {

    private static final LocalDate DEFAULT_DATE_SORTIE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_SORTIE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_CREATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CREATION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_REMARQUES = "AAAAAAAAAA";
    private static final String UPDATED_REMARQUES = "BBBBBBBBBB";

    @Autowired
    private BonSortieRepository bonSortieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBonSortieMockMvc;

    private BonSortie bonSortie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonSortie createEntity(EntityManager em) {
        BonSortie bonSortie = new BonSortie()
            .dateSortie(DEFAULT_DATE_SORTIE)
            .dateCreation(DEFAULT_DATE_CREATION)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF)
            .remarques(DEFAULT_REMARQUES);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        bonSortie.setProjet(projet);
        return bonSortie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BonSortie createUpdatedEntity(EntityManager em) {
        BonSortie bonSortie = new BonSortie()
            .dateSortie(UPDATED_DATE_SORTIE)
            .dateCreation(UPDATED_DATE_CREATION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF)
            .remarques(UPDATED_REMARQUES);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createUpdatedEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        bonSortie.setProjet(projet);
        return bonSortie;
    }

    @BeforeEach
    public void initTest() {
        bonSortie = createEntity(em);
    }

    @Test
    @Transactional
    public void createBonSortie() throws Exception {
        int databaseSizeBeforeCreate = bonSortieRepository.findAll().size();
        // Create the BonSortie
        restBonSortieMockMvc.perform(post("/api/bon-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonSortie)))
            .andExpect(status().isCreated());

        // Validate the BonSortie in the database
        List<BonSortie> bonSortieList = bonSortieRepository.findAll();
        assertThat(bonSortieList).hasSize(databaseSizeBeforeCreate + 1);
        BonSortie testBonSortie = bonSortieList.get(bonSortieList.size() - 1);
        assertThat(testBonSortie.getDateSortie()).isEqualTo(DEFAULT_DATE_SORTIE);
        assertThat(testBonSortie.getDateCreation()).isEqualTo(DEFAULT_DATE_CREATION);
        assertThat(testBonSortie.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testBonSortie.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
        assertThat(testBonSortie.getRemarques()).isEqualTo(DEFAULT_REMARQUES);
    }

    @Test
    @Transactional
    public void createBonSortieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bonSortieRepository.findAll().size();

        // Create the BonSortie with an existing ID
        bonSortie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBonSortieMockMvc.perform(post("/api/bon-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonSortie)))
            .andExpect(status().isBadRequest());

        // Validate the BonSortie in the database
        List<BonSortie> bonSortieList = bonSortieRepository.findAll();
        assertThat(bonSortieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateSortieIsRequired() throws Exception {
        int databaseSizeBeforeTest = bonSortieRepository.findAll().size();
        // set the field null
        bonSortie.setDateSortie(null);

        // Create the BonSortie, which fails.


        restBonSortieMockMvc.perform(post("/api/bon-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonSortie)))
            .andExpect(status().isBadRequest());

        List<BonSortie> bonSortieList = bonSortieRepository.findAll();
        assertThat(bonSortieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBonSorties() throws Exception {
        // Initialize the database
        bonSortieRepository.saveAndFlush(bonSortie);

        // Get all the bonSortieList
        restBonSortieMockMvc.perform(get("/api/bon-sorties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bonSortie.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateSortie").value(hasItem(DEFAULT_DATE_SORTIE.toString())))
            .andExpect(jsonPath("$.[*].dateCreation").value(hasItem(DEFAULT_DATE_CREATION.toString())))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())))
            .andExpect(jsonPath("$.[*].remarques").value(hasItem(DEFAULT_REMARQUES)));
    }
    
    @Test
    @Transactional
    public void getBonSortie() throws Exception {
        // Initialize the database
        bonSortieRepository.saveAndFlush(bonSortie);

        // Get the bonSortie
        restBonSortieMockMvc.perform(get("/api/bon-sorties/{id}", bonSortie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bonSortie.getId().intValue()))
            .andExpect(jsonPath("$.dateSortie").value(DEFAULT_DATE_SORTIE.toString()))
            .andExpect(jsonPath("$.dateCreation").value(DEFAULT_DATE_CREATION.toString()))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()))
            .andExpect(jsonPath("$.remarques").value(DEFAULT_REMARQUES));
    }
    @Test
    @Transactional
    public void getNonExistingBonSortie() throws Exception {
        // Get the bonSortie
        restBonSortieMockMvc.perform(get("/api/bon-sorties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBonSortie() throws Exception {
        // Initialize the database
        bonSortieRepository.saveAndFlush(bonSortie);

        int databaseSizeBeforeUpdate = bonSortieRepository.findAll().size();

        // Update the bonSortie
        BonSortie updatedBonSortie = bonSortieRepository.findById(bonSortie.getId()).get();
        // Disconnect from session so that the updates on updatedBonSortie are not directly saved in db
        em.detach(updatedBonSortie);
        updatedBonSortie
            .dateSortie(UPDATED_DATE_SORTIE)
            .dateCreation(UPDATED_DATE_CREATION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF)
            .remarques(UPDATED_REMARQUES);

        restBonSortieMockMvc.perform(put("/api/bon-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBonSortie)))
            .andExpect(status().isOk());

        // Validate the BonSortie in the database
        List<BonSortie> bonSortieList = bonSortieRepository.findAll();
        assertThat(bonSortieList).hasSize(databaseSizeBeforeUpdate);
        BonSortie testBonSortie = bonSortieList.get(bonSortieList.size() - 1);
        assertThat(testBonSortie.getDateSortie()).isEqualTo(UPDATED_DATE_SORTIE);
        assertThat(testBonSortie.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
        assertThat(testBonSortie.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testBonSortie.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
        assertThat(testBonSortie.getRemarques()).isEqualTo(UPDATED_REMARQUES);
    }

    @Test
    @Transactional
    public void updateNonExistingBonSortie() throws Exception {
        int databaseSizeBeforeUpdate = bonSortieRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBonSortieMockMvc.perform(put("/api/bon-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bonSortie)))
            .andExpect(status().isBadRequest());

        // Validate the BonSortie in the database
        List<BonSortie> bonSortieList = bonSortieRepository.findAll();
        assertThat(bonSortieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBonSortie() throws Exception {
        // Initialize the database
        bonSortieRepository.saveAndFlush(bonSortie);

        int databaseSizeBeforeDelete = bonSortieRepository.findAll().size();

        // Delete the bonSortie
        restBonSortieMockMvc.perform(delete("/api/bon-sorties/{id}", bonSortie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BonSortie> bonSortieList = bonSortieRepository.findAll();
        assertThat(bonSortieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
