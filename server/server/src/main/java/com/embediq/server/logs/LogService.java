package com.embediq.server.logs;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogService {

     @Autowired
    private LogsRepo logsRepo;

     @Transactional
     public void saveLog(String initiator, String operation, String details) {
         LogsEntity log = new LogsEntity();
         log.setInitiator(initiator);
         log.setOperation(operation);
         log.setDetails(details);
         logsRepo.save(log);
     }
}
