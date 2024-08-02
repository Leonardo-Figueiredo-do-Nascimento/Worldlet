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
    public Wallet getWalletByIsoCodeAndUserName(String isoCode,String userName){
        return walletRepository.findByIsoCodeAndUserWallet(isoCode,userService.getUserByName(userName));
    }
    public Wallet createWallet(Wallet wallet){
        transactionService.createTransaction(wallet.getUserWallet(),wallet.getUserWallet(),wallet.getCurrency(),"Wallet Creation",wallet.getAmount(),wallet.getWalletCard());
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
    public class WalletNotFoundException extends RuntimeException {
        public WalletNotFoundException(String message) {
            super(message);
        }
    }
    @Transactional
    public void transferMoney(String senderName,String recipientName,String isoCode,float amount){
        Optional<User> senderUser = userService.getUserByName(senderName);
        Optional<User> recipientUser = userService.getUserByName(recipientName);
        if(senderUser.isPresent() && recipientUser.isPresent()){
            User sender = senderUser.get();
            User recipient = recipientUser.get();
            Wallet senderWallet = walletRepository.findByIsoCodeAndUserWallet(isoCode,senderUser);
            Wallet recipientWallet = walletRepository.findByIsoCodeAndUserWallet(isoCode,recipientUser);
            if(senderWallet!=null&&recipientWallet!=null){
                debitWalletAmount(senderWallet.getWalletId(),amount);
                transactionService.createTransaction(sender,recipient,senderWallet.getCurrency(),"Deposit Transfer",amount,senderWallet.getWalletCard());
                depositWalletAmount(recipientWallet.getWalletId(),amount);
                transactionService.createTransaction(sender,recipient,senderWallet.getCurrency(),"Incoming Transfer",amount,recipientWallet.getWalletCard());
            } else{
                throw new WalletNotFoundException("Recipient does not have a wallet with the specified ISO code.");
            }
        }else {
            throw new WalletNotFoundException("Recipient not found.");
        }
    }
}
