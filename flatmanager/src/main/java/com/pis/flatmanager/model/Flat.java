package com.pis.flatmanager.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Entity;
import java.io.Serializable;

@Data
@Entity
@Document(collection = "flats")
public class Flat implements Serializable {

}
