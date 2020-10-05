package com.tybasoft.ibam.domain;

import com.tybasoft.ibam.security.SecurityUtils;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A Depot.
 */
public class PdfMailing implements Serializable {

    private String message;

    private List<String> dest_array ;


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getDest_array() {
        return dest_array;
    }

    public void setDest_array(List<String> dest_array) {
        this.dest_array = dest_array;
    }
}
