package onde.there.member.service;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import onde.there.domain.Member;
import onde.there.dto.member.MemberDto;
import onde.there.member.exception.type.MemberErrorCode;
import onde.there.member.exception.type.MemberException;
import onde.there.member.type.TokenType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class JwtService {
    @Value("spring.jwt.secret")
    private String secretKey;

    private static final String BEARER_TYPE = "Bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME =  30 * 60 * 1000L;              // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일

    public MemberDto.SigninResponse generateToken(Authentication authentication) {
        long now = (new Date()).getTime();
        // Access Token 생성
        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);

        String accessToken = "";

        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oAuth2Authentication = (OAuth2AuthenticationToken) authentication;
            accessToken = Jwts.builder()
                    .setSubject(oAuth2Authentication.getPrincipal().getAttribute("email"))
                    .setExpiration(accessTokenExpiresIn)
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        } else if (authentication instanceof UsernamePasswordAuthenticationToken) {
            accessToken = Jwts.builder()
                    .setSubject(authentication.getName())
                    .setExpiration(accessTokenExpiresIn)
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        }

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return MemberDto.SigninResponse.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpirationTime(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);
        Collection<? extends GrantedAuthority> authorities = new HashSet<>();
        UserDetails principal = Member.builder()
                                      .id(claims.getSubject())
                                      .build();
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }


    public void validateToken(String token, TokenType tokenType) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        } catch (MalformedJwtException e) {
            System.out.println("MalformedJwtException");
            switch (tokenType) {
                case ACCESS:
                    throw new MemberException(MemberErrorCode.INVALID_ACCESS_TOKEN);
                case REFRESH:
                    throw new MemberException(MemberErrorCode.INVALID_REFRESH_TOKEN);
            }
        } catch (ExpiredJwtException e) {
            System.out.println("ExpiredJwtException");
            switch (tokenType) {
                case ACCESS:
                    throw new MemberException(MemberErrorCode.EXPIRED_ACCESS_TOKEN);
                case REFRESH:
                    throw new MemberException(MemberErrorCode.EXPIRED_REFRESH_TOKEN);
            }
        } catch (UnsupportedJwtException e) {
            System.out.println("UnsupportedJwtException");
            throw new MemberException(MemberErrorCode.TOKEN_CLAIMS_EMPTY);
        } catch (JwtException e) {
            switch (tokenType) {
                case ACCESS:
                    throw new MemberException(MemberErrorCode.INVALID_ACCESS_TOKEN);
                case REFRESH:
                    throw new MemberException(MemberErrorCode.INVALID_REFRESH_TOKEN);
            }
        }
    }
}
