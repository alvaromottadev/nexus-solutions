package com.nexus.service;

import com.nexus.dto.User.UserRequest;
import com.nexus.exception.EmailDuplicateException;
import com.nexus.exception.InvalidPasswordException;
import com.nexus.exception.UserNotFoundException;
import com.nexus.model.User;
import com.nexus.model.enums.UserType;
import com.nexus.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private UserRequest userRequestMock;
    private User userMock;
    private String encodedPassword;

    @BeforeEach
    void setUp() {
        userRequestMock = new UserRequest("john.doe@example.com", "password123", UserType.COMPANY);
        encodedPassword = "encoded-password";
        userMock = new User(userRequestMock, encodedPassword);
        userMock.setId(UUID.randomUUID().toString());
    }

    @DisplayName("Should create user successfully")
    @Test
    void createUserCase1() {
        when(userRepository.existsByEmail(userRequestMock.email())).thenReturn(false);
        when(passwordEncoder.encode(userRequestMock.password())).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(userMock);
        User actual = userService.createUser(userRequestMock);
        assertNotNull(actual);
        assertEquals(userRequestMock.email(), actual.getEmail());
        verify(userRepository).existsByEmail(userRequestMock.email());
        verify(passwordEncoder).encode(userRequestMock.password());
        verify(userRepository).save(any(User.class));
    }

    @DisplayName("Should throw EmailDuplicateException when email already exists")
    @Test
    void createUserCase2() {
        when(userRepository.existsByEmail(userRequestMock.email())).thenReturn(true);
        assertThrows(EmailDuplicateException.class, () -> userService.createUser(userRequestMock));
        verify(userRepository).existsByEmail(userRequestMock.email());
        verify(userRepository, never()).save(any(User.class));
    }

    @DisplayName("Should find user by email")
    @Test
    void findByEmailCase1() {
        when(userRepository.findByEmail(userMock.getEmail())).thenReturn(Optional.of(userMock));
        User actual = userService.findByEmail(userMock.getEmail());
        assertNotNull(actual);
        assertEquals(userMock, actual);
    }

    @DisplayName("Should throw UserNotFoundException when user not found by email")
    @Test
    void findByEmailCase2() {
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.findByEmail("notfound@example.com"));
    }

    @DisplayName("Should update password successfully")
    @Test
    void updatePasswordCase1() {
        String newPassword = "newPassword123";
        when(passwordEncoder.encode(newPassword)).thenReturn("encoded-new-password");
        userService.updatePassword(userMock, newPassword);
        assertEquals("encoded-new-password", userMock.getPassword());
        verify(passwordEncoder).encode(newPassword);
    }

    @DisplayName("Should update user with password successfully")
    @Test
    void updateUserWithPasswordCase1() {
        String newEmail = "new.email@example.com";
        String newPassword = "newPassword456";
        when(userRepository.existsByEmail(newEmail)).thenReturn(false);
        when(passwordEncoder.encode(newPassword)).thenReturn("encoded-new-password");
        when(userRepository.save(userMock)).thenReturn(userMock);
        userService.updateUserWithPassword(userMock, newEmail, newPassword);
        assertEquals(newEmail, userMock.getEmail());
        assertEquals("encoded-new-password", userMock.getPassword());
        verify(userRepository).existsByEmail(newEmail);
        verify(passwordEncoder).encode(newPassword);
        verify(userRepository).save(userMock);
    }

    @DisplayName("Should update user without password successfully")
    @Test
    void updateUserWithoutPasswordCase1() {
        String newEmail = "another.email@example.com";
        when(userRepository.existsByEmail(newEmail)).thenReturn(false);
        when(userRepository.save(userMock)).thenReturn(userMock);
        userService.updateUserWithoutPassword(userMock, newEmail);
        assertEquals(newEmail, userMock.getEmail());
        verify(userRepository).existsByEmail(newEmail);
        verify(userRepository).save(userMock);
    }

    @DisplayName("Should delete user by changing email")
    @Test
    void deleteUserCase1() {
        String originalEmail = userMock.getEmail();
        userService.deleteUser(userMock);
        assertTrue(userMock.getEmail().startsWith(originalEmail + "@deleted"));
    }

    @DisplayName("Should save user successfully")
    @Test
    void saveCase1() {
        when(userRepository.save(userMock)).thenReturn(userMock);
        User actual = userService.save(userMock);
        assertNotNull(actual);
        assertEquals(userMock, actual);
        verify(userRepository).save(userMock);
    }

    @DisplayName("Should throw EmailDuplicateException when existsByEmail is called and email exists")
    @Test
    void existsByEmailCase1() {
        when(userRepository.existsByEmail(userMock.getEmail())).thenReturn(true);
        assertThrows(EmailDuplicateException.class, () -> userService.existsByEmail(userMock.getEmail()));
    }

    @DisplayName("Should not throw when existsByEmail is called and email does not exist")
    @Test
    void existsByEmailCase2() {
        when(userRepository.existsByEmail(userMock.getEmail())).thenReturn(false);
        assertDoesNotThrow(() -> userService.existsByEmail(userMock.getEmail()));
    }

    @DisplayName("Should validate password successfully")
    @Test
    void validatePasswordCase1() {
        when(passwordEncoder.matches("password123", userMock.getPassword())).thenReturn(true);
        assertDoesNotThrow(() -> userService.validatePassword(userMock, "password123"));
        verify(passwordEncoder).matches("password123", userMock.getPassword());
    }

    @DisplayName("Should throw InvalidPasswordException when password does not match")
    @Test
    void validatePasswordCase2() {
        when(passwordEncoder.matches("wrongPassword", userMock.getPassword())).thenReturn(false);
        assertThrows(InvalidPasswordException.class, () -> userService.validatePassword(userMock, "wrongPassword"));
        verify(passwordEncoder).matches("wrongPassword", userMock.getPassword());
    }

    @DisplayName("Should validate email successfully when email is the same")
    @Test
    void validateEmailCase1() {
        assertDoesNotThrow(() -> userService.validateEmail(userMock, userMock.getEmail()));
    }

    @DisplayName("Should validate email successfully when email is different and does not exist")
    @Test
    void validateEmailCase2() {
        String newEmail = "unique.email@example.com";
        when(userRepository.existsByEmail(newEmail)).thenReturn(false);
        assertDoesNotThrow(() -> userService.validateEmail(userMock, newEmail));
        verify(userRepository).existsByEmail(newEmail);
    }

    @DisplayName("Should throw EmailDuplicateException when validating email and it already exists")
    @Test
    void validateEmailCase3() {
        String newEmail = "duplicate.email@example.com";
        when(userRepository.existsByEmail(newEmail)).thenReturn(true);
        assertThrows(EmailDuplicateException.class, () -> userService.validateEmail(userMock, newEmail));
        verify(userRepository).existsByEmail(newEmail);
    }
}
