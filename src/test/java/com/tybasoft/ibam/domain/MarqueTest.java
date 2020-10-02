package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class MarqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Marque.class);
        Marque marque1 = new Marque();
        marque1.setId(1L);
        Marque marque2 = new Marque();
        marque2.setId(marque1.getId());
        assertThat(marque1).isEqualTo(marque2);
        marque2.setId(2L);
        assertThat(marque1).isNotEqualTo(marque2);
        marque1.setId(null);
        assertThat(marque1).isNotEqualTo(marque2);
    }
}
