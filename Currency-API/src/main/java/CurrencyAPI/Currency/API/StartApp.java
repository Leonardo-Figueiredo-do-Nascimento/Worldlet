package CurrencyAPI.Currency.API;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import CurrencyAPI.Currency.API.repository.UserRepository;
import CurrencyAPI.Currency.API.repository.WalletRepository;
import CurrencyAPI.Currency.API.service.UserService;
import CurrencyAPI.Currency.API.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartApp implements CommandLineRunner {

//    @Autowired
//    UserService userService;
//    @Autowired
//    WalletService walletService;

    @Override
    public void run(String... args) throws Exception {
//        User user = new User("Leonardo Teste 3.1","dasfda@email","saadf","USA",584);
//        userService.createUser(user);
//        walletService.createWallet(user,"Dolar",450,"$","USD");
    }
}
