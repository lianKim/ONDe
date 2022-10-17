package onde.there.place.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import onde.there.domain.Place;
import onde.there.dto.place.PlaceDto;
import onde.there.image.service.AwsS3Service;
import onde.there.place.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import onde.there.dto.place.PlaceDto;
import onde.there.dto.place.PlaceDto.Response;
import onde.there.place.service.PlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/place")
public class PlaceController {

	private final PlaceService placeService;
	private final AwsS3Service awsS3Service;

	@Operation(summary = "Amazon S3에 파일 업로드", description = "Amazon S3에 파일 업로드 ")
	@PostMapping
	public ResponseEntity<Place> createPlace(
		@Parameter(description = "Image (여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile,
		@Parameter(description = "장소 정보", required = true) @RequestBody PlaceDto.CreateRequest request){

		List<String> imageUrls = awsS3Service.uploadFiles(multipartFile);
		return ResponseEntity.ok(placeService.createPlace(imageUrls, request));

	@GetMapping("/get")
	public ResponseEntity<PlaceDto.Response> getPlace(@RequestParam Long placeId) {
		return ResponseEntity.ok(Response.toResponse(placeService.getPlace(placeId)));
	}
}
