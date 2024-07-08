package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.Transaction;
import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repository;

    @Autowired
    private WalletService walletService;

    public void createTransaction(User sender,User recipient,String currency, String operation, float opAmount){
        Transaction transaction = new Transaction(operation,new Date(),opAmount,currency,sender,recipient);
        repository.save(transaction);
    }

    public List<Transaction> getUserTransactions(Integer userId) {
        return repository.findBySenderUserIdOrRecipientUserId(userId);
    }
}
