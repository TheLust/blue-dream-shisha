package ro.bluedreamshisha.platform.model.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import ro.bluedreamshisha.platform.annotation.length.Length;
import ro.bluedreamshisha.platform.model.constant.ConstraintViolationCodes;
import ro.bluedreamshisha.platform.model.constant.Constraints;

@Entity(name = "_user")
@Getter
@Setter
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @NotNull(message = ConstraintViolationCodes.REQUIRED)
  @Enumerated(EnumType.STRING)
  private Role role;

  @Column(columnDefinition = "VARCHAR(" + Constraints.User.Username.MAX + ")", nullable = false, unique = true)
  @NotBlank(message = ConstraintViolationCodes.REQUIRED)
  @Length(
    min = Constraints.User.Username.MIN,
    max = Constraints.User.Username.MAX
  )
  private String username;

  @Column(columnDefinition = "VARCHAR(" + Constraints.User.Password.MAX + ")", nullable = false)
  @NotBlank(message = ConstraintViolationCodes.REQUIRED)
  @Length(
    min = Constraints.User.Password.MIN,
    max = Constraints.User.Password.MAX
  )
  @Pattern(
    regexp = Constraints.User.Password.PATTERN,
    message = ConstraintViolationCodes.Pattern.PASSWORD
  )
  private String password;

  private boolean active;

  private boolean enabled;
}
