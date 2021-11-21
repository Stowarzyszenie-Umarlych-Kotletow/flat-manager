package com.pis.flatmanager.controller;

import com.pis.flatmanager.entity.StringResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @GetMapping("/helloworld")
    public StringResponse getHelloWorld() {
        return new StringResponse("Hello World!");
    }
}
