package CurrencyAPI.Currency.API.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "cards_tb")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cardId;
    @Column(length = 20,nullable = false)
    private String cardNumber;
    @Column(length = 30,nullable = false)
    private String cardName;
    @Column(length = 30,nullable = false)
    private String cardCompanie;
    @Column(length = 5,nullable = false)
    private String cardCVC;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date cardExpirationDate;
    @ManyToOne
    @JoinColumn(name="id_user",nullable = false)
    private User userCard;

    public CreditCard(String cardNumber, String cardName, String cardCompanie, String cardCVC, Date cardExpirationDate, User userCard) {
        this.cardNumber = cardNumber;
        this.cardName = cardName;
        this.cardCompanie = cardCompanie;
        this.cardCVC = cardCVC;
        this.cardExpirationDate = cardExpirationDate;
        this.userCard = userCard;
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardCompanie() {
        return cardCompanie;
    }

    public void setCardCompanie(String cardCompanie) {
        this.cardCompanie = cardCompanie;
    }

    public String getCardCVC() {
        return cardCVC;
    }

    public void setCardCVC(String cardCVC) {
        this.cardCVC = cardCVC;
    }

    public Date getCardExpirationDate() {
        return cardExpirationDate;
    }

    public void setCardExpirationDate(Date cardExpirationDate) {
        this.cardExpirationDate = cardExpirationDate;
    }

    public User getUserCard() {
        return userCard;
    }

    public void setUserCard(User userCard) {
        this.userCard = userCard;
    }
}
