package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class CompteRenduTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompteRendu.class);
        CompteRendu compteRendu1 = new CompteRendu();
        compteRendu1.setId(1L);
        CompteRendu compteRendu2 = new CompteRendu();
        compteRendu2.setId(compteRendu1.getId());
        assertThat(compteRendu1).isEqualTo(compteRendu2);
        compteRendu2.setId(2L);
        assertThat(compteRendu1).isNotEqualTo(compteRendu2);
        compteRendu1.setId(null);
        assertThat(compteRendu1).isNotEqualTo(compteRendu2);
    }
}
