package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.service.TransactionService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/{user_name}/transactions")
public class TransactionController {
    TransactionService transactionService;
}
