package com.crudoperationtrial.crud.Dto;

import com.crudoperationtrial.crud.Model.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
@Data
public class UserDto {
    private Integer id;

    private String firstName;


    private String lastName;

    private String userName;

    private String currentPassword;
    private String newPassword;

    private String phoneNumber;

    @Enumerated(value = EnumType.STRING)
    private Role role;
    
}
