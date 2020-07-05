package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.TypeMateriel;
import com.tybasoft.ibam.repository.TypeMaterielRepository;

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
 * Integration tests for the {@link TypeMaterielResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TypeMaterielResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TypeMaterielRepository typeMaterielRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeMaterielMockMvc;

    private TypeMateriel typeMateriel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeMateriel createEntity(EntityManager em) {
        TypeMateriel typeMateriel = new TypeMateriel()
            .type(DEFAULT_TYPE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return typeMateriel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeMateriel createUpdatedEntity(EntityManager em) {
        TypeMateriel typeMateriel = new TypeMateriel()
            .type(UPDATED_TYPE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return typeMateriel;
    }

    @BeforeEach
    public void initTest() {
        typeMateriel = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeMateriel() throws Exception {
        int databaseSizeBeforeCreate = typeMaterielRepository.findAll().size();

        // Create the TypeMateriel
        restTypeMaterielMockMvc.perform(post("/api/type-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeMateriel)))
            .andExpect(status().isCreated());

        // Validate the TypeMateriel in the database
        List<TypeMateriel> typeMaterielList = typeMaterielRepository.findAll();
        assertThat(typeMaterielList).hasSize(databaseSizeBeforeCreate + 1);
        TypeMateriel testTypeMateriel = typeMaterielList.get(typeMaterielList.size() - 1);
        assertThat(testTypeMateriel.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testTypeMateriel.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testTypeMateriel.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createTypeMaterielWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeMaterielRepository.findAll().size();

        // Create the TypeMateriel with an existing ID
        typeMateriel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeMaterielMockMvc.perform(post("/api/type-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeMateriel)))
            .andExpect(status().isBadRequest());

        // Validate the TypeMateriel in the database
        List<TypeMateriel> typeMaterielList = typeMaterielRepository.findAll();
        assertThat(typeMaterielList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeMaterielRepository.findAll().size();
        // set the field null
        typeMateriel.setType(null);

        // Create the TypeMateriel, which fails.

        restTypeMaterielMockMvc.perform(post("/api/type-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeMateriel)))
            .andExpect(status().isBadRequest());

        List<TypeMateriel> typeMaterielList = typeMaterielRepository.findAll();
        assertThat(typeMaterielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeMateriels() throws Exception {
        // Initialize the database
        typeMaterielRepository.saveAndFlush(typeMateriel);

        // Get all the typeMaterielList
        restTypeMaterielMockMvc.perform(get("/api/type-materiels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeMateriel.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getTypeMateriel() throws Exception {
        // Initialize the database
        typeMaterielRepository.saveAndFlush(typeMateriel);

        // Get the typeMateriel
        restTypeMaterielMockMvc.perform(get("/api/type-materiels/{id}", typeMateriel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeMateriel.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeMateriel() throws Exception {
        // Get the typeMateriel
        restTypeMaterielMockMvc.perform(get("/api/type-materiels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeMateriel() throws Exception {
        // Initialize the database
        typeMaterielRepository.saveAndFlush(typeMateriel);

        int databaseSizeBeforeUpdate = typeMaterielRepository.findAll().size();

        // Update the typeMateriel
        TypeMateriel updatedTypeMateriel = typeMaterielRepository.findById(typeMateriel.getId()).get();
        // Disconnect from session so that the updates on updatedTypeMateriel are not directly saved in db
        em.detach(updatedTypeMateriel);
        updatedTypeMateriel
            .type(UPDATED_TYPE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restTypeMaterielMockMvc.perform(put("/api/type-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeMateriel)))
            .andExpect(status().isOk());

        // Validate the TypeMateriel in the database
        List<TypeMateriel> typeMaterielList = typeMaterielRepository.findAll();
        assertThat(typeMaterielList).hasSize(databaseSizeBeforeUpdate);
        TypeMateriel testTypeMateriel = typeMaterielList.get(typeMaterielList.size() - 1);
        assertThat(testTypeMateriel.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testTypeMateriel.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testTypeMateriel.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeMateriel() throws Exception {
        int databaseSizeBeforeUpdate = typeMaterielRepository.findAll().size();

        // Create the TypeMateriel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeMaterielMockMvc.perform(put("/api/type-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeMateriel)))
            .andExpect(status().isBadRequest());

        // Validate the TypeMateriel in the database
        List<TypeMateriel> typeMaterielList = typeMaterielRepository.findAll();
        assertThat(typeMaterielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeMateriel() throws Exception {
        // Initialize the database
        typeMaterielRepository.saveAndFlush(typeMateriel);

        int databaseSizeBeforeDelete = typeMaterielRepository.findAll().size();

        // Delete the typeMateriel
        restTypeMaterielMockMvc.perform(delete("/api/type-materiels/{id}", typeMateriel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeMateriel> typeMaterielList = typeMaterielRepository.findAll();
        assertThat(typeMaterielList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
