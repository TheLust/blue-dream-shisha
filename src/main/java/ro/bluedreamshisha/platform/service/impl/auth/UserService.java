package ro.bluedreamshisha.platform.service.impl.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.bluedreamshisha.platform.model.auth.User;
import ro.bluedreamshisha.platform.repository.UserRepository;
import ro.bluedreamshisha.platform.service.impl.CrudService;

import java.util.Optional;

@Service
public class UserService extends CrudService<User, Long> {

  private final UserRepository repository;

  @Autowired
  public UserService(UserRepository repository) {
    super(repository);
    this.repository = repository;
  }

  public Optional<User> findByUsername(String username) {
    return repository.findByUsername(username);
  }
}
