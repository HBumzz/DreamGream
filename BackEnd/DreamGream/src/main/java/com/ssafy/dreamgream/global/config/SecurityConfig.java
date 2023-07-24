package com.ssafy.dreamgream.global.config;

import com.ssafy.dreamgream.global.config.oauth.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                // JWT+Redis 사용할 것이므로 Session 기반의 인증 사용하지 않음
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 권한 설정
                .and()
                .authorizeHttpRequests()
                .antMatchers("/**").permitAll() //테스트를 위해 모든 요청에 대해 허용해둠
//                .antMatchers("/swagger-ui/**", "/auth/**", "/**", "/api/members/**").permitAll()
//                .antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
//                .anyRequest().authenticated()

                .and()
                .formLogin().disable();
//                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http
                .oauth2Login() // OAuth2 로그인 설정 시작점
                .userInfoEndpoint() // OAuth2 로그인 성공 후 사용자 정보를 가져올 때 설정 담당
                .userService(customOAuth2UserService); // OAuth2 로그인 성공 시, 후작업을 진행할 구현체 등록

        return http.build();
    }


    // CORS 허용
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
