package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet,Integer>{
    List<Wallet> findAllByUserWallet(Optional<User> user);
    Optional<Wallet> findWalletByIsoCode(String isoCode);
    void deleteByIsoCode(String isoCode);
}
