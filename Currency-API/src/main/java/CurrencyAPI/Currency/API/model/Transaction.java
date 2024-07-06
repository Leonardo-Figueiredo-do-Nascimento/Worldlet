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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date operationDate;

    @Column(nullable = false)
    private float operationAmount;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private User idUsuario;

    @ManyToOne
    @JoinColumn(name = "idDestino", nullable = false)
    private User idDestino;

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

    public User getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(User idUsuario) {
        this.idUsuario = idUsuario;
    }

    public User getIdDestino() {
        return idDestino;
    }

    public void setIdDestino(User idDestino) {
        this.idDestino = idDestino;
    }
}
