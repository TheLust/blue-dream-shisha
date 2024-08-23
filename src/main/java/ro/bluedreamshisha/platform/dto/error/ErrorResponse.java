package ro.bluedreamshisha.platform.dto.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class ErrorResponse {

  public ErrorResponse(String message, ErrorCode errorCode) {
    this.message = message;
    this.errorCode = errorCode;
  }

  public ErrorResponse(String message, ErrorCode errorCode, Map<String, String> errors) {
    this.message = message;
    this.errorCode = errorCode;
    this.errors = errors;
  }

  private String message;
  private ErrorCode errorCode;
  private Map<String, String> errors;
}
