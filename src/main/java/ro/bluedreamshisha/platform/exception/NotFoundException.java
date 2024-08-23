package ro.bluedreamshisha.platform.exception;

import lombok.Getter;

import java.util.Map;
import java.util.Objects;

@Getter
public class NotFoundException extends RuntimeException {

  private final Map<String, String> fieldByValue;

  public NotFoundException(String field, Object value) {
    fieldByValue = Map.of(field, Objects.toString(value, null));
  }
}
