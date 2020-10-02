package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Horaire;
import com.tybasoft.ibam.repository.HoraireRepository;

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
 * Integration tests for the {@link HoraireResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class HoraireResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_NBR_HEUR_PAR_JR = "AAAAAAAAAA";
    private static final String UPDATED_NBR_HEUR_PAR_JR = "BBBBBBBBBB";

    private static final String DEFAULT_NBR_JOUR_PAR_SEM = "AAAAAAAAAA";
    private static final String UPDATED_NBR_JOUR_PAR_SEM = "BBBBBBBBBB";

    private static final String DEFAULT_HEURE_DEBUT_JR = "AAAAAAAAAA";
    private static final String UPDATED_HEURE_DEBUT_JR = "BBBBBBBBBB";

    private static final String DEFAULT_HEURE_FIN_JR = "AAAAAAAAAA";
    private static final String UPDATED_HEURE_FIN_JR = "BBBBBBBBBB";

    private static final String DEFAULT_DUREE_PAUSE = "AAAAAAAAAA";
    private static final String UPDATED_DUREE_PAUSE = "BBBBBBBBBB";

    private static final String DEFAULT_USER_MODIF = "AAAAAAAAAA";
    private static final String UPDATED_USER_MODIF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_MODIF = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_MODIF = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private HoraireRepository horaireRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHoraireMockMvc;

    private Horaire horaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Horaire createEntity(EntityManager em) {
        Horaire horaire = new Horaire()
            .libelle(DEFAULT_LIBELLE)
            .nbrHeurParJr(DEFAULT_NBR_HEUR_PAR_JR)
            .nbrJourParSem(DEFAULT_NBR_JOUR_PAR_SEM)
            .heureDebutJr(DEFAULT_HEURE_DEBUT_JR)
            .heureFinJr(DEFAULT_HEURE_FIN_JR)
            .dureePause(DEFAULT_DUREE_PAUSE)
            .userModif(DEFAULT_USER_MODIF)
            .dateModif(DEFAULT_DATE_MODIF);
        return horaire;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Horaire createUpdatedEntity(EntityManager em) {
        Horaire horaire = new Horaire()
            .libelle(UPDATED_LIBELLE)
            .nbrHeurParJr(UPDATED_NBR_HEUR_PAR_JR)
            .nbrJourParSem(UPDATED_NBR_JOUR_PAR_SEM)
            .heureDebutJr(UPDATED_HEURE_DEBUT_JR)
            .heureFinJr(UPDATED_HEURE_FIN_JR)
            .dureePause(UPDATED_DUREE_PAUSE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);
        return horaire;
    }

    @BeforeEach
    public void initTest() {
        horaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createHoraire() throws Exception {
        int databaseSizeBeforeCreate = horaireRepository.findAll().size();

        // Create the Horaire
        restHoraireMockMvc.perform(post("/api/horaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isCreated());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeCreate + 1);
        Horaire testHoraire = horaireList.get(horaireList.size() - 1);
        assertThat(testHoraire.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testHoraire.getNbrHeurParJr()).isEqualTo(DEFAULT_NBR_HEUR_PAR_JR);
        assertThat(testHoraire.getNbrJourParSem()).isEqualTo(DEFAULT_NBR_JOUR_PAR_SEM);
        assertThat(testHoraire.getHeureDebutJr()).isEqualTo(DEFAULT_HEURE_DEBUT_JR);
        assertThat(testHoraire.getHeureFinJr()).isEqualTo(DEFAULT_HEURE_FIN_JR);
        assertThat(testHoraire.getDureePause()).isEqualTo(DEFAULT_DUREE_PAUSE);
        assertThat(testHoraire.getUserModif()).isEqualTo(DEFAULT_USER_MODIF);
        assertThat(testHoraire.getDateModif()).isEqualTo(DEFAULT_DATE_MODIF);
    }

    @Test
    @Transactional
    public void createHoraireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = horaireRepository.findAll().size();

        // Create the Horaire with an existing ID
        horaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHoraireMockMvc.perform(post("/api/horaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isBadRequest());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = horaireRepository.findAll().size();
        // set the field null
        horaire.setLibelle(null);

        // Create the Horaire, which fails.

        restHoraireMockMvc.perform(post("/api/horaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isBadRequest());

        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbrHeurParJrIsRequired() throws Exception {
        int databaseSizeBeforeTest = horaireRepository.findAll().size();
        // set the field null
        horaire.setNbrHeurParJr(null);

        // Create the Horaire, which fails.

        restHoraireMockMvc.perform(post("/api/horaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isBadRequest());

        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNbrJourParSemIsRequired() throws Exception {
        int databaseSizeBeforeTest = horaireRepository.findAll().size();
        // set the field null
        horaire.setNbrJourParSem(null);

        // Create the Horaire, which fails.

        restHoraireMockMvc.perform(post("/api/horaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isBadRequest());

        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHoraires() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        // Get all the horaireList
        restHoraireMockMvc.perform(get("/api/horaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].nbrHeurParJr").value(hasItem(DEFAULT_NBR_HEUR_PAR_JR)))
            .andExpect(jsonPath("$.[*].nbrJourParSem").value(hasItem(DEFAULT_NBR_JOUR_PAR_SEM)))
            .andExpect(jsonPath("$.[*].heureDebutJr").value(hasItem(DEFAULT_HEURE_DEBUT_JR)))
            .andExpect(jsonPath("$.[*].heureFinJr").value(hasItem(DEFAULT_HEURE_FIN_JR)))
            .andExpect(jsonPath("$.[*].dureePause").value(hasItem(DEFAULT_DUREE_PAUSE)))
            .andExpect(jsonPath("$.[*].userModif").value(hasItem(DEFAULT_USER_MODIF)))
            .andExpect(jsonPath("$.[*].dateModif").value(hasItem(DEFAULT_DATE_MODIF.toString())));
    }
    
    @Test
    @Transactional
    public void getHoraire() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        // Get the horaire
        restHoraireMockMvc.perform(get("/api/horaires/{id}", horaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(horaire.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.nbrHeurParJr").value(DEFAULT_NBR_HEUR_PAR_JR))
            .andExpect(jsonPath("$.nbrJourParSem").value(DEFAULT_NBR_JOUR_PAR_SEM))
            .andExpect(jsonPath("$.heureDebutJr").value(DEFAULT_HEURE_DEBUT_JR))
            .andExpect(jsonPath("$.heureFinJr").value(DEFAULT_HEURE_FIN_JR))
            .andExpect(jsonPath("$.dureePause").value(DEFAULT_DUREE_PAUSE))
            .andExpect(jsonPath("$.userModif").value(DEFAULT_USER_MODIF))
            .andExpect(jsonPath("$.dateModif").value(DEFAULT_DATE_MODIF.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHoraire() throws Exception {
        // Get the horaire
        restHoraireMockMvc.perform(get("/api/horaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHoraire() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        int databaseSizeBeforeUpdate = horaireRepository.findAll().size();

        // Update the horaire
        Horaire updatedHoraire = horaireRepository.findById(horaire.getId()).get();
        // Disconnect from session so that the updates on updatedHoraire are not directly saved in db
        em.detach(updatedHoraire);
        updatedHoraire
            .libelle(UPDATED_LIBELLE)
            .nbrHeurParJr(UPDATED_NBR_HEUR_PAR_JR)
            .nbrJourParSem(UPDATED_NBR_JOUR_PAR_SEM)
            .heureDebutJr(UPDATED_HEURE_DEBUT_JR)
            .heureFinJr(UPDATED_HEURE_FIN_JR)
            .dureePause(UPDATED_DUREE_PAUSE)
            .userModif(UPDATED_USER_MODIF)
            .dateModif(UPDATED_DATE_MODIF);

        restHoraireMockMvc.perform(put("/api/horaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHoraire)))
            .andExpect(status().isOk());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeUpdate);
        Horaire testHoraire = horaireList.get(horaireList.size() - 1);
        assertThat(testHoraire.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testHoraire.getNbrHeurParJr()).isEqualTo(UPDATED_NBR_HEUR_PAR_JR);
        assertThat(testHoraire.getNbrJourParSem()).isEqualTo(UPDATED_NBR_JOUR_PAR_SEM);
        assertThat(testHoraire.getHeureDebutJr()).isEqualTo(UPDATED_HEURE_DEBUT_JR);
        assertThat(testHoraire.getHeureFinJr()).isEqualTo(UPDATED_HEURE_FIN_JR);
        assertThat(testHoraire.getDureePause()).isEqualTo(UPDATED_DUREE_PAUSE);
        assertThat(testHoraire.getUserModif()).isEqualTo(UPDATED_USER_MODIF);
        assertThat(testHoraire.getDateModif()).isEqualTo(UPDATED_DATE_MODIF);
    }

    @Test
    @Transactional
    public void updateNonExistingHoraire() throws Exception {
        int databaseSizeBeforeUpdate = horaireRepository.findAll().size();

        // Create the Horaire

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHoraireMockMvc.perform(put("/api/horaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(horaire)))
            .andExpect(status().isBadRequest());

        // Validate the Horaire in the database
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHoraire() throws Exception {
        // Initialize the database
        horaireRepository.saveAndFlush(horaire);

        int databaseSizeBeforeDelete = horaireRepository.findAll().size();

        // Delete the horaire
        restHoraireMockMvc.perform(delete("/api/horaires/{id}", horaire.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Horaire> horaireList = horaireRepository.findAll();
        assertThat(horaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
