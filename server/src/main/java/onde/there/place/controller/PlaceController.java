package onde.there.place.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
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

	@Operation(summary = "장소 생성", description = "장소 생성, Amazon S3에 파일 업로드, 업로드 된 이미지 url 장소에 저장")
	@PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<PlaceDto.Response> createPlace(
		@Parameter(description = "Image (여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile,
		@Parameter(description = "장소 생성 정보", required = true,
			content = @Content(schema = @Schema(implementation = PlaceDto.CreateRequest.class)))
		@RequestPart @Valid PlaceDto.CreateRequest request) {
		return ResponseEntity.ok(
			Response.toResponse(placeService.createPlace(multipartFile, request)));
	}

	@Operation(summary = "장소 조회", description = "placeId에 해당하는 장소 조회")
	@GetMapping()
	public ResponseEntity<PlaceDto.Response> getPlace(
		@Parameter(description = "장소 아이디", required = true) @RequestParam Long placeId) {
		return ResponseEntity.ok(placeService.getPlace(placeId));
	}

	@Operation(summary = "장소 조회(list)", description = "journeyId 여정에 포함된 모든 장소 조회")
	@GetMapping("/list")
	public ResponseEntity<List<Response>> list(
		@Parameter(description = "여정 아이디", required = true) @RequestParam Long journeyId) {
		return ResponseEntity.ok(placeService.list(journeyId));
	}

	@Operation(summary = "장소 삭제", description = "placeId에 해당하는 장소 삭제")
	@DeleteMapping()
	public ResponseEntity<?> deletePlace(
		@Parameter(description = "장소 아이디", required = true) @RequestParam Long placeId) {
		return ResponseEntity.ok(placeService.delete(placeId));
	}

	@Operation(summary = "여정의 모든 장소 삭제", description = "journeyId에 해당하는 여정에 포함된 모든 장소 삭제")
	@DeleteMapping("/delete-all")
	public ResponseEntity<?> deleteAll(
		@Parameter(description = "여정 아이디", required = true) @RequestParam Long journeyId) {
		return ResponseEntity.ok(placeService.deleteAll(journeyId));
	}

	@Operation(summary = "장소 업데이트", description = "입력한 값으로 장소 내용 수정")
	@PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<PlaceDto.Response> updatePlace(
		@Parameter(description = "Image (여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile,
		@Parameter(description = "장소 업데이트 정보", required = true,
			content = @Content(schema = @Schema(implementation = PlaceDto.UpdateRequest.class)))
		@RequestPart @Valid PlaceDto.UpdateRequest request) {
		return ResponseEntity.ok(placeService.updatePlace(multipartFile, request));
	}
}
