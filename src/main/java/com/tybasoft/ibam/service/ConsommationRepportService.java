package com.tybasoft.ibam.service;

import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tybasoft.ibam.domain.Consommation;
import com.tybasoft.ibam.domain.Materiel;
import com.tybasoft.ibam.repository.MaterielRepository;

@Service
public class ConsommationRepportService {

	@Autowired
	private ReportService reportService;
	@Autowired
	private MaterielRepository materielRepository;

	public boolean getConsomationById(Long id) {

		Optional<Materiel> materiel = materielRepository.findById(id);
		// Creating a hash set of strings
		Set<Consommation> s = materiel.get().getConsommations();

		reportService.setName("Materiel" + id);
		return (reportService.exportConsommationReport(s, id));

	}
}
