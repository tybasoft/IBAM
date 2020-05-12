package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class BonCommandeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BonCommande.class);
        BonCommande bonCommande1 = new BonCommande();
        bonCommande1.setId(1L);
        BonCommande bonCommande2 = new BonCommande();
        bonCommande2.setId(bonCommande1.getId());
        assertThat(bonCommande1).isEqualTo(bonCommande2);
        bonCommande2.setId(2L);
        assertThat(bonCommande1).isNotEqualTo(bonCommande2);
        bonCommande1.setId(null);
        assertThat(bonCommande1).isNotEqualTo(bonCommande2);
    }
}
