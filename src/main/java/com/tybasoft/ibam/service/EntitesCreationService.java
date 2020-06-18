package com.tybasoft.ibam.service;

import com.tybasoft.ibam.IbamApp;
import com.tybasoft.ibam.domain.Assurance;
import com.tybasoft.ibam.domain.BonCommande;
import com.tybasoft.ibam.domain.BonReception;
import com.tybasoft.ibam.domain.Tva;
import com.tybasoft.ibam.repository.AssuranceRepository;
import com.tybasoft.ibam.repository.BonCommandeRepository;
import com.tybasoft.ibam.repository.BonReceptionRepository;
import com.tybasoft.ibam.repository.MarqueRepository;
import com.tybasoft.ibam.repository.TvaRepository;
import java.time.LocalDate;
import liquibase.pro.packaged.b;
import org.exolab.castor.types.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

public class EntitesCreationService {
    private static final Logger log = LoggerFactory.getLogger(IbamApp.class);

    @Autowired
    private TvaRepository tvarepo;

    @Autowired
    private AssuranceRepository assurancerepo;

    @Autowired
    private MarqueRepository marquerepo;

    @Autowired
    private BonCommandeRepository bCommandeRepo;

    @Autowired
    private BonReceptionRepository bReceptionRepo;

    public void createTva(String[] metadata) {
        Tva tva = new Tva();
        tva.setTaux(metadata[1]);
        tvarepo.save(tva);
    }

    public void createAssurance(String[] metadata) {
        try {
            Assurance assurance = new Assurance();
            assurance.setDateDebut(LocalDate.parse(metadata[1]));
            assurance.setDateFin(LocalDate.parse(metadata[2]));
            assurance.setAgence(metadata[3]);
            assurancerepo.save(assurance);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public void createBonCommande(String[] metadata) {
        try {
            BonCommande bCommande = new BonCommande();
            bCommande.setDatePrevLiv(LocalDate.parse(metadata[1]));
            bCommande.setRemarques(metadata[2]);
            bCommande.setDateCreation(LocalDate.parse(metadata[3]));
            bCommande.setValide(Boolean.parseBoolean(metadata[4]));
            bCommandeRepo.save(bCommande);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void createBonReception(String[] metadata) {
        try {
            BonReception bReception = new BonReception();
            bReception.setLivreur(metadata[1]);
            bReception.setRemarques(metadata[2]);
            bReception.setDateLivraison(LocalDate.parse(metadata[3]));
            bReceptionRepo.save(bReception);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
