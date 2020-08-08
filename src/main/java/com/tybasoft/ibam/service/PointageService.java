package com.tybasoft.ibam.service;


import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import com.tybasoft.ibam.domain.FichePointage;
import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.repository.FichePointageRepository;
import com.tybasoft.ibam.repository.PointageRepository;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;


@Service
public class PointageService {

	

	private final PointageRepository  pointageRepository;
	private final FichePointageRepository  fichePointageRepository;
	private static final String ENTITY_NAME = "fichePointage";
	 

	public PointageService(PointageRepository pointageRepository,FichePointageRepository  fichePointageRepository) {
			super();
			this.pointageRepository = pointageRepository;
			this.fichePointageRepository=fichePointageRepository;
	}
	 
	 				  /**********************************************/
	public Pointage[] createPointage(Pointage[]   tab){
		if(tab.length>0) {
		  for(Pointage  pt:tab)
     	    pointageRepository.save(pt);
		}
          return tab;
    }
	
	                   /*********************************************/
	    public FichePointage saveFichePointage(FichePointage  fichePointage, Logger log) {
	        if (fichePointage != null) {
	        	log.debug("REST request to save FichePointage : {}", fichePointage);
	            if (fichePointage.getId() != null) {
	                throw new BadRequestAlertException("A new fichePointage cannot already have an ID", ENTITY_NAME, "idexists");
	            }
	            return createFichePointageEntity(fichePointage);
	        }
	        return null;
	    }
	                    /**********************************************/
	    
	    public FichePointage createFichePointageEntity(FichePointage fichePointage){
	    	FichePointage newfiche= new FichePointage();
	        newfiche.setDateJour(fichePointage.getDateJour());
	        newfiche.setProjet(fichePointage.getProjet());
	        if (fichePointage.getId() != null) {
	        	newfiche.setId(fichePointage.getId());
	        }
	        return fichePointageRepository.save(newfiche);
	    }
	    
                      /***********************************************/
	    public void deleteFicheANDALLPointageEntity(FichePointage   fichePointage, Logger log) {
	        if (fichePointage != null && fichePointage.getId()!=null ) {
	        	FichePointage   newfiche=fichePointageRepository.findById(fichePointage.getId()).get();
	            List<Pointage>  ListPointage=pointageRepository.findAll();
	            if(newfiche!=null) {
	            for(Pointage   element:ListPointage) {
	            	if(element.getFichePointage().getId()==newfiche.getId()) {
	            		pointageRepository.deleteById(element.getId());
	            		log.debug("REST request to delete Pointage : {}",element.getId());
	            	}
	            }
	        	log.debug("REST request to delete FichePointage : {}", newfiche.getId());
	            fichePointageRepository.deleteById(newfiche.getId());
	        }
	      }
	    }
	    
	                /*********************************************/
	    public  List<Pointage>   ViewPointagesByFicheId(FichePointage   fichePointage){
	    	
	    	List<Pointage>  ListPointage=pointageRepository.findAll();
	    	List<Pointage>   currentList=new ArrayList<Pointage>();
	    	    if(fichePointage!=null) {
	    	    FichePointage fiche=fichePointageRepository.findById(fichePointage.getId()).get();
	    	    if(fiche!=null)
	    		for(Pointage  element:ListPointage) {
	    			if(element.getFichePointage().getId()==fiche.getId()) {
	    				currentList.add(element);
	    		  }
	    		}
	    	  }
			     return currentList;
	    }
	    
}
