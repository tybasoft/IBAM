package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class EntitetestTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entitetest.class);
        Entitetest entitetest1 = new Entitetest();
        entitetest1.setId(1L);
        Entitetest entitetest2 = new Entitetest();
        entitetest2.setId(entitetest1.getId());
        assertThat(entitetest1).isEqualTo(entitetest2);
        entitetest2.setId(2L);
        assertThat(entitetest1).isNotEqualTo(entitetest2);
        entitetest1.setId(null);
        assertThat(entitetest1).isNotEqualTo(entitetest2);
    }
}
