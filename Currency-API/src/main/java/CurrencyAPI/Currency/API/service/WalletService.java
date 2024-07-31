package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.model.Wallet;
import CurrencyAPI.Currency.API.repository.WalletRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private UserService userService;
    public List<Wallet> getUserWallets(Optional<User> user){
        return walletRepository.findAllByUserWallet(user);
    }

    public Optional<Wallet> getWalletByIsoCode(String isoCode){
        return walletRepository.findWalletByIsoCode(isoCode);
    }
    public Wallet createWallet(Wallet wallet){
        return walletRepository.save(wallet);
    }
    public Wallet createWallet(User user, String currency, float currencyAmount, String currencySymbol, String isoCode, CreditCard card){
        Wallet wallet = new Wallet(currency,currencyAmount,currencySymbol,isoCode,user,card);
        return walletRepository.save(wallet);
    }
    @Transactional
    public void deleteWallet(String walletIsoCode){
        walletRepository.deleteByIsoCode(walletIsoCode);
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
    @Transactional
    public void selfDeposit(String userName,String isoCode, float amount){
        Wallet wallet = walletRepository.findByIsoCodeAndUserWallet(isoCode,userService.getUserByName(userName));
        depositWalletAmount(wallet.getWalletId(),amount);
        transactionService.createTransaction(wallet.getUserWallet(),wallet.getUserWallet(),wallet.getCurrency(),"Self Deposit",amount,wallet.getWalletCard());
    }
    @Transactional
    public void withdrawalWallet(String userName,String isoCode, float amount){
        Wallet wallet = walletRepository.findByIsoCodeAndUserWallet(isoCode,userService.getUserByName(userName));
        debitWalletAmount(wallet.getWalletId(),amount);
        transactionService.createTransaction(wallet.getUserWallet(),wallet.getUserWallet(),wallet.getCurrency(),"Withdrawal",amount,wallet.getWalletCard());
    }
    @Transactional
    public void transferMoney(User sender,User recipient,String currency,float amount){
        Wallet senderWallet = walletRepository.findById(sender.getIdUser()).orElse(null);
        Wallet recipientWallet = walletRepository.findById(recipient.getIdUser()).orElse(null);
        debitWalletAmount(sender.getIdUser(),amount);
        transactionService.createTransaction(sender,recipient,currency,"Deposit Transfer",amount,senderWallet.getWalletCard());
        depositWalletAmount(recipient.getIdUser(),amount);
        transactionService.createTransaction(sender,recipient,currency,"Incoming Transfer",amount,recipientWallet.getWalletCard());
    }
}
