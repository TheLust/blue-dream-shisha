package ro.bluedreamshisha.platform.service.impl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.bluedreamshisha.platform.model.account.Account;
import ro.bluedreamshisha.platform.repository.AccountRepository;
import ro.bluedreamshisha.platform.service.impl.CrudService;

import java.util.Optional;

@Service
public class AccountService extends CrudService<Account, Long> {

  private final AccountRepository repository;

  @Autowired
  public AccountService(AccountRepository repository) {
    super(repository);
    this.repository = repository;
  }

  public Optional<Account> findByEmail(String email) {
    return repository.findByEmail(email);
  }

  public Optional<Account> findByPhoneNumber(String phoneNumber) {
    return repository.findByPhoneNumber(phoneNumber);
  }
}
