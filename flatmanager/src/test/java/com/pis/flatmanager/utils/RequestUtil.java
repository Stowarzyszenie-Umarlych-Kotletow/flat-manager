package com.pis.flatmanager.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

@Component
public class RequestUtil {

    @Autowired
    private ObjectMapper objectMapper;

    public MockHttpServletRequestBuilder json(MockHttpServletRequestBuilder builder, final Object body, String authToken) {
        return json(builder, body)
                .header("Authorization", String.format("Bearer %s", authToken));
    }

    public MockHttpServletRequestBuilder json(MockHttpServletRequestBuilder builder, final Object body) {
        return builder
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(asJsonString(body));
    }

    public String asJsonString(final Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
