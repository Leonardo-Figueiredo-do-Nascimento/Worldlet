package CurrencyAPI.Currency.API.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wallet_tb")
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

    public Wallet(){}

    public Wallet(String currency, float amount, String currencySymbol, String isoCode, User user) {
        this.currency = currency;
        this.amount = amount;
        this.currencySymbol = currencySymbol;
        this.isoCode = isoCode;
        this.userWallet = user;
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

    public User getUser() {
        return userWallet;
    }

    public void setUser(User user) {
        this.userWallet = user;
    }
}
