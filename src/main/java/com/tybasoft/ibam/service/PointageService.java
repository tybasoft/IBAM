package com.tybasoft.ibam.service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.tybasoft.ibam.domain.FichePointage;
import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.domain.Projet;
import com.tybasoft.ibam.repository.FichePointageRepository;
import com.tybasoft.ibam.repository.PointageRepository;
import com.tybasoft.ibam.web.rest.PointageResource;
import com.tybasoft.ibam.web.rest.errors.BadRequestAlertException;


@Service
public class PointageService {

	 private final Logger log = LoggerFactory.getLogger(PointageResource.class);


	private final PointageRepository  pointageRepository;
	private final FichePointageRepository  fichePointageRepository;
	private static final String ENTITY_NAME = "fichePointage";
	 

	public PointageService(PointageRepository pointageRepository,FichePointageRepository  fichePointageRepository) {
			super();
			this.pointageRepository = pointageRepository;
			this.fichePointageRepository=fichePointageRepository;
	}
	 
	/*******************************Enregistrement du pointage****************************/
	 				  /**********************************************/
	public Pointage[] createPointage(Pointage[]   tab){
		
		if(tab.length>0) {
		  for(Pointage  pt:tab) {
			  if (pt.getId() != null) {
	                throw new BadRequestAlertException("A new Pointage cannot already have an ID", ENTITY_NAME, "idexists");
	            }
			  pointageRepository.save(pt);
		  }  
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
	    
                       /**********************************************/
		
		public  int  ValidatePointage(LocalDate   dateJour,Long  projetId) {
		
				
				
				System.out.println("Je sui date jour"+dateJour);
				System.out.println("je suis projet"+projetId);
				int  cmpt=0;
				List<FichePointage>  list=fichePointageRepository.findAll();
				for(FichePointage element :list) {
				   if(element.getProjet()!=null) {
					if(element.getDateJour()!=null) {
					if(element.getDateJour()==dateJour && element.getProjet().getId()==projetId) {
					cmpt++;
					}
				   }
				  }
				 }
				
				return cmpt;
				
			
		}
		
		            /**************************************************/
		
		public   Pointage []  EnregistrementPointage(Pointage []  tab) {
			     Pointage [] result = null;
				 FichePointage  fiche=tab[0].getFichePointage();
				
	 	         FichePointage  resultFiche=saveFichePointage(fiche, log);
	 	        
	 	         for(int i=0;i<tab.length;i++) {
	 	        	tab[i].setFichePointage(resultFiche);
	 	        	
	 	         }
	 	         result = createPointage(tab);

	 	          return result;
			
			
		}
		/*********************************Supression du pointage********************************/
                             /***********************************************/
		  public void deleteFichePointageEntity(FichePointage   fichePointage, Logger log) {
		       
		        	FichePointage   newfiche=fichePointageRepository.findById(fichePointage.getId()).get();
		            List<Pointage>  ListPointage=pointageRepository.findAll();
		            try {
		            for(Pointage   element:ListPointage) {
		            	if(element.getFichePointage()!=null) {
		            	if(element.getFichePointage().getId()==newfiche.getId()) {
		            		
		            		     pointageRepository.deleteById(element.getId());
		            		     log.debug("REST request to delete Pointage : {}",element.getId());
		            	 	}
		            	
		                  }
		               }
		        	log.debug("REST request to delete FichePointage : {}", newfiche.getId());
		            fichePointageRepository.deleteById(newfiche.getId());
		        
		            }catch(Exception e) {
		            	System.out.println(e.getMessage());
		            }
		    }
	    
	                /*********************************************/
	    public  List<Pointage>   ViewPointagesByFicheId(FichePointage   fichePointage){
	    	
	    	List<Pointage>  ListPointage=pointageRepository.findAll();
	    	List<Pointage>   currentList=new ArrayList<Pointage>();
	    	try {
	    	    FichePointage fiche=fichePointageRepository.findById(fichePointage.getId()).get();
	    	    if(fiche!=null) {
	    		for(Pointage  element:ListPointage) {
	    			if(element.getFichePointage()!=null) {
	    			if(element.getFichePointage().getId()==fiche.getId()) {
	    				currentList.add(element);
	    		  }
	    		 }
	    		}
	    	   }
	    	    
	    	}catch(Exception e) {
	    		System.out.println(e.getCause()+""+e.getMessage());
	    	}
	        return currentList;
	    }
	    
}
