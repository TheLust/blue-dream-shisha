package ro.bluedreamshisha.platform.model.constant;

public interface ConstraintViolationCodes {

  interface Pattern {
    String PHONE_NUMBER = "phoneNumber";
    String PASSWORD = "password";
  }

  String REQUIRED = "required";
  String EMAIL = "email";
  String PAST = "past";
  String UNIQUE = "unique";
  String INCORRECT = "incorrect";
  String MATCH = "match";
  String SAME = "same";
}
