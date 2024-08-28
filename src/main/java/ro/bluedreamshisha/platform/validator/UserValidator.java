package ro.bluedreamshisha.platform.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import ro.bluedreamshisha.platform.dto.request.RegisterRequest;
import ro.bluedreamshisha.platform.model.auth.User;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;
import ro.bluedreamshisha.platform.service.impl.auth.UserService;

@Component
@RequiredArgsConstructor
public class UserValidator extends BasicValidator<User>{

  private final UserService userService;

  @Override
  public void validateAndThrow(User target, Errors errors) {
    validate(target, errors);

    checkUnique(
      "username",
      target.getUsername(),
      target,
      userService::findByUsername,
      errors
    );

    throwErrors(errors);
  }

  public void validateAndThrow(RegisterRequest target, Errors errors) {
    if (!target.getPassword().equals(target.getConfirmPassword())) {
      errors.rejectValue("password", ConstraintViolationCodes.MATCH);
      errors.rejectValue("confirmPassword", ConstraintViolationCodes.MATCH);
    }

    throwErrors(errors);
  }
}
