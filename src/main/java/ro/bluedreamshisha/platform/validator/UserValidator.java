package ro.bluedreamshisha.platform.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import ro.bluedreamshisha.platform.model.auth.User;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;
import ro.bluedreamshisha.platform.service.impl.auth.UserService;

@Component
@RequiredArgsConstructor
public class UserValidator extends BasicValidator<User> {

  private final UserService userService;

  public void validate(User target, String confirmPassword, Errors errors) {
    validate(target, errors);

    checkUnique(
      "username",
      target.getUsername(),
      target,
      userService::findByUsername,
      errors
    );

    if (!target.getPassword().equals(confirmPassword)) {
      errors.rejectValue("confirmPassword", ConstraintViolationCodes.MATCH);
    } else {
      errors.getFieldErrors()
        .stream()
        .filter(fieldError -> "password".equals(fieldError.getField()) && fieldError.getCode() != null)
        .forEach(fieldError -> errors.rejectValue("confirmPassword", fieldError.getCode()));
    }

    throwErrors(errors);
  }
}
