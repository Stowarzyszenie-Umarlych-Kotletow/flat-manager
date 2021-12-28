package com.pis.flatmanager.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document(collection = "flats")
public class Flat implements Serializable {

}
