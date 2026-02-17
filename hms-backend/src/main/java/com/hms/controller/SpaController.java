package com.hms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        // Forward to home page so Angular routing can take over
        return "forward:/index.html";
    }
}
