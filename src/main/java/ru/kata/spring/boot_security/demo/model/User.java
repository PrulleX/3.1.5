package ru.kata.spring.boot_security.demo.model;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Collection;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "username")
    @NotEmpty(message = "Поле с именем не может быть пустым.")
    @Size(min = 2, max = 255, message = "Длина имени должна составлять от 1 до 255 символов.")
    @Pattern(regexp = "^[А-ЯA-Z][а-яa-z]+$", message = "Имя должно начинаться с большой буквы и состоять только из букв.")
    private String userName;

    @Column(name = "surname")
    @NotEmpty(message = "Поле с фамилией не может быть пустым.")
    @Size(min = 2, max = 255, message = "Длина фамилии должна составлять от 1 до 255 символов.")
    @Pattern(regexp = "^[А-ЯA-Z][а-яa-z]+$", message = "Имя должно начинаться с большой буквы и состоять только из букв.")
    private String surName;

    @NotBlank(message = "Поле не должно быть пустым!")
    @Email(message = "Электронная почта должна быть действительной!")
    @Column(name = "email")
    private String email;

    @Column(name = "age")
    @Min(value = 1, message = "Возраст человека не может быть равен 0.")
    private int age;

    @Column(name = "password")
    private String password;

    @ManyToMany
    @Fetch(FetchMode.JOIN)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public User() {

    }

    public User(long id, String userName, String surName, String email, int age, String password, Set<Role> roles) {
        this.id = id;
        this.userName = userName;
        this.surName = surName;
        this.email = email;
        this.age = age;
        this.password = password;
        this.roles = roles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String roleToString() {
        StringBuilder sb = new StringBuilder();
        this.roles.forEach(x -> sb.append(x.getRole()).append(" "));
        return sb.toString();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", surName='" + surName + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && age == user.age && Objects.equals(userName, user.userName) && Objects.equals(surName, user.surName) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(roles, user.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, surName, email, age, password, roles);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
