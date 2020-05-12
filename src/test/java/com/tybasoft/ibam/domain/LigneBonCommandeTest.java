package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class LigneBonCommandeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneBonCommande.class);
        LigneBonCommande ligneBonCommande1 = new LigneBonCommande();
        ligneBonCommande1.setId(1L);
        LigneBonCommande ligneBonCommande2 = new LigneBonCommande();
        ligneBonCommande2.setId(ligneBonCommande1.getId());
        assertThat(ligneBonCommande1).isEqualTo(ligneBonCommande2);
        ligneBonCommande2.setId(2L);
        assertThat(ligneBonCommande1).isNotEqualTo(ligneBonCommande2);
        ligneBonCommande1.setId(null);
        assertThat(ligneBonCommande1).isNotEqualTo(ligneBonCommande2);
    }
}
