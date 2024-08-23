package ro.bluedreamshisha.platform.validator;

import jakarta.persistence.Id;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.validation.Errors;
import ro.bluedreamshisha.platform.exception.BlueDreamShishaException;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.Optional;
import java.util.function.Function;

public class BasicValidator<T> {

  private final Field ID_FIELD;

  public BasicValidator() {
    this(true);
  }

  public BasicValidator(boolean isEntity) {
    this.ID_FIELD = isEntity ? getIdField() : null;
  }

  public void validate(T target, Errors errors) {
    try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
      Validator validator = factory.getValidator();

      for (ConstraintViolation<T> violation : validator.validate(target)) {
        errors.rejectValue(violation.getPropertyPath().toString(), violation.getMessage());
      }
    } catch (Exception e) {
      throw new RuntimeException("Cannot get validator from factory");
    }
  }

  public void validateAndThrow(T target, Errors errors) {
    validate(target, errors);
    throwErrors(errors);
  }

  public void throwErrors(Errors errors) {
    if (errors.hasErrors()) {
      throw new BlueDreamShishaException(errors);
    }
  }

  public <G> void checkUnique(String fieldName,
                              G fieldValue,
                              T entity,
                              Function<G, Optional<T>> findByFunction,
                              Errors errors) {
    if (ID_FIELD == null) {
      throw new RuntimeException("Cannot use this unique validator for non entities");
    }

    if (fieldValue == null) {
      return;
    }

    Optional<T> foundEntity = findByFunction.apply(fieldValue);

    if (foundEntity.isPresent()) {
      Object entityId = getIdValue(entity);
      Object foundId = getIdValue(foundEntity.get());

      if (foundId.equals(entityId)) {
        return;
      }

      errors.rejectValue(fieldName, ConstraintViolationCodes.UNIQUE);
    }
  }

  private Object getValueByField(Object object,
                                 String fieldName
  ) throws NoSuchFieldException, IllegalAccessException {
    Field field = object.getClass().getDeclaredField(fieldName);
    field.setAccessible(true);

    return field.get(object);
  }

  @SuppressWarnings("unchecked")
  private Field getIdField() {
    Class<T> clazz = (Class<T>) ((ParameterizedType) getClass()
      .getGenericSuperclass())
      .getActualTypeArguments()[0];

    for (Field field : clazz.getDeclaredFields()) {
      if (field.isAnnotationPresent(Id.class)) {
        return field;
      }
    }

    throw new RuntimeException("Could not create generic service because the entity does not have an id field");
  }

  private Object getIdValue(T entity) {
    ID_FIELD.setAccessible(true);
    try {
      return ID_FIELD.get(entity);
    } catch (IllegalAccessException e) {
      throw new RuntimeException("Could not get id value");
    }
  }
}
