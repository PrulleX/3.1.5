//package ru.kata.spring.boot_security.demo.util;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//import ru.kata.spring.boot_security.demo.model.Role;
//import ru.kata.spring.boot_security.demo.model.User;
//import ru.kata.spring.boot_security.demo.repository.RoleRepository;
//import ru.kata.spring.boot_security.demo.service.UserService;
//import javax.annotation.PostConstruct;
//
//import java.util.HashSet;
//import java.util.Set;
//
//@Component
//public class DbInit {
//    private final UserService userService;
//    private final RoleRepository roleRepository;
//
//    @Autowired
//    public DbInit(UserService userService, RoleRepository roleRepository) {
//        this.userService = userService;
//        this.roleRepository = roleRepository;
//    }
//
//    @PostConstruct
//    private void postConstruct() {
//        Role user = new Role("ROLE_USER");
//        Role admin = new Role("ROLE_ADMIN");
//        roleRepository.save(admin);
//        roleRepository.save(user);
//
//        Set<Role> rolesAdmin = new HashSet<>();
//        rolesAdmin.add(admin);
//        rolesAdmin.add(user);
//        userService.saveUser(new User(1, "Admin", "Admin", "admin@mail.com", 12, "123", rolesAdmin));
//
//        Set<Role> rolesUser = new HashSet<>();
//        rolesUser.add(user);
//        userService.saveUser(new User(2, "User", "User", "user@mail.com", 13, "123", rolesUser));
//    }
//}
