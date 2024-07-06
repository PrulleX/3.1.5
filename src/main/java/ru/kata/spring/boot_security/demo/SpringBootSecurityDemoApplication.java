package ru.kata.spring.boot_security.demo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import ru.kata.spring.boot_security.demo.configs.TestCfg;
import ru.kata.spring.boot_security.demo.model.Users;

import java.util.List;

public class SpringBootSecurityDemoApplication {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(TestCfg.class);

		Communication communication = context.getBean("communication", Communication.class);

		// Добавление нового пользователя
		Users newUser = new Users(3L, "James", "Brown", (byte) 23);
		String saveResponse = communication.saveUser(newUser);
		System.out.println("Save response: " + saveResponse);

		// Обновление пользователя
		Users updatedUser = new Users(3L, "Thomas", "Shelby", (byte) 23);
		String updateResponse = communication.updateUser(updatedUser);
		System.out.println("Update response: " + updateResponse);

		// Удаление пользователя
		String deleteResponse = communication.deleteUser(updatedUser);
		System.out.println("Delete response: " + deleteResponse);

		// Получение всех пользователей
		List<Users> allUsers = communication.getAllUsers();
		System.out.println(allUsers);

		context.close();
	}
}
