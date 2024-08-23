package ro.bluedreamshisha.platform.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/system")
public class SystemController {

  public ResponseEntity<Map<String, String>> getVersion() {
    return new ResponseEntity<>(
      Map.of("version", "1.0.0"),
      HttpStatus.OK
    );
  }
}
