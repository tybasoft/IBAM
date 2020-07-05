package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class LigneBonReceptionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneBonReception.class);
        LigneBonReception ligneBonReception1 = new LigneBonReception();
        ligneBonReception1.setId(1L);
        LigneBonReception ligneBonReception2 = new LigneBonReception();
        ligneBonReception2.setId(ligneBonReception1.getId());
        assertThat(ligneBonReception1).isEqualTo(ligneBonReception2);
        ligneBonReception2.setId(2L);
        assertThat(ligneBonReception1).isNotEqualTo(ligneBonReception2);
        ligneBonReception1.setId(null);
        assertThat(ligneBonReception1).isNotEqualTo(ligneBonReception2);
    }
}
