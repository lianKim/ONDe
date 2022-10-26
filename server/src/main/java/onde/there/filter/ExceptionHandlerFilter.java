package onde.there.filter;

import lombok.extern.slf4j.Slf4j;
import onde.there.member.exception.type.MemberException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request,response);
        } catch (Throwable ex){
            setErrorResponse(response, ex);
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
