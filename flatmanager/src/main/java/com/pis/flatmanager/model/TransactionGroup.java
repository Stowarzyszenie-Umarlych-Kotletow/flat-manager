package com.pis.flatmanager.model;

import com.pis.flatmanager.dto.transactions.TransactionGroupDto;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "transaction_groups")
public class TransactionGroup implements Serializable {

    @Id
    private UUID id = UUID.randomUUID();

    @NotNull
    @NonNull
    private String name;

    @NotNull
    @NonNull
    private UUID createdBy;

    @NotNull
    @NonNull
    private UUID flatId;

    @NotNull
    @NonNull
    private List<Transaction> transactions;

    @NotNull
    @NonNull
    private List<UUID> usersConnected;

    @CreatedDate
    private LocalDateTime dateCreated;

    @LastModifiedDate
    private LocalDateTime lastModified;

    @Version
    private Long version;

    public TransactionGroupDto asDto() {
        var sum = BigDecimal.valueOf(0);
        for(var t: transactions) {
            sum = sum.add(t.getPrice());
        }
        return new TransactionGroupDto(id, name, createdBy, flatId, transactions, usersConnected, dateCreated, sum.toString());
    }

}
