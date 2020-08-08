package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class FichePointageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FichePointage.class);
        FichePointage fichePointage1 = new FichePointage();
        fichePointage1.setId(1L);
        FichePointage fichePointage2 = new FichePointage();
        fichePointage2.setId(fichePointage1.getId());
        assertThat(fichePointage1).isEqualTo(fichePointage2);
        fichePointage2.setId(2L);
        assertThat(fichePointage1).isNotEqualTo(fichePointage2);
        fichePointage1.setId(null);
        assertThat(fichePointage1).isNotEqualTo(fichePointage2);
    }
}
