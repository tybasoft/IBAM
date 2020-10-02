package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class UniteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Unite.class);
        Unite unite1 = new Unite();
        unite1.setId(1L);
        Unite unite2 = new Unite();
        unite2.setId(unite1.getId());
        assertThat(unite1).isEqualTo(unite2);
        unite2.setId(2L);
        assertThat(unite1).isNotEqualTo(unite2);
        unite1.setId(null);
        assertThat(unite1).isNotEqualTo(unite2);
    }
}
