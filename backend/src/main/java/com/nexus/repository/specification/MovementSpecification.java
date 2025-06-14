package com.nexus.repository.specification;

import com.nexus.model.Company;
import com.nexus.model.Movement;
import com.nexus.model.enums.MovementType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class MovementSpecification {

    public static Specification<Movement> filterBy(MovementType type, LocalDateTime startDate, LocalDateTime endDate, Company company){
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("location").get("company").get("id"), company.getId()));
            if (type != null){
                predicates.add(cb.equal(root.get("type"), type));
            }
            if (startDate != null && endDate != null){
                predicates.add(cb.between(root.get("movementDate"), startDate, endDate));
            }
            query.orderBy(cb.desc(root.get("movementDate")));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
