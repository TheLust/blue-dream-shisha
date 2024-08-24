package ro.bluedreamshisha.platform.service.impl.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ro.bluedreamshisha.platform.model.auth.User;
import ro.bluedreamshisha.platform.model.auth.UserDetails;
import ro.bluedreamshisha.platform.repository.UserRepository;

import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

  private final UserRepository userRepository;

  @Autowired
  public UserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> account = userRepository.findByUsername(username);
    if (account.isEmpty()) {
      throw new UsernameNotFoundException("Username not found");
    }
    return new UserDetails(account.get());
  }
}
