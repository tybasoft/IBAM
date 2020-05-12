package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class MateriauTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Materiau.class);
        Materiau materiau1 = new Materiau();
        materiau1.setId(1L);
        Materiau materiau2 = new Materiau();
        materiau2.setId(materiau1.getId());
        assertThat(materiau1).isEqualTo(materiau2);
        materiau2.setId(2L);
        assertThat(materiau1).isNotEqualTo(materiau2);
        materiau1.setId(null);
        assertThat(materiau1).isNotEqualTo(materiau2);
    }
}
