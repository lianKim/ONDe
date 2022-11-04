package onde.there.member.security.oauth2;

import lombok.RequiredArgsConstructor;
import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.member.repository.MemberRepository;
import onde.there.member.security.jwt.JwtService;
import onde.there.member.utils.RandomUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.HashSet;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User user = (OAuth2User)authentication.getPrincipal();

        Collection<? extends GrantedAuthority> authorities = new HashSet<>();
        OAuth2AuthenticationToken oAuth2AuthenticationToken = new OAuth2AuthenticationToken(user, authorities, googleClientId);
        MemberDto.SigninResponse signinResponse = jwtService.generateToken(oAuth2AuthenticationToken);
        OAuth2User principal = oAuth2AuthenticationToken.getPrincipal();

        String email = oAuth2AuthenticationToken.getPrincipal().getAttribute("email");
        String name = principal.getAttribute("name");
        String profileImageUrl = principal.getAttribute("picture");
        boolean newMember = !memberRepository.existsByEmail(email);

        String url = UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect")
                .queryParam("accessToken", signinResponse.getAccessToken())
                .queryParam("refreshToken", signinResponse.getRefreshToken())
                .queryParam("expirationTime",signinResponse.getRefreshTokenExpirationTime())
                .queryParam("name", name)
                .queryParam("email", email)
                .queryParam("picture", profileImageUrl)
                .queryParam("newMember", newMember)
                .build().encode(StandardCharsets.UTF_8).toUriString();

        getRedirectStrategy().sendRedirect(request, response, url);
    }
}
