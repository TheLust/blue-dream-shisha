package ro.bluedreamshisha.platform.mapper;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import ro.bluedreamshisha.platform.dto.request.LoginRequest;
import ro.bluedreamshisha.platform.dto.request.RegisterRequest;
import ro.bluedreamshisha.platform.model.auth.User;

@Component
@RequiredArgsConstructor
public class Mapper {

  private final ModelMapper mapper;

  public User toEntity(LoginRequest loginRequest) {
    return mapper.map(loginRequest, User.class);
  }

  public User toEntity(RegisterRequest registerRequest) {
    return mapper.map(registerRequest, User.class);
  }
}
