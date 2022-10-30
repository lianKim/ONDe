package onde.there.member.security;

import lombok.extern.slf4j.Slf4j;
import onde.there.member.exception.MemberException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class AuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {

    public AuthenticationEntryPoint() {
        super("");
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Throwable exception = (Throwable) request.getAttribute("exception");
        if (exception != null) {
            setErrorResponse(response, exception);
        }
    }

    public void setErrorResponse(HttpServletResponse response, Throwable ex){
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        if (ex instanceof MemberException) {
            MemberException exception = (MemberException) ex;
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            response.setContentType("application/json");
            try {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("errorCode", exception.getMemberErrorCode().toString());
                jsonObject.put("errorMessage", exception.getMemberErrorCode().getDescription());
                response.getWriter().write(jsonObject.toString());
            } catch (IOException e) {
                log.error("ExceptionHandlerFilter JsonProcessingException => {}", e.getMessage());
            }
        }
    }
}
