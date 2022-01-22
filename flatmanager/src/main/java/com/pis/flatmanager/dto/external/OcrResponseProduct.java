package com.pis.flatmanager.dto.external;

import lombok.Value;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Value
public class OcrResponseProduct implements Serializable {
    @NotNull
    String name;
    @NotNull
    String price;
}
