package com.nexus.service;

import com.nexus.exception.PasswordResetTokenNotFoundException;
import com.nexus.model.PasswordResetCode;
import com.nexus.model.User;
import com.nexus.repository.PasswordResetCodeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordResetCodeService {

    private final PasswordResetCodeRepository codeRepository;

    public PasswordResetCodeService(PasswordResetCodeRepository tokenRepository) {
        this.codeRepository = tokenRepository;
    }

    public void createToken(String resetCode, User user){
        PasswordResetCode token = new PasswordResetCode(resetCode, user);
        codeRepository.save(token);
    }

    public PasswordResetCode validateCode(String resetCode) {
        PasswordResetCode code = findByCode(resetCode);
        if (code.isExpired() || code.isUsed()) throw new PasswordResetTokenNotFoundException();
        return code;
    }

    public List<PasswordResetCode> findAllExpiredOrUsedCodes() {
        return codeRepository.findAllExpiredOrUsedCodes();
    }

    public void deleteAll(List<PasswordResetCode> codes){
        codeRepository.deleteAll(codes);
    }

    private PasswordResetCode findByCode(String resetCode){
        return codeRepository.findByResetCode(resetCode).orElseThrow(PasswordResetTokenNotFoundException::new);
    }


}
