package onde.there.place.controller;

import lombok.RequiredArgsConstructor;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.Response;
import onde.there.place.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceController {

	private final PlaceService placeService;

	@GetMapping("/get")
	public ResponseEntity<PlaceDto.Response> getPlace(@RequestParam Long placeId) {
		return ResponseEntity.ok(Response.of(placeService.getPlace(placeId)));
	}
}
