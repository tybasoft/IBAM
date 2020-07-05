package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class PaieTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paie.class);
        Paie paie1 = new Paie();
        paie1.setId(1L);
        Paie paie2 = new Paie();
        paie2.setId(paie1.getId());
        assertThat(paie1).isEqualTo(paie2);
        paie2.setId(2L);
        assertThat(paie1).isNotEqualTo(paie2);
        paie1.setId(null);
        assertThat(paie1).isNotEqualTo(paie2);
    }
}
