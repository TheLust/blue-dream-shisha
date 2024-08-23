package ro.bluedreamshisha.platform.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import ro.bluedreamshisha.platform.model.auth.User;
import ro.bluedreamshisha.platform.service.impl.auth.UserService;

@Component
@RequiredArgsConstructor
public class UserValidator extends BasicValidator<User>{

  private final UserService userService;

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
}
