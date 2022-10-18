package onde.there.domain;

import lombok.*;
import onde.there.dto.member.MemberDto;

import javax.persistence.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member {
    @Id
    @Column(name = "member_id")
    private String id;
    private String email;
    private String password;
    private String name;

    public static Member from(MemberDto.SignupRequest request, String encodedPassword) {
        Member member = new Member();
        member.id = request.getId();
        member.email = request.getEmail();
        member.name = request.getName();
        member.password = encodedPassword;
        return member;
    }
}
