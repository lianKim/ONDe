package onde.there.journey.controller;

import lombok.RequiredArgsConstructor;
import onde.there.domain.Journey;
import onde.there.dto.journy.JourneyDto;
import onde.there.dto.journy.JourneyDto.DetailResponse;
import onde.there.dto.journy.JourneyDto.JourneyListResponse;
import onde.there.dto.journy.JourneySearchTheme;
import onde.there.journey.service.JourneyService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/journey")
public class JourneyController {

	private final JourneyService journeyService;

	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<?> createJourney(
		@RequestPart @Valid JourneyDto.CreateRequest request,
		@RequestPart MultipartFile thumbnail) {

		return ResponseEntity.ok(journeyService.createJourney(request, thumbnail));
	}

	@GetMapping("/detail")
	public ResponseEntity<DetailResponse> getJourneyDetail(
		@RequestParam Long journeyId
	) {

		return ResponseEntity.ok(journeyService.journeyDetail(journeyId));
	}

	@GetMapping("/list")
	public ResponseEntity<List<JourneyListResponse>> getJourneyList() {

		return ResponseEntity.ok(journeyService.list());
	}

	@GetMapping("/mylist")
	public ResponseEntity<List<JourneyListResponse>> getMyJourneyList(
		@RequestParam String memberId) {

		return ResponseEntity.ok(journeyService.myList(memberId));
	}

	@PostMapping("/filteredlist")
	public ResponseEntity<List<Journey>> getFilteredList(
		@RequestBody JourneySearchTheme journeySearchTheme) {

		return ResponseEntity.ok(
			journeyService.filteredList(journeySearchTheme));
	}

}
