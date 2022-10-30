package onde.there.member.security.jwt;


import lombok.extern.slf4j.Slf4j;
import onde.there.member.exception.MemberException;
import onde.there.member.exception.type.MemberErrorCode;
import onde.there.member.type.TokenType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends GenericFilterBean {
    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_TYPE = "Bearer";
    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = resolveToken((HttpServletRequest) request);
        if (token != null) {
            try {
                jwtService.validateToken(token, TokenType.ACCESS);
                Authentication authentication = jwtService.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (MemberException e) {
                String requestURI = ((HttpServletRequest) request).getRequestURI();
                log.error("token resolve Error url => {}", requestURI);
                log.error("token => {}", token);
                log.error("errorcode => {}", e.getMemberErrorCode());
                log.error("errormessage => {}", e.getErrorMessage());
                request.setAttribute("exception", e);
            }
        } else {
            String requestURI = ((HttpServletRequest) request).getRequestURI();
            log.error("token is empty url => {}", requestURI);
            request.setAttribute("exception", new MemberException(MemberErrorCode.AUTHORIZATION_HEADER_NOT_EMPTY));
        }

        chain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
