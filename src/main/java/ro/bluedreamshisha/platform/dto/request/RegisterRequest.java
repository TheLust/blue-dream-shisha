package ro.bluedreamshisha.platform.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest extends LoginRequest {

  private String confirmPassword;
}
