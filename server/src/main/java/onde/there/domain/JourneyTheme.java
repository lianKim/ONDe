package onde.there.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import onde.there.domain.type.JourneyThemeType;

@Entity(name = "journey_theme")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JourneyTheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "journey_theme_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "journey_id")
    private Journey journey;

    @Enumerated(EnumType.STRING)
    @Column(name = "journey_theme_name")
    private JourneyThemeType journeyThemeName;

}
