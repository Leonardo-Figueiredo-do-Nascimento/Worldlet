package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.Transaction;
import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Integer>{
    List<Transaction> findAllBySenderUser(User user);
}
