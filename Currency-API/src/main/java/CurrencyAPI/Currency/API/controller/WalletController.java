package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.service.WalletService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/{user_name}/wallets")
public class WalletController {

    WalletService walletService;

}
