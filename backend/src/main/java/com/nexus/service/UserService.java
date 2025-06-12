package com.nexus.service;

import com.nexus.exception.ResourceNotFoundException;
import com.nexus.model.User;
import com.nexus.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public User save(User user){
        return userRepository.save(user);
    }

}
