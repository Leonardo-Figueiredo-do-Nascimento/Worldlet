package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.model.Transaction;
import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repository;

    public void createTransaction(User sender, User recipient, String currency, String operation, float opAmount, CreditCard senderCard){
        Transaction transaction = new Transaction(operation,new Date(),opAmount,currency,sender,recipient,senderCard);
        repository.save(transaction);
    }
    public void createTransaction(Transaction transaction){
        repository.save(transaction);
    }

    public List<Transaction> getUserTransactions(Optional<User> user) {
        return repository.findAllBySenderUser(user);
    }
}
