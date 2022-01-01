package com.pis.flatmanager.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

public class RequestUtil {
    public static MockHttpServletRequestBuilder json(MockHttpServletRequestBuilder builder, final Object body, String authToken) {
        return json(builder, body)
                .header("Authorization", String.format("Bearer %s", authToken));
    }

    public static MockHttpServletRequestBuilder json(MockHttpServletRequestBuilder builder, final Object body) {
        return builder
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(asJsonString(body));
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
