package CurrencyAPI.Currency.API.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wallets_tb")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int walletId;
    @Column(length = 30,nullable = false)
    private String currency;
    @Column(nullable = false)
    private float amount;
    @Column(length = 3,nullable = false)
    private String currencySymbol;
    @Column(length = 3,nullable = false)
    private String isoCode;
    @ManyToOne
    @JoinColumn(name="id_user",nullable = false)
    private User userWallet;
    @ManyToOne
    @JoinColumn(name="id_card",nullable = false)
    private CreditCard walletCard;
    public Wallet(){}
    public Wallet(String currency, float amount, String currencySymbol, String isoCode, User user,CreditCard creditCard) {
        this.currency = currency;
        this.amount = amount;
        this.currencySymbol = currencySymbol;
        this.isoCode = isoCode;
        this.userWallet = user;
        this.walletCard = creditCard;
    }
    public Wallet(String currency, float amount, String currencySymbol, String isoCode, User userWallet) {
        this.currency = currency;
        this.amount = amount;
        this.currencySymbol = currencySymbol;
        this.isoCode = isoCode;
        this.userWallet = userWallet;
    }
    public int getWalletId() {
        return walletId;
    }
    public void setWalletId(int walletId) {
        this.walletId = walletId;
    }
    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    public float getAmount() {
        return amount;
    }
    public void setAmount(float amount) {
        this.amount = amount;
    }
    public String getCurrencySymbol() {
        return currencySymbol;
    }
    public void setCurrencySymbol(String currencySymbol) {
        this.currencySymbol = currencySymbol;
    }
    public String getIsoCode() {
        return isoCode;
    }
    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }
    public User getUserWallet() {
        return userWallet;
    }
    public void setUserWallet(User userWallet) {
        this.userWallet = userWallet;
    }
    public CreditCard getWalletCard() {
        return walletCard;
    }
    public void setWalletCard(CreditCard walletCard) {
        this.walletCard = walletCard;
    }
}

