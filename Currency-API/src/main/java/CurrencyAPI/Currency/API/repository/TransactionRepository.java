package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
}
