package onde.there.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsS3Service {

	private final AmazonS3 amazonS3;
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public List<String> uploadFiles(List<MultipartFile> multipartFiles) {
		List<String> fileNameList = new ArrayList<>();
		if (multipartFiles.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Multipart file is empty");
		}
		multipartFiles.forEach(file -> {
			String fileName = createFileName(file.getOriginalFilename());
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentLength(file.getSize());
			objectMetadata.setContentType(file.getContentType());

			try (InputStream inputStream = file.getInputStream()) {
				amazonS3.putObject(
					new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
						.withCannedAcl(CannedAccessControlList.PublicRead));
			} catch (IOException e) {
				throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
					"파일 업로드에 실패했습니다.");
			}

			fileNameList.add(fileName);
		});

		return fileNameList;
	}

	public void deleteFile(String fileName) {
		amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
	}

	private String createFileName(String fileName) {
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}

	private String getFileExtension(String fileName) {
		try {
			String extension = fileName.substring(fileName.lastIndexOf("."));
			if (extension.equals(".png") || extension.equals(".jpg")) {
				return extension;
			}
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
				fileName + " 이미지 형식의 파일이 아닙니다.");
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
				"잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}


	public String findFile(Long id) {
		// TODO: 장소 기능 개발되면 이미지 조회 기능 추가하기
		return "개발 중 입니다";
	}
}
