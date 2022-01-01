package com.pis.flatmanager.exception;

public class AccessForbiddenException extends Exception {
    public AccessForbiddenException(String message) {
        super(message);
    }

    public AccessForbiddenException(String message, Throwable cause) {
        super(message, cause);
    }
}
