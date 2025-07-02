package com.nexus.infra.security;

import com.nexus.model.Company;
import com.nexus.model.Employee;
import com.nexus.model.User;
import com.nexus.model.enums.UserType;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    @Getter
    private final User user;

    @Getter
    private final Company company;

    @Getter
    private final Employee employee;

    public UserDetailsImpl(User user) {
        this.user = user;
        if (user.getType() == UserType.COMPANY){
            this.company = user.getCompany();
            this.employee = null;
        } else {
            this.company = user.getEmployee().getCompany();
            this.employee = user.getEmployee();
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (user.getType() == UserType.COMPANY){
            return List.of(new SimpleGrantedAuthority("ROLE_COMPANY"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_" + user.getEmployee().getRole()));
        }
    }

    public String getName() {
        if (user.getType() == UserType.COMPANY){
            return user.getCompany().getName();
        } else {
            return user.getEmployee().getName();
        }
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public UserType getType(){
        return user.getType();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
