package com.nexus.exception;

import com.nexus.dto.ErrorResponse;
import com.nexus.utils.MessageUtils;
import jakarta.validation.UnexpectedTypeException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionGlobalHandler {

    private final MessageUtils messageUtils;

    public ExceptionGlobalHandler(MessageUtils messageUtils) {
        this.messageUtils = messageUtils;
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        return ResponseEntity
                .status(409)
                .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.not.found")));
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEmployeeNotFoundException(EmployeeNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.employee.not.found")));
    }

    @ExceptionHandler(InventoryNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleInventoryNotFoundException(InventoryNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.inventory.not.found")));
    }

    @ExceptionHandler(LocationNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleLocationNotFoundException(LocationNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.location.not.found")));
    }

    @ExceptionHandler(MovementNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMovementNotFoundException(MovementNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.movement.not.found")));
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProductNotFoundException(ProductNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.product.not.found")));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.user.not.found")));
    }

    @ExceptionHandler(CompanyNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleCompanyNotFoundException(CompanyNotFoundException e) {
        return ResponseEntity
                .status(404)
                .body(new ErrorResponse(messageUtils.getMessage("error.company.not.found")));
    }

    @ExceptionHandler(DuplicateException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateException(DuplicateException e) {
        return ResponseEntity
                .status(409)
                .body(new ErrorResponse(messageUtils.getMessage("error.duplicate")));
    }

    @ExceptionHandler(EmailDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleEmailDuplicateException(EmailDuplicateException e) {
        return ResponseEntity
                .status(409)
                .body(new ErrorResponse(messageUtils.getMessage("error.email.duplicate")));
    }

    @ExceptionHandler(CnpjDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleCnpjDuplicateException(CnpjDuplicateException e) {
        return ResponseEntity
                .status(409)
                .body(new ErrorResponse(messageUtils.getMessage("error.cnpj.duplicate")));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        return ResponseEntity
                .status(403)
                .body(new ErrorResponse(messageUtils.getMessage("error.unauthorized")));
    }

    @ExceptionHandler(UnauthorizedRoleChangeException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedRoleChangeException(UnauthorizedRoleChangeException e) {
        return ResponseEntity
                .status(403)
                .body(new ErrorResponse(messageUtils.getMessage("error.unauthorized.role.change")));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException e) {
        return ResponseEntity
                .status(401)
                .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error ->
                errors.put("error", error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(InvalidDataAccessApiUsageException.class)
    public ResponseEntity<ErrorResponse> handleInvalidDataAccessApiUsageException(InvalidDataAccessApiUsageException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    public ResponseEntity<ErrorResponse> handleUnexpectedTypeException(UnexpectedTypeException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientStockException(InsufficientStockException e) {
        return ResponseEntity
                .status(409)
                .body(new ErrorResponse(messageUtils.getMessage("error.insufficient.stock", e.getMessage())));
    }

    @ExceptionHandler(EmailSendException.class)
    public ResponseEntity<ErrorResponse> handleEmailSendException(EmailSendException e) {
        return ResponseEntity
                .status(500)
                .body(new ErrorResponse(messageUtils.getMessage("error.mail.send")));
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPasswordException(InvalidPasswordException e) {
        return ResponseEntity
                .status(400)
                .body(new ErrorResponse(messageUtils.getMessage("error.invalid.password")));
    }

    @ExceptionHandler(PasswordConfirmationMismatchException.class)
    public ResponseEntity<ErrorResponse> handlePasswordConfirmationMismatchException(PasswordConfirmationMismatchException e) {
        return ResponseEntity
                .status(409)
                .body(new ErrorResponse(messageUtils.getMessage("error.password.confirmation.mismatch")));
    }

    @ExceptionHandler(InventoryAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleInventoryAlreadyExistsException(InventoryAlreadyExistsException e) {
        return ResponseEntity
                .status(409)
                .body(new ErrorResponse(messageUtils.getMessage("error.inventory.already.exists")));
    }

    @ExceptionHandler(FormatInvalidException.class)
    public ResponseEntity<ErrorResponse> handleFormatInvalidException(FormatInvalidException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(messageUtils.getMessage("error.format.invalid", e.getMessage())));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse(messageUtils.getMessage("error.invalid.request.body")));
    }

}
