package ro.bluedreamshisha.platform.model.account;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;
import ro.bluedreamshisha.platform.model.constant.Constraints;
import ro.bluedreamshisha.platform.model.shared.Address;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Account {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @NotBlank(message = ConstraintViolationCodes.REQUIRED)
  private String firstName;

  @NotBlank(message = ConstraintViolationCodes.REQUIRED)
  private String lastName;

  /**
   * Optional, used for account recovery
   */
  @Email(message = ConstraintViolationCodes.EMAIL)
  private String email;

  /**
   * Mandatory for order confirmation
   */
  @NotBlank(message = ConstraintViolationCodes.REQUIRED)
  @Pattern(
    regexp = Constraints.Account.PhoneNumber.PATTERN,
    message = ConstraintViolationCodes.Pattern.PHONE_NUMBER
  )
  private String phoneNumber;

  @OneToMany(mappedBy = "account")
  private List<Address> addresses = new ArrayList<>();
}
