package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class AffectationsMaterielsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AffectationsMateriels.class);
        AffectationsMateriels affectationsMateriels1 = new AffectationsMateriels();
        affectationsMateriels1.setId(1L);
        AffectationsMateriels affectationsMateriels2 = new AffectationsMateriels();
        affectationsMateriels2.setId(affectationsMateriels1.getId());
        assertThat(affectationsMateriels1).isEqualTo(affectationsMateriels2);
        affectationsMateriels2.setId(2L);
        assertThat(affectationsMateriels1).isNotEqualTo(affectationsMateriels2);
        affectationsMateriels1.setId(null);
        assertThat(affectationsMateriels1).isNotEqualTo(affectationsMateriels2);
    }
}
