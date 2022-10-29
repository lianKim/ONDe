package onde.there.journey.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import onde.there.dto.journy.JourneyBookmarkDto;
import onde.there.dto.journy.JourneyBookmarkDto.JourneyBookmarkListResponse;
import onde.there.journey.service.JourneyBookmarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
public class JourneyBookmarkController {

	private final JourneyBookmarkService journeyBookmarkService;

	@PostMapping
	@Operation(summary = "북마크(찜) 추가", description = "북마크(찜) 추가")
	public ResponseEntity<Void> createBookmark(
		@Parameter(required = true, content = @Content(schema = @Schema(implementation = JourneyBookmarkDto.CreateRequest.class)))
		@RequestBody @Valid JourneyBookmarkDto.CreateRequest request) {
		journeyBookmarkService.createBookmark(request);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping
	@Operation(summary = "북마크(찜) 삭제", description = "북마크(찜) 삭제")
	public ResponseEntity<Void> deleteBookmark(
		@Parameter(description = "북마크의 id", required = true)
		@RequestParam @NotNull Long bookmarkId) {
		journeyBookmarkService.deleteBookmark(bookmarkId);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	@Operation(summary = "해당 멤버의 북마크(찜) 가져오기", description = "북마크(찜) 가져오기")
	@ApiResponses(
		value = {@ApiResponse(
			content = {@Content(
				mediaType = "application/json",
				array = @ArraySchema(schema = @Schema(implementation = JourneyBookmarkDto.JourneyBookmarkListResponse.class)))
			})
		})
	public ResponseEntity<List<JourneyBookmarkListResponse>> getBookmarkList(
		@Parameter(description = "북마크를 가져올 멤버 id", required = true)
		@RequestParam @NotNull String memberId) {
		return ResponseEntity.ok(journeyBookmarkService.getBookmarkList(memberId));
	}
}
