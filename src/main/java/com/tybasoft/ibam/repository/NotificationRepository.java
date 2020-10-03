package com.tybasoft.ibam.repository;

import com.tybasoft.ibam.domain.Notification;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("select notification from Notification notification where notification.user.login = ?#{principal.username}")
    List<Notification> findByUserIsCurrentUser();
    List<Notification> findByLibelleIsContainingOrDescriptionIsContainingOrSourceIsContaining(String lib , String descp ,String source );
}
