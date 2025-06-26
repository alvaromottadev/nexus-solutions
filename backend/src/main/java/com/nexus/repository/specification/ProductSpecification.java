package com.nexus.repository.specification;

import com.nexus.model.Company;
import com.nexus.model.Location;
import com.nexus.model.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {

    public static Specification<Product> filterBy(Location location, String code, String name, Company company){
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("company").get("id"), company.getId()));
            predicates.add(cb.isNull(root.get("deletedAt")));
            if (location != null){
                predicates.add(cb.equal(root.join("inventories").get("location").get("id"), location.getId()));
            }
            if (code != null && !code.isEmpty()){
                predicates.add(cb.equal(root.get("code"), code));
            }
            if (name != null && !name.isEmpty()){
                predicates.add(cb.like(root.get("name"), "%"+name+"%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
