package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class BonReceptionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BonReception.class);
        BonReception bonReception1 = new BonReception();
        bonReception1.setId(1L);
        BonReception bonReception2 = new BonReception();
        bonReception2.setId(bonReception1.getId());
        assertThat(bonReception1).isEqualTo(bonReception2);
        bonReception2.setId(2L);
        assertThat(bonReception1).isNotEqualTo(bonReception2);
        bonReception1.setId(null);
        assertThat(bonReception1).isNotEqualTo(bonReception2);
    }
}
