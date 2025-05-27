package com.example.helloapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/contact")
    public Map<String, Object> receiveContactForm(@RequestBody Map<String, String> payload) {
        String name = payload.get("name");
        String email = payload.get("email");
        String message = payload.get("message");

        Map<String, Object> response = new HashMap<>();

        if (name != null && email != null && message != null) {
            try {
                // Compose the email
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setFrom("tarikulislam3639@gmail.com"); // must match spring.mail.username
                mailMessage.setTo("tarikulislam3639@gmail.com");   // your receiving address
                mailMessage.setSubject("New Contact Form Submission");
                mailMessage.setText("Name: " + name + "\nEmail: " + email + "\nMessage: " + message);

                // Send the email
                mailSender.send(mailMessage);

                response.put("success", true);
                response.put("message", "Thanks for contacting us, " + name + "! Email sent successfully.");
            } catch (Exception e) {
                e.printStackTrace();
                response.put("success", false);
                response.put("message", "Failed to send email: " + e.getMessage());
            }
        } else {
            response.put("success", false);
            response.put("message", "Missing required fields.");
        }

        return response;
    }
}
