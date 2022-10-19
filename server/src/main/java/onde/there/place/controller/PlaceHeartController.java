package onde.there.place.controller;

import lombok.RequiredArgsConstructor;
import onde.there.place.service.PlaceHeartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place-heart")
public class PlaceHeartController {

	private final PlaceHeartService placeHeartService;

	@PostMapping("/heart")
	public ResponseEntity<?> heart(@RequestParam Long placeId,
		@RequestParam String memberId) {

		return ResponseEntity.status(HttpStatus.CREATED)
			.body(placeHeartService.heart(placeId, memberId));
	}
}
