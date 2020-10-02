package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Unite;
import com.tybasoft.ibam.repository.UniteRepository;

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
 * Integration tests for the {@link UniteResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class UniteResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_SYMBOLE = "AAAAAAAAAA";
    private static final String UPDATED_SYMBOLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UniteRepository uniteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUniteMockMvc;

    private Unite unite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Unite createEntity(EntityManager em) {
        Unite unite = new Unite()
            .libelle(DEFAULT_LIBELLE)
            .symbole(DEFAULT_SYMBOLE)
            .description(DEFAULT_DESCRIPTION)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return unite;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Unite createUpdatedEntity(EntityManager em) {
        Unite unite = new Unite()
            .libelle(UPDATED_LIBELLE)
            .symbole(UPDATED_SYMBOLE)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return unite;
    }

    @BeforeEach
    public void initTest() {
        unite = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnite() throws Exception {
        int databaseSizeBeforeCreate = uniteRepository.findAll().size();

        // Create the Unite
        restUniteMockMvc.perform(post("/api/unites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isCreated());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeCreate + 1);
        Unite testUnite = uniteList.get(uniteList.size() - 1);
        assertThat(testUnite.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testUnite.getSymbole()).isEqualTo(DEFAULT_SYMBOLE);
        assertThat(testUnite.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testUnite.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testUnite.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createUniteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uniteRepository.findAll().size();

        // Create the Unite with an existing ID
        unite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUniteMockMvc.perform(post("/api/unites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isBadRequest());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = uniteRepository.findAll().size();
        // set the field null
        unite.setLibelle(null);

        // Create the Unite, which fails.

        restUniteMockMvc.perform(post("/api/unites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isBadRequest());

        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSymboleIsRequired() throws Exception {
        int databaseSizeBeforeTest = uniteRepository.findAll().size();
        // set the field null
        unite.setSymbole(null);

        // Create the Unite, which fails.

        restUniteMockMvc.perform(post("/api/unites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isBadRequest());

        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUnites() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        // Get all the uniteList
        restUniteMockMvc.perform(get("/api/unites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unite.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].symbole").value(hasItem(DEFAULT_SYMBOLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getUnite() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        // Get the unite
        restUniteMockMvc.perform(get("/api/unites/{id}", unite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(unite.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.symbole").value(DEFAULT_SYMBOLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUnite() throws Exception {
        // Get the unite
        restUniteMockMvc.perform(get("/api/unites/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnite() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        int databaseSizeBeforeUpdate = uniteRepository.findAll().size();

        // Update the unite
        Unite updatedUnite = uniteRepository.findById(unite.getId()).get();
        // Disconnect from session so that the updates on updatedUnite are not directly saved in db
        em.detach(updatedUnite);
        updatedUnite
            .libelle(UPDATED_LIBELLE)
            .symbole(UPDATED_SYMBOLE)
            .description(UPDATED_DESCRIPTION)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restUniteMockMvc.perform(put("/api/unites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnite)))
            .andExpect(status().isOk());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeUpdate);
        Unite testUnite = uniteList.get(uniteList.size() - 1);
        assertThat(testUnite.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testUnite.getSymbole()).isEqualTo(UPDATED_SYMBOLE);
        assertThat(testUnite.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testUnite.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testUnite.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingUnite() throws Exception {
        int databaseSizeBeforeUpdate = uniteRepository.findAll().size();

        // Create the Unite

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUniteMockMvc.perform(put("/api/unites")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unite)))
            .andExpect(status().isBadRequest());

        // Validate the Unite in the database
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnite() throws Exception {
        // Initialize the database
        uniteRepository.saveAndFlush(unite);

        int databaseSizeBeforeDelete = uniteRepository.findAll().size();

        // Delete the unite
        restUniteMockMvc.perform(delete("/api/unites/{id}", unite.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Unite> uniteList = uniteRepository.findAll();
        assertThat(uniteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
