package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class TransfertMaterielTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransfertMateriel.class);
        TransfertMateriel transfertMateriel1 = new TransfertMateriel();
        transfertMateriel1.setId(1L);
        TransfertMateriel transfertMateriel2 = new TransfertMateriel();
        transfertMateriel2.setId(transfertMateriel1.getId());
        assertThat(transfertMateriel1).isEqualTo(transfertMateriel2);
        transfertMateriel2.setId(2L);
        assertThat(transfertMateriel1).isNotEqualTo(transfertMateriel2);
        transfertMateriel1.setId(null);
        assertThat(transfertMateriel1).isNotEqualTo(transfertMateriel2);
    }
}
