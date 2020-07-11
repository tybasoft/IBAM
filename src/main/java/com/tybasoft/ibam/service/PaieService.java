package com.tybasoft.ibam.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tybasoft.ibam.domain.Paie;
import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.repository.PaieRepository;

@Service
public class PaieService {

	private final PaieRepository   paieRepository;

	public PaieService(PaieRepository paieRepository) {
		super();
		this.paieRepository = paieRepository;
	}
	
	
	public float CalculeMontantEmploye(Paie paie,float nbHeureJournalier) {
		
		float salaire=(Float.parseFloat(paie.getNbrHeurSup())/(nbHeureJournalier+Float.parseFloat(paie.getNbrJourTravail())))
				       *Float.parseFloat(paie.getEmploye().getTarifJournalier());
		return salaire;
		
	}	
	
	public Paie[] createPaieList(Paie[]   tab){
        
        for(Paie  pt:tab)
        	paieRepository.save(pt);
         return tab;
 }
	

}
