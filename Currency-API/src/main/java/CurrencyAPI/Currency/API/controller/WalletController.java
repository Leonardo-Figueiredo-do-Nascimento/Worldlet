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
    @DeleteMapping("/delete-wallet/{isoCode}")
    public void deleteWallet(@PathVariable("isoCode") String isoCode){
        walletService.deleteWallet(isoCode);
    }

    @PutMapping("/withdraw-wallet/{isoCode}/{amount}")
    public void debitWallet(@PathVariable("user_name") String userName,@PathVariable("isoCode") String isoCode,@PathVariable("amount") float amount){
        walletService.withdrawalWallet(userName,isoCode,amount);
    }
    @PutMapping("/self-deposit-wallet/{isoCode}/{amount}")
    public void selfDepositWallet(@PathVariable("user_name") String userName,@PathVariable("isoCode") String isoCode,@PathVariable("amount") float amount){
        walletService.selfDeposit(userName,isoCode,amount);
    }
}
