package com.embediq.server.plans.repo;

import com.embediq.server.plans.entity.Plan;
import com.embediq.server.plans.enums.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanRepo extends JpaRepository<Plan,String> {

    Optional<Plan> findByPlanType(PlanType type);
}
