package ro.bluedreamshisha.platform.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.bluedreamshisha.platform.dto.request.LoginRequest;
import ro.bluedreamshisha.platform.dto.request.RegisterRequest;
import ro.bluedreamshisha.platform.facade.AuthFacade;

@RestController
@RequestMapping("${api.url.base}/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthFacade authFacade;

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody @Valid LoginRequest loginRequest,
                                      BindingResult bindingResult) {
    return new ResponseEntity<>(
      authFacade.login(loginRequest, bindingResult),
      HttpStatus.OK
    );
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest,
                                         BindingResult bindingResult) {
    return new ResponseEntity<>(
      authFacade.register(registerRequest, bindingResult),
      HttpStatus.OK
    );
  }
}
