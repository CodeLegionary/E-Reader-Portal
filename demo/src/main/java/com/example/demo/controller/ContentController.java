package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.PostMapping;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class ContentController {

    @GetMapping("/req/login")
    public String login(){
        return "login";
    }

    @GetMapping("/req/signup")
    public String signup(){
        return "signup";
    }

    @GetMapping("/index")
    public void home(HttpServletResponse response) throws IOException {
        response.sendRedirect("http://localhost:5173"); // Redirect correctly to React frontend
    }
}