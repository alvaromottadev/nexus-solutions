package com.nexus.service;

import com.nexus.dto.User.UserRequest;
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
        String encodedPassword = passwordEncoder.encode(userRequest.password());
        User user = new User(userRequest, encodedPassword);
        return save(user);
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow((UserNotFoundException::new));
    }

    public User save(User user){
        return userRepository.save(user);
    }

}
