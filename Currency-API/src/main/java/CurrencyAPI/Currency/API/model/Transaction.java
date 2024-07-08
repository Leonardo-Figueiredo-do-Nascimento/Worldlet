package CurrencyAPI.Currency.API.model;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "transactions_tb")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTransaction;

    @Column(length = 30, nullable = false)
    private String operation;
    @Column(length = 30,nullable = false)
    private String currency;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date operationDate;

    @Column(nullable = false)
    private float operationAmount;

    @ManyToOne
    @JoinColumn(name = "id_sender", nullable = false)
    private User senderUser;

    @ManyToOne
    @JoinColumn(name = "id_recipient", nullable = false)
    private User recipientUser;

    public Transaction(String operation, Date operationDate, float operationAmount, String currency,User senderUser, User recipientUser) {
        this.operation = operation;
        this.operationDate = operationDate;
        this.operationAmount = operationAmount;
        this.senderUser = senderUser;
        this.recipientUser = recipientUser;
        this.currency = currency;
    }

    public int getIdTransaction() {
        return idTransaction;
    }

    public void setIdTransaction(int idTransaction) {
        this.idTransaction = idTransaction;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Date getOperationDate() {
        return operationDate;
    }

    public void setOperationDate(Date operationDate) {
        this.operationDate = operationDate;
    }

    public float getOperationAmount() {
        return operationAmount;
    }

    public void setOperationAmount(float operationAmount) {
        this.operationAmount = operationAmount;
    }

    public User getSenderUser() {
        return senderUser;
    }

    public void setSenderUser(User senderUser) {
        this.senderUser = senderUser;
    }

    public User getRecipientUser() {
        return recipientUser;
    }

    public void setRecipientUser(User recipientUser) {
        this.recipientUser = recipientUser;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
