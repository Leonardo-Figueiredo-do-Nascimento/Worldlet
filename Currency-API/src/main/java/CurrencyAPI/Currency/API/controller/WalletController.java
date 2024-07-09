package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import CurrencyAPI.Currency.API.service.UserService;
import CurrencyAPI.Currency.API.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/{user_name}/wallets")
public class WalletController {
    @Autowired
    private UserService userService;
    @Autowired
    private WalletService walletService;

    @PostMapping
    public void saveWallet(@RequestBody Wallet wallet){
        walletService.createWallet(wallet);
    }

    @GetMapping
    public List<Wallet> getAllWallets(@PathVariable("user_name") String userName){
        return walletService.getUserWallets(userService.getUserByName(userName));
    }

//    @GetMapping("/{id_user}")
//    public List<Wallet> getAllWallets(@PathVariable int idUser){
//        return walletService.getUserWallets(idUser);
//    }
}
