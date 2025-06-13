package com.nexus.model;

import com.nexus.dto.Address.AddressRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "number", nullable = false)
    private String number;

    @Column(name = "complement")
    private String complement;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Column(name = "country", nullable = false, length = 8)
    private String country;

    @OneToOne(mappedBy = "address")
    private Company company;

    @OneToOne(mappedBy = "address")
    private Location location;

    public void update(AddressRequest addressRequest) {
        this.street = addressRequest.street();
        this.number = addressRequest.number();
        this.complement = addressRequest.complement();
        this.district = addressRequest.district();
        this.city = addressRequest.city();
        this.state = addressRequest.state();
        this.postalCode = addressRequest.postalCode();
        this.country = addressRequest.country();
    }

    public Address(AddressRequest data){
        this.street = data.street();
        this.number = data.number();
        this.complement = data.complement();
        this.district = data.district();
        this.city = data.city();
        this.state = data.state();
        this.postalCode = data.postalCode();
        this.country = data.country();
    }

}
