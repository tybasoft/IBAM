package com.tybasoft.ibam.service;

import com.tybasoft.ibam.domain.Location;
import com.tybasoft.ibam.domain.Notification;
import com.tybasoft.ibam.domain.User;
import com.tybasoft.ibam.repository.LocationRepository;
import com.tybasoft.ibam.repository.NotificationRepository;
import com.tybasoft.ibam.repository.UserRepository;
import com.tybasoft.ibam.security.SecurityUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Component
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, LocationRepository locationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
    }


    @Scheduled(initialDelay = 5000, fixedRate = 120000)
    public void run() {
        int cmpt=0;
        System.out.println("debut d'execution");

        Optional<Location> location= locationRepository.findById((long) 74601);
        List<Notification> notifications= notificationRepository.findAll();

        for (Notification notif : notifications){
            if (notif.getSource().equals("74601")){
                cmpt += 1;
                break;
            }
        }

        if (cmpt != 0){
            System.out.println("notification existe déja");
        }else {
            Location location1= location.get();
            if (ChronoUnit.DAYS.between(LocalDate.now(), location1.getDateFin()) < 7 ){
                Notification notification= new Notification();
                // String login= SecurityUtils.getCurrentUserLogin().get();
                User user= userRepository.findOneByLogin("admin").get();
                notification.setLibelle("notification de location");
                notification.setSource("74601");
                notification.setVisualise(false);
                notification.setDate(LocalDate.now());
                notification.setUser(user);

                notificationRepository.save(notification);
                System.out.println("notification ajouté");
            }
        }

        System.out.println("fin d'execution");
    }
}
