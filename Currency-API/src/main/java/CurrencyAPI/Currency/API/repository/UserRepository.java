package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
