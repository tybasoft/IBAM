package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.LigneBonSortie;
import com.tybasoft.ibam.domain.BonSortie;
import com.tybasoft.ibam.repository.LigneBonSortieRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LigneBonSortieResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LigneBonSortieResourceIT {

    private static final String DEFAULT_QUANTITE = "AAAAAAAAAA";
    private static final String UPDATED_QUANTITE = "BBBBBBBBBB";

    private static final String DEFAULT_PRIX_HT = "AAAAAAAAAA";
    private static final String UPDATED_PRIX_HT = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private LigneBonSortieRepository ligneBonSortieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneBonSortieMockMvc;

    private LigneBonSortie ligneBonSortie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneBonSortie createEntity(EntityManager em) {
        LigneBonSortie ligneBonSortie = new LigneBonSortie()
            .quantite(DEFAULT_QUANTITE)
            .prixHt(DEFAULT_PRIX_HT)
            .type(DEFAULT_TYPE);
        // Add required entity
        BonSortie bonSortie;
        if (TestUtil.findAll(em, BonSortie.class).isEmpty()) {
            bonSortie = BonSortieResourceIT.createEntity(em);
            em.persist(bonSortie);
            em.flush();
        } else {
            bonSortie = TestUtil.findAll(em, BonSortie.class).get(0);
        }
        ligneBonSortie.setBonSortie(bonSortie);
        return ligneBonSortie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneBonSortie createUpdatedEntity(EntityManager em) {
        LigneBonSortie ligneBonSortie = new LigneBonSortie()
            .quantite(UPDATED_QUANTITE)
            .prixHt(UPDATED_PRIX_HT)
            .type(UPDATED_TYPE);
        // Add required entity
        BonSortie bonSortie;
        if (TestUtil.findAll(em, BonSortie.class).isEmpty()) {
            bonSortie = BonSortieResourceIT.createUpdatedEntity(em);
            em.persist(bonSortie);
            em.flush();
        } else {
            bonSortie = TestUtil.findAll(em, BonSortie.class).get(0);
        }
        ligneBonSortie.setBonSortie(bonSortie);
        return ligneBonSortie;
    }

    @BeforeEach
    public void initTest() {
        ligneBonSortie = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllLigneBonSorties() throws Exception {
        // Initialize the database
        ligneBonSortieRepository.saveAndFlush(ligneBonSortie);

        // Get all the ligneBonSortieList
        restLigneBonSortieMockMvc.perform(get("/api/ligne-bon-sorties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneBonSortie.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].prixHt").value(hasItem(DEFAULT_PRIX_HT)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getLigneBonSortie() throws Exception {
        // Initialize the database
        ligneBonSortieRepository.saveAndFlush(ligneBonSortie);

        // Get the ligneBonSortie
        restLigneBonSortieMockMvc.perform(get("/api/ligne-bon-sorties/{id}", ligneBonSortie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneBonSortie.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.prixHt").value(DEFAULT_PRIX_HT))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }
    @Test
    @Transactional
    public void getNonExistingLigneBonSortie() throws Exception {
        // Get the ligneBonSortie
        restLigneBonSortieMockMvc.perform(get("/api/ligne-bon-sorties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }
}
