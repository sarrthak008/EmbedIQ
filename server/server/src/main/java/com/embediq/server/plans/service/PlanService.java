package com.embediq.server.plans.service;


import com.embediq.server.plans.entity.Plan;
import com.embediq.server.plans.repo.PlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService {
    @Autowired
    private PlanRepo planRepo;

    private Plan addPlan(Plan plan){
        return  planRepo.save(plan);
    }
}
