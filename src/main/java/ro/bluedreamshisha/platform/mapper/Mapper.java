package ro.bluedreamshisha.platform.mapper;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import ro.bluedreamshisha.platform.dto.request.AuthRequest;
import ro.bluedreamshisha.platform.model.auth.User;

@Component
@RequiredArgsConstructor
public class Mapper {

  private final ModelMapper mapper;

  public User toEntity(AuthRequest authRequest) {
    return mapper.map(authRequest, User.class);
  }
}
