package com.ecommerce.backendecommerce.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    //Injizierung von der Konstructor, um diesen JPA EntityManager zu injizieren
    @Autowired
    public DataRestConfig(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = { };



        exposeIds(config);
    }
    //Ids anzeigen
    private void exposeIds(RepositoryRestConfiguration config) {
        //Entitäts-IDs offen legen
        //eine Liste aller Entityklassen vom EntityManager abrufen
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //Ein Array der Entity-Typen erstellen
        List<Class> entityClasses = new ArrayList<>();

        //die Entity-Typen für die Entitäten ermitteln
        for(EntityType entityType : entities ){
            entityClasses.add(entityType.getJavaType());
        }

        //Ids in der Array von Entity/domain Typ anzeigen lassen
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }


}
