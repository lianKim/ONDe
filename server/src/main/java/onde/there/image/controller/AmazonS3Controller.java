package onde.there.image.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import onde.there.image.service.AwsS3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
public class AmazonS3Controller {

	private final AwsS3Service awsS3Service;

	@Operation(summary = "Amazon S3에 파일 업로드", description = "Amazon S3에 파일 업로드 ")
	@PostMapping("/add")
	public ResponseEntity<List<String>> uploadFiles(
		@Parameter(description = "Image (여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile) {

		return ResponseEntity.ok(awsS3Service.uploadFiles(multipartFile));
	}

	@Operation(summary = "Amazon S3에 업로드 된 파일을 삭제", description = "Amazon S3에 업로드된 파일 삭제")
	@DeleteMapping("/delete")
	public ResponseEntity<Void> deleteFile(
		@Parameter(description = "삭제할 파일 url", required = true) @RequestParam String fileName) {
		awsS3Service.deleteFile(fileName);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "Amazon S3에 업로드 된 파일을 장소 아이디로 조회", description = "Amazon S3에 업로드 된 파일을 장소 아이디로 조회")
	@GetMapping("/get")
	public ResponseEntity<List<String>> findFile(
		@Parameter(description = "장소 아이디", required = true) @RequestParam Long id) {
		return ResponseEntity.ok(awsS3Service.findImageUrls(id));
	}

	@Operation(summary = "Amazon S3에 업로드 된 파일을 이미지 URL 로 조회", description = "Amazon S3에 업로드 된 파일을 이미지 URL 로 조회")
	@GetMapping("/list")
	public List<ResponseEntity<byte[]>> findFileList(
		@Parameter(description = "List<장소 이미지 url>", required = true) @RequestParam List<String> imageUrls
	) throws IOException {
		return awsS3Service.getImageFiles(imageUrls);
	}
}
