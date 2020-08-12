package com.tybasoft.ibam.config;

import com.tybasoft.ibam.security.*;
import com.tybasoft.ibam.security.jwt.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.filter.CorsFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;

    private final CorsFilter corsFilter;
    private final SecurityProblemSupport problemSupport;

    public SecurityConfiguration(TokenProvider tokenProvider, CorsFilter corsFilter, SecurityProblemSupport problemSupport) {
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.problemSupport = problemSupport;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web
            .ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/app/**/*.{js,html}")
            .antMatchers("/i18n/**")
            .antMatchers("/content/**")
            .antMatchers("/h2-console/**")
            .antMatchers("/swagger-ui/index.html")
            .antMatchers("/test/**");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
            .csrf()
            .disable()
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
                .authenticationEntryPoint(problemSupport)
                .accessDeniedHandler(problemSupport)
        .and()
            .headers()
            .contentSecurityPolicy("default-src 'self'; frame-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://storage.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:")
        .and()
            .referrerPolicy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
        .and()
            .featurePolicy("geolocation 'none'; midi 'none'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; fullscreen 'self'; payment 'none'")
        .and()
            .frameOptions()
            .deny()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/api/authenticate").permitAll()
            .antMatchers("/api/register").permitAll()
            .antMatchers("/api/activate").permitAll()
            .antMatchers("/api/account/reset-password/init").permitAll()
            .antMatchers("/api/account/reset-password/finish").permitAll()
            .antMatchers("/api/**").authenticated()
            .antMatchers("/management/health").permitAll()
            .antMatchers("/management/info").permitAll()
            .antMatchers("/management/prometheus").permitAll()
            .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
            
            .antMatchers("/api/documents/**").hasAnyAuthority(AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/images/**").hasAnyAuthority(AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/entreprises/**").hasAnyAuthority(AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            
            
            //Commun entre les acteurs
            .antMatchers("/api/fournisseurs/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/projets/**").hasAnyAuthority(AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.RESPONSABLEME,AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.RESPONSABLEPROJET,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/familles/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
           .antMatchers("/api/bon-commandes/**").hasAnyAuthority(AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/bon-receptions/**").hasAnyAuthority(AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/employes/**").hasAnyAuthority(AuthoritiesConstants.RESPONSABLEME,AuthoritiesConstants.POINTEUR,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            
            
            //Responsable des employées
            .antMatchers("/api/fonctions/**").hasAnyAuthority(AuthoritiesConstants.RESPONSABLEME,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/paies/**").hasAnyAuthority(AuthoritiesConstants.RESPONSABLEME,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/equipes/**").hasAnyAuthority(AuthoritiesConstants.RESPONSABLEME,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/pointages/**").hasAnyAuthority(AuthoritiesConstants.POINTEUR,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            
            
            //Chef des materiels
            .antMatchers("/api/materiels/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/assurances/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL)
            .antMatchers("/api/centre-maintenances/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
           .antMatchers("/api/marques/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/transfert-materiels**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/type-materiels/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/visite-techniques/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/consommations/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/locations/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/maintenances/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIEL,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            
            
            //Le magasinier
            .antMatchers("/api/stocks/**").hasAnyAuthority(AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/ligne-bon-recs/**").hasAnyAuthority(AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/ligne-bon-coms/**").hasAnyAuthority(AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            
            
            //Responsale de projet
            .antMatchers("/api/horaires/**").hasAnyAuthority(AuthoritiesConstants.RESPONSABLEPROJET,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            
            
            //chef des matériau
            .antMatchers("/api/materiaus/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.MAGASINIER,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/depots/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/tvas/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            .antMatchers("/api/unites/**").hasAnyAuthority(AuthoritiesConstants.CHEFMATERIAU,AuthoritiesConstants.ADMIN,AuthoritiesConstants.USER)
            
        .and()
            .httpBasic()
        .and()
            .apply(securityConfigurerAdapter());
        // @formatter:on
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}
