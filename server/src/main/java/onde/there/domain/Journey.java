package onde.there.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "journey")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "journey_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "title")
    private String title;

    @Column(name = "start_day")
    private LocalDate startDate;

    @Column(name = "end_day")
    private LocalDate endDate;

    @Column(name = "place_thumbnail_url")
    private String placeThumbnailUrl;

    @Column(name = "disclosure")
    private String disclosure;

    @Column(name = "introduction_Text")
    private String introductionText;

    @Column(name = "number_of_people")
    private int numberOfPeople;

}
