package ro.bluedreamshisha.platform.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.bluedreamshisha.platform.model.shared.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
}
