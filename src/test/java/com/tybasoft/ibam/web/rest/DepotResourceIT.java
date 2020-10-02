package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Depot;
import com.tybasoft.ibam.repository.DepotRepository;

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
 * Integration tests for the {@link DepotResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DepotResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_TEL = "AAAAAAAAAA";
    private static final String UPDATED_TEL = "BBBBBBBBBB";

    private static final String DEFAULT_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_VILLE = "BBBBBBBBBB";

    private static final String DEFAULT_PAYS = "AAAAAAAAAA";
    private static final String UPDATED_PAYS = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private DepotRepository depotRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDepotMockMvc;

    private Depot depot;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Depot createEntity(EntityManager em) {
        Depot depot = new Depot()
            .libelle(DEFAULT_LIBELLE)
            .adresse(DEFAULT_ADRESSE)
            .tel(DEFAULT_TEL)
            .ville(DEFAULT_VILLE)
            .pays(DEFAULT_PAYS)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return depot;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Depot createUpdatedEntity(EntityManager em) {
        Depot depot = new Depot()
            .libelle(UPDATED_LIBELLE)
            .adresse(UPDATED_ADRESSE)
            .tel(UPDATED_TEL)
            .ville(UPDATED_VILLE)
            .pays(UPDATED_PAYS)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return depot;
    }

    @BeforeEach
    public void initTest() {
        depot = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepot() throws Exception {
        int databaseSizeBeforeCreate = depotRepository.findAll().size();

        // Create the Depot
        restDepotMockMvc.perform(post("/api/depots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depot)))
            .andExpect(status().isCreated());

        // Validate the Depot in the database
        List<Depot> depotList = depotRepository.findAll();
        assertThat(depotList).hasSize(databaseSizeBeforeCreate + 1);
        Depot testDepot = depotList.get(depotList.size() - 1);
        assertThat(testDepot.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testDepot.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testDepot.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testDepot.getVille()).isEqualTo(DEFAULT_VILLE);
        assertThat(testDepot.getPays()).isEqualTo(DEFAULT_PAYS);
        assertThat(testDepot.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testDepot.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createDepotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = depotRepository.findAll().size();

        // Create the Depot with an existing ID
        depot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepotMockMvc.perform(post("/api/depots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depot)))
            .andExpect(status().isBadRequest());

        // Validate the Depot in the database
        List<Depot> depotList = depotRepository.findAll();
        assertThat(depotList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = depotRepository.findAll().size();
        // set the field null
        depot.setLibelle(null);

        // Create the Depot, which fails.

        restDepotMockMvc.perform(post("/api/depots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depot)))
            .andExpect(status().isBadRequest());

        List<Depot> depotList = depotRepository.findAll();
        assertThat(depotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = depotRepository.findAll().size();
        // set the field null
        depot.setAdresse(null);

        // Create the Depot, which fails.

        restDepotMockMvc.perform(post("/api/depots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depot)))
            .andExpect(status().isBadRequest());

        List<Depot> depotList = depotRepository.findAll();
        assertThat(depotList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDepots() throws Exception {
        // Initialize the database
        depotRepository.saveAndFlush(depot);

        // Get all the depotList
        restDepotMockMvc.perform(get("/api/depots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(depot.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL)))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE)))
            .andExpect(jsonPath("$.[*].pays").value(hasItem(DEFAULT_PAYS)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getDepot() throws Exception {
        // Initialize the database
        depotRepository.saveAndFlush(depot);

        // Get the depot
        restDepotMockMvc.perform(get("/api/depots/{id}", depot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(depot.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.tel").value(DEFAULT_TEL))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE))
            .andExpect(jsonPath("$.pays").value(DEFAULT_PAYS))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDepot() throws Exception {
        // Get the depot
        restDepotMockMvc.perform(get("/api/depots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepot() throws Exception {
        // Initialize the database
        depotRepository.saveAndFlush(depot);

        int databaseSizeBeforeUpdate = depotRepository.findAll().size();

        // Update the depot
        Depot updatedDepot = depotRepository.findById(depot.getId()).get();
        // Disconnect from session so that the updates on updatedDepot are not directly saved in db
        em.detach(updatedDepot);
        updatedDepot
            .libelle(UPDATED_LIBELLE)
            .adresse(UPDATED_ADRESSE)
            .tel(UPDATED_TEL)
            .ville(UPDATED_VILLE)
            .pays(UPDATED_PAYS)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restDepotMockMvc.perform(put("/api/depots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepot)))
            .andExpect(status().isOk());

        // Validate the Depot in the database
        List<Depot> depotList = depotRepository.findAll();
        assertThat(depotList).hasSize(databaseSizeBeforeUpdate);
        Depot testDepot = depotList.get(depotList.size() - 1);
        assertThat(testDepot.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testDepot.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testDepot.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testDepot.getVille()).isEqualTo(UPDATED_VILLE);
        assertThat(testDepot.getPays()).isEqualTo(UPDATED_PAYS);
        assertThat(testDepot.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testDepot.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingDepot() throws Exception {
        int databaseSizeBeforeUpdate = depotRepository.findAll().size();

        // Create the Depot

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDepotMockMvc.perform(put("/api/depots")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(depot)))
            .andExpect(status().isBadRequest());

        // Validate the Depot in the database
        List<Depot> depotList = depotRepository.findAll();
        assertThat(depotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDepot() throws Exception {
        // Initialize the database
        depotRepository.saveAndFlush(depot);

        int databaseSizeBeforeDelete = depotRepository.findAll().size();

        // Delete the depot
        restDepotMockMvc.perform(delete("/api/depots/{id}", depot.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Depot> depotList = depotRepository.findAll();
        assertThat(depotList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
