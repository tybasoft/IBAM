package com.tybasoft.ibam.service;


import com.tybasoft.ibam.domain.Image;
import com.tybasoft.ibam.domain.Pointage;
import com.tybasoft.ibam.repository.PointageRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class PointageService {

	
	private final PointageRepository  pointageRepository;

	public PointageService(PointageRepository pointageRepository) {
			super();
			this.pointageRepository = pointageRepository;
	}
	 
	 						/**********************************************/
	public Pointage[] createPointage(Pointage[]   tab){
           
		 for(Pointage  pt:tab)
     	    pointageRepository.save(pt);

       return tab;
    }
}
