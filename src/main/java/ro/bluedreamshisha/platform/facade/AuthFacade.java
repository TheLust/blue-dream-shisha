package ro.bluedreamshisha.platform.facade;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import ro.bluedreamshisha.platform.dto.error.ErrorCode;
import ro.bluedreamshisha.platform.dto.request.LoginRequest;
import ro.bluedreamshisha.platform.dto.request.RegisterRequest;
import ro.bluedreamshisha.platform.exception.BlueDreamShishaException;
import ro.bluedreamshisha.platform.mapper.Mapper;
import ro.bluedreamshisha.platform.model.auth.Role;
import ro.bluedreamshisha.platform.model.auth.User;
import ro.bluedreamshisha.platform.model.auth.UserDetails;
import ro.bluedreamshisha.platform.security.JwtUtils;
import ro.bluedreamshisha.platform.service.impl.auth.UserService;
import ro.bluedreamshisha.platform.validator.UserValidator;

@Component
@RequiredArgsConstructor
public class AuthFacade {

  private final UserService userService;
  private final UserValidator userValidator;
  private final Mapper mapper;
  private final AuthenticationManager authenticationManager;
  private final JwtUtils jwtUtils;
  private final PasswordEncoder passwordEncoder;

  public String login(LoginRequest loginRequest,
                      BindingResult bindingResult) {
    userValidator.throwErrors(bindingResult);
    return generateToken(loginRequest);
  }

  public String register(RegisterRequest registerRequest,
                         BindingResult bindingResult) {
    User user = mapper.toEntity(registerRequest);
    user.setRole(Role.CUSTOMER);
    user.setActive(true);
    user.setEnabled(true);

    userValidator.validate(user, registerRequest.getConfirmPassword(), bindingResult);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userService.insert(user);

    return generateToken(registerRequest);
  }

  private String generateToken(LoginRequest loginRequest) {
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
      loginRequest.getUsername(),
      loginRequest.getPassword()
    );

    try {
      Authentication auth = authenticationManager.authenticate(authenticationToken);
      UserDetails userDetails = (UserDetails) auth.getPrincipal();
      return jwtUtils.generateToken(userDetails.getUser());

    } catch (BadCredentialsException e) {
      throw new BlueDreamShishaException("Incorrect username or/and password", ErrorCode.BAD_CREDENTIALS);
    }
  }
}
