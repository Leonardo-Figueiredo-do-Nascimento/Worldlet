package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import CurrencyAPI.Currency.API.service.UserService;
import CurrencyAPI.Currency.API.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping
    public List<Wallet> getAllWallets(@PathVariable("user_name") String userName){
        return walletService.getUserWallets(userService.getUserByName(userName));
    }
    @PostMapping("/new-wallet")
    public ResponseEntity<?> saveWallet(@RequestBody Wallet wallet){
        if(walletService.getWalletByIsoCode(wallet.getIsoCode()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Currency already exists");
        }
        return ResponseEntity.ok(walletService.createWallet(wallet));
    }

    @PutMapping("/deposit-wallet/{amount}")
    public void depositWallet(@RequestBody Wallet wallet,@PathVariable("amount") float amount){
        walletService.depositWalletAmount(wallet.getWalletId(),amount);
    }
    @PutMapping("/debit-wallet/{amount}")
    public void debitWallet(@RequestBody Wallet wallet,@PathVariable("amount") float amount){
        walletService.debitWalletAmount(wallet.getWalletId(),amount);
    }
    @DeleteMapping
    public void deleteWallet(@RequestBody Wallet wallet){
        deleteWallet(wallet);
    }
    @PutMapping("/self-deposit-wallet/{amount}")
    public void selfDepositWallet(@RequestBody Wallet wallet,@PathVariable("amount") float amount){
        walletService.selfDeposit(wallet,amount);
    }
}
