package com.vencentdev.freelance.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import com.vencentdev.freelance.controller.dto.SignupRequest;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, SignupRequest> {

    @Override
    public boolean isValid(SignupRequest dto, ConstraintValidatorContext context) {
        if (dto == null) return true;
        String p = dto.getPassword();
        String cp = dto.getConfirmPassword();
        return p != null && p.equals(cp);
    }
}
