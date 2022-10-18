package onde.there.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "regional_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegionalCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "regional_category_id")
	private long id;

	@ManyToOne
	@JoinColumn(name = "journey_id")
	private Journey journey;

	@Column(name = "area")
	private String area;

	@Column(name = "region")
	private String region;

}
