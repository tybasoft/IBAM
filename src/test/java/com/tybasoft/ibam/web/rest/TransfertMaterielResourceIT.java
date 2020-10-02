package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.TransfertMateriel;
import com.tybasoft.ibam.repository.TransfertMaterielRepository;

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

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TransfertMaterielResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TransfertMaterielResourceIT {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_TRANSFERT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_TRANSFERT = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_MODIF = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_MODIF = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TransfertMaterielRepository transfertMaterielRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTransfertMaterielMockMvc;

    private TransfertMateriel transfertMateriel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransfertMateriel createEntity(EntityManager em) {
        TransfertMateriel transfertMateriel = new TransfertMateriel()
            .reference(DEFAULT_REFERENCE)
            .dateTransfert(DEFAULT_DATE_TRANSFERT)
            .commentaire(DEFAULT_COMMENTAIRE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return transfertMateriel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TransfertMateriel createUpdatedEntity(EntityManager em) {
        TransfertMateriel transfertMateriel = new TransfertMateriel()
            .reference(UPDATED_REFERENCE)
            .dateTransfert(UPDATED_DATE_TRANSFERT)
            .commentaire(UPDATED_COMMENTAIRE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return transfertMateriel;
    }

    @BeforeEach
    public void initTest() {
        transfertMateriel = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransfertMateriel() throws Exception {
        int databaseSizeBeforeCreate = transfertMaterielRepository.findAll().size();

        // Create the TransfertMateriel
        restTransfertMaterielMockMvc.perform(post("/api/transfert-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transfertMateriel)))
            .andExpect(status().isCreated());

        // Validate the TransfertMateriel in the database
        List<TransfertMateriel> transfertMaterielList = transfertMaterielRepository.findAll();
        assertThat(transfertMaterielList).hasSize(databaseSizeBeforeCreate + 1);
        TransfertMateriel testTransfertMateriel = transfertMaterielList.get(transfertMaterielList.size() - 1);
        assertThat(testTransfertMateriel.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testTransfertMateriel.getDateTransfert()).isEqualTo(DEFAULT_DATE_TRANSFERT);
        assertThat(testTransfertMateriel.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testTransfertMateriel.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testTransfertMateriel.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createTransfertMaterielWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transfertMaterielRepository.findAll().size();

        // Create the TransfertMateriel with an existing ID
        transfertMateriel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransfertMaterielMockMvc.perform(post("/api/transfert-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transfertMateriel)))
            .andExpect(status().isBadRequest());

        // Validate the TransfertMateriel in the database
        List<TransfertMateriel> transfertMaterielList = transfertMaterielRepository.findAll();
        assertThat(transfertMaterielList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkReferenceIsRequired() throws Exception {
        int databaseSizeBeforeTest = transfertMaterielRepository.findAll().size();
        // set the field null
        transfertMateriel.setReference(null);

        // Create the TransfertMateriel, which fails.

        restTransfertMaterielMockMvc.perform(post("/api/transfert-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transfertMateriel)))
            .andExpect(status().isBadRequest());

        List<TransfertMateriel> transfertMaterielList = transfertMaterielRepository.findAll();
        assertThat(transfertMaterielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateTransfertIsRequired() throws Exception {
        int databaseSizeBeforeTest = transfertMaterielRepository.findAll().size();
        // set the field null
        transfertMateriel.setDateTransfert(null);

        // Create the TransfertMateriel, which fails.

        restTransfertMaterielMockMvc.perform(post("/api/transfert-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transfertMateriel)))
            .andExpect(status().isBadRequest());

        List<TransfertMateriel> transfertMaterielList = transfertMaterielRepository.findAll();
        assertThat(transfertMaterielList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTransfertMateriels() throws Exception {
        // Initialize the database
        transfertMaterielRepository.saveAndFlush(transfertMateriel);

        // Get all the transfertMaterielList
        restTransfertMaterielMockMvc.perform(get("/api/transfert-materiels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transfertMateriel.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].dateTransfert").value(hasItem(DEFAULT_DATE_TRANSFERT.toString())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getTransfertMateriel() throws Exception {
        // Initialize the database
        transfertMaterielRepository.saveAndFlush(transfertMateriel);

        // Get the transfertMateriel
        restTransfertMaterielMockMvc.perform(get("/api/transfert-materiels/{id}", transfertMateriel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transfertMateriel.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE))
            .andExpect(jsonPath("$.dateTransfert").value(DEFAULT_DATE_TRANSFERT.toString()))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransfertMateriel() throws Exception {
        // Get the transfertMateriel
        restTransfertMaterielMockMvc.perform(get("/api/transfert-materiels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransfertMateriel() throws Exception {
        // Initialize the database
        transfertMaterielRepository.saveAndFlush(transfertMateriel);

        int databaseSizeBeforeUpdate = transfertMaterielRepository.findAll().size();

        // Update the transfertMateriel
        TransfertMateriel updatedTransfertMateriel = transfertMaterielRepository.findById(transfertMateriel.getId()).get();
        // Disconnect from session so that the updates on updatedTransfertMateriel are not directly saved in db
        em.detach(updatedTransfertMateriel);
        updatedTransfertMateriel
            .reference(UPDATED_REFERENCE)
            .dateTransfert(UPDATED_DATE_TRANSFERT)
            .commentaire(UPDATED_COMMENTAIRE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restTransfertMaterielMockMvc.perform(put("/api/transfert-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransfertMateriel)))
            .andExpect(status().isOk());

        // Validate the TransfertMateriel in the database
        List<TransfertMateriel> transfertMaterielList = transfertMaterielRepository.findAll();
        assertThat(transfertMaterielList).hasSize(databaseSizeBeforeUpdate);
        TransfertMateriel testTransfertMateriel = transfertMaterielList.get(transfertMaterielList.size() - 1);
        assertThat(testTransfertMateriel.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testTransfertMateriel.getDateTransfert()).isEqualTo(UPDATED_DATE_TRANSFERT);
        assertThat(testTransfertMateriel.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testTransfertMateriel.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testTransfertMateriel.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingTransfertMateriel() throws Exception {
        int databaseSizeBeforeUpdate = transfertMaterielRepository.findAll().size();

        // Create the TransfertMateriel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransfertMaterielMockMvc.perform(put("/api/transfert-materiels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(transfertMateriel)))
            .andExpect(status().isBadRequest());

        // Validate the TransfertMateriel in the database
        List<TransfertMateriel> transfertMaterielList = transfertMaterielRepository.findAll();
        assertThat(transfertMaterielList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTransfertMateriel() throws Exception {
        // Initialize the database
        transfertMaterielRepository.saveAndFlush(transfertMateriel);

        int databaseSizeBeforeDelete = transfertMaterielRepository.findAll().size();

        // Delete the transfertMateriel
        restTransfertMaterielMockMvc.perform(delete("/api/transfert-materiels/{id}", transfertMateriel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TransfertMateriel> transfertMaterielList = transfertMaterielRepository.findAll();
        assertThat(transfertMaterielList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
