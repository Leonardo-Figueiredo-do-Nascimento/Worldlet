package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletRepository extends JpaRepository<Wallet,Integer>{
    List<Wallet> findAllByUserWallet(User user);
}
