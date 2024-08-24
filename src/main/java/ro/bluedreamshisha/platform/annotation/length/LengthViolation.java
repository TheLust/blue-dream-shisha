package ro.bluedreamshisha.platform.annotation.length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LengthViolation {

  private Integer actual;
  private Integer min;
  private Integer max;
}
