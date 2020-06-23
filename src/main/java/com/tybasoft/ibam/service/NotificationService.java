package com.tybasoft.ibam.service;

import com.tybasoft.ibam.domain.*;
import com.tybasoft.ibam.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final LocationRepository locationRepository;
    private final AssuranceRepository assuranceRepository;
    private final VisiteTechniqueRepository visiteTechniqueRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, LocationRepository locationRepository, AssuranceRepository assuranceRepository, VisiteTechniqueRepository visiteTechniqueRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.locationRepository = locationRepository;
        this.assuranceRepository = assuranceRepository;
        this.visiteTechniqueRepository = visiteTechniqueRepository;
        this.userRepository = userRepository;
    }


    @Scheduled(cron = "0 30 0 * * ?")
    public void AppNotifications() {
        int cmpt;
        long daysBetween;

        System.out.println("debut d'execution de Notifications de l'application");

        List<Location> locations= locationRepository.findAll();
        List<Assurance> assurances= assuranceRepository.findAll();
        List<VisiteTechnique> visiteTechniques= visiteTechniqueRepository.findAll();
        List<Notification> notifications= notificationRepository.findAll();

        // Notifications des Locations
        for (Location location : locations) {
            cmpt=0;
            for (Notification notif : notifications) {
                if (notif.getSource().equals(location.getId().toString())) {
                    cmpt += 1;
                    break;
                }
            }

            if (cmpt != 0) {
                System.out.println("notification existe déja pour Location : "+ location.getReference());
            } else {
                daysBetween= ChronoUnit.DAYS.between(LocalDate.now(), location.getDateFin());
                if ( daysBetween >0 && daysBetween < 7) {
                    Notification notification = new Notification();
                    User user = userRepository.findOneByLogin("admin").get();

                    notification.setLibelle("Location : "+ location.getReference());
                    notification.setDescription("la date de fin de la location '"+location.getReference()+"' est prévu dans moins de 7 jours");
                    notification.setSource(location.getId().toString());
                    notification.setVisualise(false);
                    notification.setDate(LocalDate.now());
                    notification.setUser(user);

                    notificationRepository.save(notification);
                    System.out.println("notification ajouté pour Location : "+ location.getReference());
                }
            }
        }

        // Notifications des Assurances
        for (Assurance assurance : assurances) {
            cmpt = 0;
            for (Notification notif : notifications) {
                if (notif.getSource().equals(assurance.getId().toString())) {
                    cmpt += 1;
                    break;
                }
            }

            if (cmpt != 0) {
                System.out.println("notification existe déja pour Assurance: " + assurance.getId());
            } else {
                daysBetween= ChronoUnit.DAYS.between(LocalDate.now(), assurance.getDateFin());
                if ( daysBetween >0 && daysBetween < 7) {
                    Notification notification = new Notification();
                    User user = userRepository.findOneByLogin("admin").get();

                    notification.setLibelle("Assurance");
                    notification.setDescription("la date de fin de l'assurance du matériel '" +
                        assurance.getMateriel().getLibelle()+ "' est prévu dans moins de 7 jours");
                    notification.setSource(assurance.getId().toString());
                    notification.setVisualise(false);
                    notification.setDate(LocalDate.now());
                    notification.setUser(user);

                    notificationRepository.save(notification);
                    System.out.println("notification ajouté pour Assurance: "+ assurance.getId());
                }
            }
        }

        // Notifications des Visites techniques
        for (VisiteTechnique visiteTechnique : visiteTechniques) {
            cmpt = 0;
            for (Notification notif : notifications) {
                if (notif.getSource().equals(visiteTechnique.getId().toString())) {
                    cmpt += 1;
                    break;
                }
            }

            if (cmpt != 0) {
                System.out.println("notification existe déja pour Visite Technique: " + visiteTechnique.getReference());
            } else {
                daysBetween= ChronoUnit.DAYS.between(LocalDate.now(), visiteTechnique.getDateVisite());
                if ( daysBetween >0 && daysBetween < 7) {
                    Notification notification = new Notification();
                    User user = userRepository.findOneByLogin("admin").get();

                    notification.setLibelle("Visite Technique");
                    notification.setDescription("la date de la visite technique du matériel '" +
                        visiteTechnique.getMateriel().getLibelle()+ "' est prévu dans moins de 7 jours");
                    notification.setSource(visiteTechnique.getId().toString());
                    notification.setVisualise(false);
                    notification.setDate(LocalDate.now());
                    notification.setUser(user);

                    notificationRepository.save(notification);
                    System.out.println("notification ajouté pour Visite Technique: "+ visiteTechnique.getId());
                }
            }
        }

        System.out.println("fin d'execution de Notifications de l'application");
    }
}
