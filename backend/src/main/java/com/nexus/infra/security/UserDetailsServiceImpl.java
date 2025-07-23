package com.nexus.infra.security;

import com.nexus.model.User;
import com.nexus.service.UserService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetailsImpl loadUserByUsername(String email) {
        User user = userService.findByEmail(email);
        return new UserDetailsImpl(user);
    }

}
