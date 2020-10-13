package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class LigneBonSortieTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneBonSortie.class);
        LigneBonSortie ligneBonSortie1 = new LigneBonSortie();
        ligneBonSortie1.setId(1L);
        LigneBonSortie ligneBonSortie2 = new LigneBonSortie();
        ligneBonSortie2.setId(ligneBonSortie1.getId());
        assertThat(ligneBonSortie1).isEqualTo(ligneBonSortie2);
        ligneBonSortie2.setId(2L);
        assertThat(ligneBonSortie1).isNotEqualTo(ligneBonSortie2);
        ligneBonSortie1.setId(null);
        assertThat(ligneBonSortie1).isNotEqualTo(ligneBonSortie2);
    }
}
