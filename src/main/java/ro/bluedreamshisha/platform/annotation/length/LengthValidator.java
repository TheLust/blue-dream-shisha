package ro.bluedreamshisha.platform.annotation.length;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Map;

public class LengthValidator implements ConstraintValidator<Length, String> {

  ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();

  private int min;
  private int max;

  @Override
  public void initialize(Length constraintAnnotation) {
    this.min = constraintAnnotation.min();
    this.max = constraintAnnotation.max();
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    if (value == null) {
      return true; // Handle @NotNull separately if needed
    }

    int actualSize = value.length();

    if (actualSize < min || actualSize > max) {
      context.disableDefaultConstraintViolation();
      try {
        context.buildConstraintViolationWithTemplate(objectWriter.writeValueAsString(
          Map.of("length:", new LengthViolation(actualSize, min, max))
        )).addConstraintViolation();
      } catch (JsonProcessingException e) {
        context.buildConstraintViolationWithTemplate(
          "{\"length\": {" +
            "\"actual\":" + actualSize + "," +
            "\"min\":" + min + "," +
            "\"max\":" + max + "}}"
        ).addConstraintViolation();
      }

      return false;
    }

    return true;
  }
}
