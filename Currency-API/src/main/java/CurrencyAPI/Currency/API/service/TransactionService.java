package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.Transaction;
import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repository;

    @Autowired
    private Transaction transaction;

    public void createTransaction(User sender,User recipient,String currency, String operation, float opAmount){
        transaction.setCurrency(currency);
        transaction.setRecipientUser(recipient);
        transaction.setSenderUser(sender);
        transaction.setOperation(operation);
        transaction.setOperationAmount(opAmount);
        repository.save(transaction);
    }

    public List<Transaction> getUserTransactions(){
        return repository.findAll();
    }
}
