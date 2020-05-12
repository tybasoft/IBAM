package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Equipe;
import com.tybasoft.ibam.repository.EquipeRepository;

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
 * Integration tests for the {@link EquipeResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EquipeResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEquipeMockMvc;

    private Equipe equipe;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Equipe createEntity(EntityManager em) {
        Equipe equipe = new Equipe()
            .libelle(DEFAULT_LIBELLE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return equipe;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Equipe createUpdatedEntity(EntityManager em) {
        Equipe equipe = new Equipe()
            .libelle(UPDATED_LIBELLE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return equipe;
    }

    @BeforeEach
    public void initTest() {
        equipe = createEntity(em);
    }

    @Test
    @Transactional
    public void createEquipe() throws Exception {
        int databaseSizeBeforeCreate = equipeRepository.findAll().size();

        // Create the Equipe
        restEquipeMockMvc.perform(post("/api/equipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(equipe)))
            .andExpect(status().isCreated());

        // Validate the Equipe in the database
        List<Equipe> equipeList = equipeRepository.findAll();
        assertThat(equipeList).hasSize(databaseSizeBeforeCreate + 1);
        Equipe testEquipe = equipeList.get(equipeList.size() - 1);
        assertThat(testEquipe.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testEquipe.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testEquipe.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createEquipeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equipeRepository.findAll().size();

        // Create the Equipe with an existing ID
        equipe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEquipeMockMvc.perform(post("/api/equipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(equipe)))
            .andExpect(status().isBadRequest());

        // Validate the Equipe in the database
        List<Equipe> equipeList = equipeRepository.findAll();
        assertThat(equipeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = equipeRepository.findAll().size();
        // set the field null
        equipe.setLibelle(null);

        // Create the Equipe, which fails.

        restEquipeMockMvc.perform(post("/api/equipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(equipe)))
            .andExpect(status().isBadRequest());

        List<Equipe> equipeList = equipeRepository.findAll();
        assertThat(equipeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEquipes() throws Exception {
        // Initialize the database
        equipeRepository.saveAndFlush(equipe);

        // Get all the equipeList
        restEquipeMockMvc.perform(get("/api/equipes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equipe.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getEquipe() throws Exception {
        // Initialize the database
        equipeRepository.saveAndFlush(equipe);

        // Get the equipe
        restEquipeMockMvc.perform(get("/api/equipes/{id}", equipe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(equipe.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEquipe() throws Exception {
        // Get the equipe
        restEquipeMockMvc.perform(get("/api/equipes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEquipe() throws Exception {
        // Initialize the database
        equipeRepository.saveAndFlush(equipe);

        int databaseSizeBeforeUpdate = equipeRepository.findAll().size();

        // Update the equipe
        Equipe updatedEquipe = equipeRepository.findById(equipe.getId()).get();
        // Disconnect from session so that the updates on updatedEquipe are not directly saved in db
        em.detach(updatedEquipe);
        updatedEquipe
            .libelle(UPDATED_LIBELLE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restEquipeMockMvc.perform(put("/api/equipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEquipe)))
            .andExpect(status().isOk());

        // Validate the Equipe in the database
        List<Equipe> equipeList = equipeRepository.findAll();
        assertThat(equipeList).hasSize(databaseSizeBeforeUpdate);
        Equipe testEquipe = equipeList.get(equipeList.size() - 1);
        assertThat(testEquipe.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testEquipe.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testEquipe.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingEquipe() throws Exception {
        int databaseSizeBeforeUpdate = equipeRepository.findAll().size();

        // Create the Equipe

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEquipeMockMvc.perform(put("/api/equipes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(equipe)))
            .andExpect(status().isBadRequest());

        // Validate the Equipe in the database
        List<Equipe> equipeList = equipeRepository.findAll();
        assertThat(equipeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEquipe() throws Exception {
        // Initialize the database
        equipeRepository.saveAndFlush(equipe);

        int databaseSizeBeforeDelete = equipeRepository.findAll().size();

        // Delete the equipe
        restEquipeMockMvc.perform(delete("/api/equipes/{id}", equipe.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Equipe> equipeList = equipeRepository.findAll();
        assertThat(equipeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
