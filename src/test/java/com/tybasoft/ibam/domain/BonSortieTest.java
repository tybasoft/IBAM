package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class BonSortieTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BonSortie.class);
        BonSortie bonSortie1 = new BonSortie();
        bonSortie1.setId(1L);
        BonSortie bonSortie2 = new BonSortie();
        bonSortie2.setId(bonSortie1.getId());
        assertThat(bonSortie1).isEqualTo(bonSortie2);
        bonSortie2.setId(2L);
        assertThat(bonSortie1).isNotEqualTo(bonSortie2);
        bonSortie1.setId(null);
        assertThat(bonSortie1).isNotEqualTo(bonSortie2);
    }
}
