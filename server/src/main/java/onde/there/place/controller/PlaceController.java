package onde.there.place.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.Response;
import onde.there.place.service.PlaceService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceController {

	private final PlaceService placeService;

	@Operation(summary = "Amazon S3에 파일 업로드", description = "Amazon S3에 파일 업로드 ")
	//@PostMapping("/create")
	@PostMapping(value = "/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<PlaceDto.Response> createPlace(
		@Parameter(description = "Image (여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile,
		@Parameter(description = "장소 정보", required = true) @RequestPart @Valid PlaceDto.CreateRequest request) {

		return ResponseEntity.ok(Response.toResponse(placeService.createPlace(multipartFile, request)));
	}

	@GetMapping("/get")
	public ResponseEntity<PlaceDto.Response> getPlace(@RequestParam Long placeId) {
		return ResponseEntity.ok(placeService.getPlace(placeId));
	}

	@GetMapping("/list")
	public ResponseEntity<List<Response>> list(@RequestParam Long journeyId) {
		return ResponseEntity.ok(placeService.list(journeyId));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deletePlace(@RequestParam Long placeId) {
		return ResponseEntity.ok(placeService.delete(placeId));
	}

	@DeleteMapping("/delete-all")
	public ResponseEntity<?> deleteAll(@RequestParam Long journeyId) {
		return ResponseEntity.ok(placeService.deleteAll(journeyId));
	}

	@PutMapping(value = "/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<PlaceDto.Response> updatePlace(
		@RequestPart List<MultipartFile> multipartFile,
		@RequestPart @Valid PlaceDto.UpdateRequest request) {
		return ResponseEntity.ok(placeService.updatePlace(multipartFile, request));
	}
}
