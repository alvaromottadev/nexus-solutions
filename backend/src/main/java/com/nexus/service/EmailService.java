package com.nexus.service;

import com.nexus.dto.Email.EmailRequest;
import com.nexus.dto.Inventory.InventoryRestockResponse;
import com.nexus.exception.EmailSendException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    private final TemplateEngine templateEngine;

    @Value("${mail.from}")
    private String fromEmail;

    @Value("${nexus.frontend.url}")
    private String frontUrl;

    public EmailService(
            JavaMailSender mailSender,
            TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendRestockEmail(EmailRequest emailRequest, List<InventoryRestockResponse> products){
        String htmlContent = getHtmlContent(products);
        sendEmail(emailRequest, htmlContent);
    }

    @Async
    public void sendResetPasswordEmail(EmailRequest emailRequest, String resetCode){
        String htmlContent = getHtmlContent(resetCode);
        sendEmail(emailRequest, htmlContent);
    }

    public void sendEmail(EmailRequest emailRequest, String htmlContent){
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo(emailRequest.to());
            helper.setSubject(emailRequest.subject());
            helper.setFrom(fromEmail);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e){
            throw new EmailSendException();
        }
    }

    private String getHtmlContent(List<InventoryRestockResponse> products){
        Context context = new Context();
        context.setVariable("products", products);
        return templateEngine.process("restock-email", context);
    }

    private String getHtmlContent(String resetCode) {
        Context context = new Context();
        context.setVariable("resetCode", resetCode);
        context.setVariable("frontUrl", frontUrl);
        return templateEngine.process("reset-password-email", context);
    }

}
