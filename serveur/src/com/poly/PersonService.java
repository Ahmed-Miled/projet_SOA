package com.poly;

import javax.persistence.*;
import java.util.List;

public class PersonService {

    private static final EntityManagerFactory emf =
            Persistence.createEntityManagerFactory("persistence");

    public Person addPerson(Person p) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(p);
        em.getTransaction().commit();
        em.close();
        return p;
    }

    public List<Person> getAll() {
        EntityManager em = emf.createEntityManager();
        List<Person> list =
                em.createQuery("SELECT p FROM Person p", Person.class)
                  .getResultList();
        em.close();
        return list;
    }

    public Person getById(int id) {
        EntityManager em = emf.createEntityManager();
        Person p = em.find(Person.class, id);
        em.close();
        return p;
    }

    public List<Person> getByName(String name) {
        EntityManager em = emf.createEntityManager();
        List<Person> list = em.createQuery(
                "SELECT p FROM Person p WHERE LOWER(p.name) LIKE LOWER(:name)",
                Person.class)
                .setParameter("name", "%" + name + "%")
                .getResultList();
        em.close();
        return list;
    }

    public Person update(Person p) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        Person updated = em.merge(p);
        em.getTransaction().commit();
        em.close();
        return updated;
    }

    public boolean delete(int id) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        Person p = em.find(Person.class, id);
        if (p == null) {
            em.getTransaction().commit();
            em.close();
            return false;
        }
        em.remove(p);
        em.getTransaction().commit();
        em.close();
        return true;
    }
}
