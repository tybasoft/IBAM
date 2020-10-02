package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class VisiteTechniqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisiteTechnique.class);
        VisiteTechnique visiteTechnique1 = new VisiteTechnique();
        visiteTechnique1.setId(1L);
        VisiteTechnique visiteTechnique2 = new VisiteTechnique();
        visiteTechnique2.setId(visiteTechnique1.getId());
        assertThat(visiteTechnique1).isEqualTo(visiteTechnique2);
        visiteTechnique2.setId(2L);
        assertThat(visiteTechnique1).isNotEqualTo(visiteTechnique2);
        visiteTechnique1.setId(null);
        assertThat(visiteTechnique1).isNotEqualTo(visiteTechnique2);
    }
}
