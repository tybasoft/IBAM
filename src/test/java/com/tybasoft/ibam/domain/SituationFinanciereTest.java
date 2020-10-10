package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class SituationFinanciereTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SituationFinanciere.class);
        SituationFinanciere situationFinanciere1 = new SituationFinanciere();
        situationFinanciere1.setId(1L);
        SituationFinanciere situationFinanciere2 = new SituationFinanciere();
        situationFinanciere2.setId(situationFinanciere1.getId());
        assertThat(situationFinanciere1).isEqualTo(situationFinanciere2);
        situationFinanciere2.setId(2L);
        assertThat(situationFinanciere1).isNotEqualTo(situationFinanciere2);
        situationFinanciere1.setId(null);
        assertThat(situationFinanciere1).isNotEqualTo(situationFinanciere2);
    }
}
