package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.Transaction;
import CurrencyAPI.Currency.API.model.Wallet;
import CurrencyAPI.Currency.API.service.TransactionService;
import CurrencyAPI.Currency.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{user_name}/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private UserService userService;

    @PostMapping
    public void saveTransaction(@RequestBody Transaction transaction){
        transactionService.createTransaction(transaction);
    }

    @GetMapping
    public List<Transaction> getAllTransactions(@PathVariable("user_name") String userName){
        return transactionService.getUserTransactions(userService.getUserByName(userName));
    }
}
