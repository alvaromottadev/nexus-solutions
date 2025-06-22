package com.nexus.repository.specification;

import com.nexus.model.Company;
import com.nexus.model.Location;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class LocationSpecification {

    public static Specification<Location> filterBy(Company company, String name){
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("company"), company));
            if (name != null && !name.isEmpty()){
                predicates.add(cb.like(root.get("name"), "%" + name + "%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
