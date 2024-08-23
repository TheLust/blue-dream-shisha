package ro.bluedreamshisha.platform.exception;

import lombok.Getter;
import org.springframework.validation.Errors;
import ro.bluedreamshisha.platform.dto.error.ErrorCode;

import java.util.HashMap;
import java.util.Map;

@Getter
public class BlueDreamShishaException extends RuntimeException {

  private final String message;
  private final ErrorCode errorCode;
  private final Map<String, String> errors;

  public BlueDreamShishaException(String message, ErrorCode errorCode) {
    this.message = message;
    this.errorCode = errorCode;
    this.errors = null;
  }

  public BlueDreamShishaException(String message, ErrorCode errorCode, Map<String, String> errors) {
    this.message = message;
    this.errorCode = errorCode;
    this.errors = errors;
  }

  public BlueDreamShishaException(Errors errors) {
    this.message = "Validation errors found";
    this.errorCode = ErrorCode.VALIDATION_ERROR;

    Map<String, String> errorMap = new HashMap<>();
    errors.getFieldErrors()
      .forEach(fieldError -> errorMap.put(fieldError.getField(), fieldError.getCode()));

    this.errors = errorMap;
  }
}
