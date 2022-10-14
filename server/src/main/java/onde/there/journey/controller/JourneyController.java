package onde.there.journey.controller;

import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import onde.there.dto.journy.CreateJourney;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/journey")
public class JourneyController {

	@PostMapping("/create")
	public ResponseEntity<?> createJourney(
		@RequestBody @Valid CreateJourney.Request request) {

		return null;
	}

}
