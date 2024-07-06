//package ru.kata.spring.boot_security.demo.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import ru.kata.spring.boot_security.demo.model.User;
//import ru.kata.spring.boot_security.demo.repository.UserRepository;
//
//import java.util.Optional;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Autowired
//    public UserDetailsServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        Optional<User> user = userRepository.findByUserName(username);
//        if (user.isEmpty()) {
//            System.err.println("it is IF");
//            System.err.println(user);
//            throw new UsernameNotFoundException("Пользователь не найден");
//        }
//        System.err.println(user.get());
//        return user.get();
//    }
//}
