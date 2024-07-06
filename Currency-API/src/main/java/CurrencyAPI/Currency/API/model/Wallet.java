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
    @Column(nullable = false)
    private User user;

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
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
