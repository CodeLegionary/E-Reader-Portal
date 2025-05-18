package com.example.demo.security.extra;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/{path:^(?!api).*$}")
    public String redirectToReact() {
        return "redirect:http://localhost:5173/";
    }
}