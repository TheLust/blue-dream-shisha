package ro.bluedreamshisha.platform.exception;

import lombok.Getter;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import ro.bluedreamshisha.platform.dto.error.ErrorCode;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

@Getter
public class BlueDreamShishaException extends RuntimeException {

  private final String message;
  private final ErrorCode errorCode;
  private final Map<String, String> errors;

  private static final Map<String, Integer> CONSTRAINT_PRIORITY = Map.of(
    ConstraintViolationCodes.REQUIRED, 3,
    ConstraintViolationCodes.PAST, 2,
    ConstraintViolationCodes.UNIQUE, 2,
    ConstraintViolationCodes.EMAIL, 3,
    ConstraintViolationCodes.Pattern.PASSWORD, 1,
    ConstraintViolationCodes.Pattern.PHONE_NUMBER, 1
  );

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
      .stream()
      .sorted(Comparator.comparingInt(this::getPriority))
      .forEach(fieldError -> errorMap.put(fieldError.getField(), fieldError.getCode()));

    this.errors = errorMap;
  }

  private int getPriority(FieldError fieldError) {
    Integer priority = CONSTRAINT_PRIORITY.getOrDefault(fieldError.getCode(), null);
    if (priority == null) {
      if (fieldError.getCode() != null && fieldError.getCode().contains("length")) {
        return 2;
      } else {
        return Integer.MAX_VALUE;
      }
    }

    return priority;
  }
}
