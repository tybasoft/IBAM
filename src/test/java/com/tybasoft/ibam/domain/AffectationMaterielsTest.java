package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class AffectationMaterielsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AffectationMateriels.class);
        AffectationMateriels affectationMateriels1 = new AffectationMateriels();
        affectationMateriels1.setId(1L);
        AffectationMateriels affectationMateriels2 = new AffectationMateriels();
        affectationMateriels2.setId(affectationMateriels1.getId());
        assertThat(affectationMateriels1).isEqualTo(affectationMateriels2);
        affectationMateriels2.setId(2L);
        assertThat(affectationMateriels1).isNotEqualTo(affectationMateriels2);
        affectationMateriels1.setId(null);
        assertThat(affectationMateriels1).isNotEqualTo(affectationMateriels2);
    }
}
