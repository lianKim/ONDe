package onde.there.member;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void 아이디중복확인_성공_케이스 () throws Exception{

        String content = "{ \"id\": \"test\"}";
        mockMvc.perform(post("/members/check/id")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$['result']").exists())
                .andDo(print());
    }

    @Test
    void 아이디중복확인_실패_케이스_BADREQUEST_바디가없을경우 () throws Exception{
        String content = "";
        mockMvc.perform(post("/members/check/id")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$['errorCode']").value("BAD_REQUEST"))
                .andExpect(jsonPath("$['errorMessage']").exists())
                .andDo(print());
    }

    @Test
    void 아이디중복확인_실패_케이스_BADREQUEST_id값_비어있는_경우 () throws Exception{
        String content = "{ \"id\": \"\"}";
        mockMvc.perform(post("/members/check/id")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$['errorCode']").value("BAD_REQUEST"))
                .andExpect(jsonPath("$['errorMessage']").exists())
                .andDo(print());
    }
}
