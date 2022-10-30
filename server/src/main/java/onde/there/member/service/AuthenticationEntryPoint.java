package onde.there.member.service;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {



    public AuthenticationEntryPoint() {
        super("");
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        System.out.println("인증 엔트리 포인트");
        System.out.println(authException);
        response.sendError(401, "Unauthorized");
    }
}
