package com.nexus.service;

import com.nexus.dto.User.UserRequest;
import com.nexus.exception.EmailDuplicateException;
import com.nexus.exception.InvalidPasswordException;
import com.nexus.exception.UserNotFoundException;
import com.nexus.model.User;
import com.nexus.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(UserRequest userRequest){
        existsByEmail(userRequest.email());
        String encodedPassword = passwordEncoder.encode(userRequest.password());
        User user = new User(userRequest, encodedPassword);
        return save(user);
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow((UserNotFoundException::new));
    }

    public void updatePassword(User user, String password){
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);
    }

    public void updateUser(User user, String email, String newPassword){
        validateEmail(user, email);
        user.setEmail(email);
        if (newPassword != null && !newPassword.isEmpty()) updatePassword(user, newPassword);
        save(user);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public void existsByEmail(String email){
        if (userRepository.existsByEmail(email)) {
            throw new EmailDuplicateException();
        }
    }

    public void validatePassword(User user, String password){
        if (!passwordEncoder.matches(password, user.getPassword())){
            throw new InvalidPasswordException();
        }
    }

    public void validateEmail(User user, String email) {
        if (!user.getEmail().equals(email)) {
            existsByEmail(email);
        }
    }
}
