package com.nexus.infra.scheduling;

import com.nexus.model.PasswordResetCode;
import com.nexus.service.PasswordResetCodeService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ResetCodeCleanTask {

    private final PasswordResetCodeService passwordResetCodeService;

    public ResetCodeCleanTask(PasswordResetCodeService passwordResetCodeService) {
        this.passwordResetCodeService = passwordResetCodeService;
    }

    @Scheduled(cron = "0 0 4 * * *")
    public void resetCodeClean() {
        List<PasswordResetCode> expiredOrUsedCodes = passwordResetCodeService.findAllExpiredOrUsedCodes();
        if (!expiredOrUsedCodes.isEmpty()){
            passwordResetCodeService.deleteAll(expiredOrUsedCodes);
        }
    }

}
