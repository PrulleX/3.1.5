package ru.kata.spring.boot_security.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import ru.kata.spring.boot_security.demo.model.Users;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Component
public class Communication {

    @Autowired
    private final RestTemplate restTemplate;
    private final String URL = "http://94.198.50.185:7081/api/users";

    private String sessionId;

    public Communication(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Users> getAllUsers() {
        ResponseEntity<List<Users>> responseEntity = restTemplate.exchange(URL, HttpMethod.GET, null,
                new ParameterizedTypeReference<List<Users>>() {});
        HttpHeaders headers = responseEntity.getHeaders();
        List<String> cookies = headers.get(HttpHeaders.SET_COOKIE);
        if (cookies != null && !cookies.isEmpty()) {
            for (String cookie : cookies) {
                if (cookie.startsWith("JSESSIONID")) {
                    sessionId = cookie.split(";")[0];
                    break;
                }
            }
        }
        return responseEntity.getBody();
    }

    public String updateUser(Users user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, sessionId);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Users> entity = new HttpEntity<>(user, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(URL, HttpMethod.PUT, entity, String.class);
        return responseEntity.getBody();
    }

    public String saveUser(Users user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, sessionId);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Users> entity = new HttpEntity<>(user, headers);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(URL, entity, String.class);
        return responseEntity.getBody();
    }

    public String deleteUser(Users user) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, sessionId);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        String url = URL + "/" + id;
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, String.class);
        return responseEntity.getBody();
    }
}
