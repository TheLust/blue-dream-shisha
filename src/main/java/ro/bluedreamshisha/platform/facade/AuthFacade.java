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
import ro.bluedreamshisha.platform.dto.request.AuthRequest;
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

  public String login(AuthRequest authRequest,
                      BindingResult bindingResult) {
    userValidator.throwErrors(bindingResult);
    return generateToken(authRequest);
  }

  public String register(AuthRequest authRequest,
                         BindingResult bindingResult) {
    User user = mapper.toEntity(authRequest);
    user.setRole(Role.CUSTOMER);
    user.setActive(true);
    user.setEnabled(true);

    userValidator.validate(user, bindingResult);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userService.insert(user);

    return generateToken(authRequest);
  }

  private String generateToken(AuthRequest authRequest) {
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
      authRequest.getUsername(),
      authRequest.getPassword()
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
