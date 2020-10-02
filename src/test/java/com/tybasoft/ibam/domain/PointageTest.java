package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class PointageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pointage.class);
        Pointage pointage1 = new Pointage();
        pointage1.setId(1L);
        Pointage pointage2 = new Pointage();
        pointage2.setId(pointage1.getId());
        assertThat(pointage1).isEqualTo(pointage2);
        pointage2.setId(2L);
        assertThat(pointage1).isNotEqualTo(pointage2);
        pointage1.setId(null);
        assertThat(pointage1).isNotEqualTo(pointage2);
    }
}
