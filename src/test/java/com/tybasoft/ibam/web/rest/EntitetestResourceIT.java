package com.tybasoft.ibam.web.rest;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Entitetest;
import com.tybasoft.ibam.repository.EntitetestRepository;

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
 * Integration tests for the {@link EntitetestResource} REST controller.
 */
@SpringBootTest(classes = IbamApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EntitetestResourceIT {

    @Autowired
    private EntitetestRepository entitetestRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntitetestMockMvc;

    private Entitetest entitetest;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entitetest createEntity(EntityManager em) {
        Entitetest entitetest = new Entitetest();
        return entitetest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entitetest createUpdatedEntity(EntityManager em) {
        Entitetest entitetest = new Entitetest();
        return entitetest;
    }

    @BeforeEach
    public void initTest() {
        entitetest = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllEntitetests() throws Exception {
        // Initialize the database
        entitetestRepository.saveAndFlush(entitetest);

        // Get all the entitetestList
        restEntitetestMockMvc.perform(get("/api/entitetests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entitetest.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getEntitetest() throws Exception {
        // Initialize the database
        entitetestRepository.saveAndFlush(entitetest);

        // Get the entitetest
        restEntitetestMockMvc.perform(get("/api/entitetests/{id}", entitetest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entitetest.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingEntitetest() throws Exception {
        // Get the entitetest
        restEntitetestMockMvc.perform(get("/api/entitetests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }
}
