package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class ConsommationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consommation.class);
        Consommation consommation1 = new Consommation();
        consommation1.setId(1L);
        Consommation consommation2 = new Consommation();
        consommation2.setId(consommation1.getId());
        assertThat(consommation1).isEqualTo(consommation2);
        consommation2.setId(2L);
        assertThat(consommation1).isNotEqualTo(consommation2);
        consommation1.setId(null);
        assertThat(consommation1).isNotEqualTo(consommation2);
    }
}
