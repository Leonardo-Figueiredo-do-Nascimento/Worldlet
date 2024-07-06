package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet,Integer>{
}
