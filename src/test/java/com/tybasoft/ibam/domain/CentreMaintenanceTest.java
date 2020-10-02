package com.tybasoft.ibam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tybasoft.ibam.web.rest.TestUtil;

public class CentreMaintenanceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CentreMaintenance.class);
        CentreMaintenance centreMaintenance1 = new CentreMaintenance();
        centreMaintenance1.setId(1L);
        CentreMaintenance centreMaintenance2 = new CentreMaintenance();
        centreMaintenance2.setId(centreMaintenance1.getId());
        assertThat(centreMaintenance1).isEqualTo(centreMaintenance2);
        centreMaintenance2.setId(2L);
        assertThat(centreMaintenance1).isNotEqualTo(centreMaintenance2);
        centreMaintenance1.setId(null);
        assertThat(centreMaintenance1).isNotEqualTo(centreMaintenance2);
    }
}
