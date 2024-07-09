package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import CurrencyAPI.Currency.API.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private UserService userService;

    public List<Wallet> getUserWallets(User user){
        return walletRepository.findAllByUserWallet(user);
    }

    public void createWallet(Wallet wallet){
        walletRepository.save(wallet);
    }
    public void createWallet(User user, String currency,float currencyAmount,String currencySymbol,String isoCode){
        Wallet wallet = new Wallet(currency,currencyAmount,currencySymbol,isoCode,user);
        walletRepository.save(wallet);
    }
    public void deleteWallet(Wallet wallet){
        walletRepository.delete(wallet);
    }

    public void depositWalletAmount(int id, float amount){
        Wallet wallet = walletRepository.findById(id).orElse(null);
        if (wallet != null) {
            wallet.setAmount(wallet.getAmount()+amount);
            walletRepository.save(wallet);
        } ;
    }
    public void debitWalletAmount(int id, float amount){
        Wallet wallet = walletRepository.findById(id).orElse(null);
        if (wallet != null) {
            wallet.setAmount(wallet.getAmount()-amount);
            walletRepository.save(wallet);
        } ;
    }
    public void selfDeposit(Wallet wallet, float amount){
        depositWalletAmount(wallet.getUser().getIdUser(),amount);
        transactionService.createTransaction(wallet.getUser(),wallet.getUser(),wallet.getCurrency(),"Self Deposit",amount);
    }
    public void withdrawalWallet(Wallet wallet, float amount){
        debitWalletAmount(wallet.getUser().getIdUser(),amount);
        transactionService.createTransaction(wallet.getUser(),wallet.getUser(),wallet.getCurrency(),"Withdrawal",amount);
    }

    public void transferMoney(User sender,User recipient,String currency,float amount){
        debitWalletAmount(sender.getIdUser(),amount);
        transactionService.createTransaction(sender,recipient,currency,"Deposit",amount);
        depositWalletAmount(recipient.getIdUser(),amount);
        transactionService.createTransaction(sender,recipient,currency,"Incoming Transfer",amount);
    }
}
