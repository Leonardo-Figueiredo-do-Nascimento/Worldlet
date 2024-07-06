package CurrencyAPI.Currency.API.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users_tb")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUser;
    @Column(length = 80,nullable = false)
    private String userName;
    @Column(length = 30,nullable = false)
    private String email;
    @Column(length = 50,nullable = false)
    private String password;
    @Column(length = 50,nullable = false)
    private String country;

    @Column(nullable = false)
    private float totalAmount;

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }
}
