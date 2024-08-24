package ro.bluedreamshisha.platform.model.shared;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import ro.bluedreamshisha.platform.model.account.Account;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;

@Entity
@Getter
@Setter
public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @NotNull(message = ConstraintViolationCodes.REQUIRED)
  @ManyToOne
  private Account account;

  @NotNull(message = ConstraintViolationCodes.REQUIRED)
  @ManyToOne
  private City city;

  @NotBlank(message = ConstraintViolationCodes.REQUIRED)
  private String street;

  /**
   * Optional info like apartment, floor, etc.
   */
  private String additionalInfo;
}
