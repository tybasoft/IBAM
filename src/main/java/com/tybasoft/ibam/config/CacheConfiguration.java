package com.tybasoft.ibam.config;

import io.github.jhipster.config.JHipsterProperties;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.tybasoft.ibam.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.tybasoft.ibam.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.tybasoft.ibam.domain.User.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Authority.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.User.class.getName() + ".authorities");
            createCache(cm, com.tybasoft.ibam.domain.Materiau.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Materiau.class.getName() + ".ligneBonRecs");
            createCache(cm, com.tybasoft.ibam.domain.Materiau.class.getName() + ".ligneBonComs");
            createCache(cm, com.tybasoft.ibam.domain.Tva.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Tva.class.getName() + ".materiaus");
            createCache(cm, com.tybasoft.ibam.domain.Marque.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Marque.class.getName() + ".materiaus");
            createCache(cm, com.tybasoft.ibam.domain.Marque.class.getName() + ".materiels");
            createCache(cm, com.tybasoft.ibam.domain.Unite.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Unite.class.getName() + ".materiaus");
            createCache(cm, com.tybasoft.ibam.domain.Famille.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Famille.class.getName() + ".materiaus");
            createCache(cm, com.tybasoft.ibam.domain.Famille.class.getName() + ".materiels");
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName() + ".materiaus");
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName() + ".entreprises");
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName() + ".materiels");
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName() + ".consommations");
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName() + ".maintenances");
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName() + ".employees");
            createCache(cm, com.tybasoft.ibam.domain.Image.class.getName() + ".bonReceptions");
            createCache(cm, com.tybasoft.ibam.domain.Entreprise.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Entreprise.class.getName() + ".projets");
            createCache(cm, com.tybasoft.ibam.domain.LigneBonCommande.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.LigneBonReception.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.BonCommande.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.BonCommande.class.getName() + ".ligneBonComs");
            createCache(cm, com.tybasoft.ibam.domain.BonReception.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.BonReception.class.getName() + ".ligneBonRecs");
            createCache(cm, com.tybasoft.ibam.domain.Fournisseur.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Fournisseur.class.getName() + ".materiels");
            createCache(cm, com.tybasoft.ibam.domain.Fournisseur.class.getName() + ".consommations");
            createCache(cm, com.tybasoft.ibam.domain.Fournisseur.class.getName() + ".bonCommandes");
            createCache(cm, com.tybasoft.ibam.domain.Fournisseur.class.getName() + ".bonReceptions");
            createCache(cm, com.tybasoft.ibam.domain.Depot.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Depot.class.getName() + ".bonCommandes");
            createCache(cm, com.tybasoft.ibam.domain.Depot.class.getName() + ".bonReceptions");
            createCache(cm, com.tybasoft.ibam.domain.Depot.class.getName() + ".projets");
            createCache(cm, com.tybasoft.ibam.domain.Projet.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Projet.class.getName() + ".transferts");
            createCache(cm, com.tybasoft.ibam.domain.Projet.class.getName() + ".equipes");
            createCache(cm, com.tybasoft.ibam.domain.Projet.class.getName() + ".employes");
            createCache(cm, com.tybasoft.ibam.domain.Equipe.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Equipe.class.getName() + ".employes");
            createCache(cm, com.tybasoft.ibam.domain.Fonction.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Fonction.class.getName() + ".employes");
            createCache(cm, com.tybasoft.ibam.domain.Pointage.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Paie.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Horaire.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Horaire.class.getName() + ".projets");
            createCache(cm, com.tybasoft.ibam.domain.Employe.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Employe.class.getName() + ".materiels");
            createCache(cm, com.tybasoft.ibam.domain.Employe.class.getName() + ".employes");
            createCache(cm, com.tybasoft.ibam.domain.Employe.class.getName() + ".pointages");
            createCache(cm, com.tybasoft.ibam.domain.Employe.class.getName() + ".paies");
            createCache(cm, com.tybasoft.ibam.domain.Materiel.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Materiel.class.getName() + ".locations");
            createCache(cm, com.tybasoft.ibam.domain.Materiel.class.getName() + ".assurances");
            createCache(cm, com.tybasoft.ibam.domain.Materiel.class.getName() + ".transferts");
            createCache(cm, com.tybasoft.ibam.domain.Materiel.class.getName() + ".consommations");
            createCache(cm, com.tybasoft.ibam.domain.Materiel.class.getName() + ".maintenances");
            createCache(cm, com.tybasoft.ibam.domain.Materiel.class.getName() + ".visitetechniques");
            createCache(cm, com.tybasoft.ibam.domain.Assurance.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.TypeMateriel.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.TypeMateriel.class.getName() + ".materiels");
            createCache(cm, com.tybasoft.ibam.domain.Document.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Document.class.getName() + ".materiels");
            createCache(cm, com.tybasoft.ibam.domain.Location.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.TransfertMateriel.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Consommation.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Maintenance.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.CentreMaintenance.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.CentreMaintenance.class.getName() + ".maintenances");
            createCache(cm, com.tybasoft.ibam.domain.VisiteTechnique.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.Notification.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.FichePointage.class.getName());
            createCache(cm, com.tybasoft.ibam.domain.FichePointage.class.getName() + ".pointages");
            createCache(cm, com.tybasoft.ibam.domain.AffectationMateriels.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }
}
