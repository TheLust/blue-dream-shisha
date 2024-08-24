package ro.bluedreamshisha.platform.model.constant;

public interface Constraints {
  interface User {
    interface Username {
      int MIN = 1;
      int MAX = 128;
    }

    interface Password {
      int MIN = 8;
      int MAX = 256;
      String PATTERN = "^(?=.*[A-Z])(?=.*[!@#$%^&*()_\\-+=\\[\\]{};:'\",.<>/?]).*$";
    }
  }

  interface Account {
    interface PhoneNumber {
      String PATTERN = "^\\+\\d{5,17}$";
    }
  }
}
