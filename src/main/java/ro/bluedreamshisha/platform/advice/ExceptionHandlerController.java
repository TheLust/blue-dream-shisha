package ro.bluedreamshisha.platform.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ro.bluedreamshisha.platform.dto.error.ErrorCode;
import ro.bluedreamshisha.platform.dto.error.ErrorResponse;
import ro.bluedreamshisha.platform.exception.BlueDreamShishaException;
import ro.bluedreamshisha.platform.exception.NotFoundException;

@RestControllerAdvice
public class ExceptionHandlerController {

  @ExceptionHandler(BlueDreamShishaException.class)
  private ResponseEntity<ErrorResponse> handleException(BlueDreamShishaException e) {
    return new ResponseEntity<>(
      new ErrorResponse(e.getMessage(), e.getErrorCode(), e.getErrors()),
      e.getErrorCode().getStatus()
    );
  }

  @ExceptionHandler(NotFoundException.class)
  private ResponseEntity<ErrorResponse> handleException(NotFoundException e) {
    return new ResponseEntity<>(
      new ErrorResponse(e.getMessage(), ErrorCode.NOT_FOUND, e.getFieldByValue()),
      HttpStatus.NOT_FOUND
    );
  }
}
