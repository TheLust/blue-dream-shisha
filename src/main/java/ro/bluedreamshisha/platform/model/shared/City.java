package ro.bluedreamshisha.platform.model.shared;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;

@Entity
@Getter
@Setter
public class City {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @NotBlank(message = ConstraintViolationCodes.REQUIRED)
  private String name;
}
