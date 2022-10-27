package onde.there.journey.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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

	@Operation(summary = "북마크(찜) 추가", description = "북마크(찜) 추가")
	@PostMapping
	public ResponseEntity<Void> createBookmark(
		@Parameter(description = "북마크를 추가할 멤버, 여정 id", required = true) @RequestBody @Valid JourneyBookmarkDto.CreateRequest request) {
		journeyBookmarkService.createBookmark(request);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "북마크(찜) 삭제", description = "북마크(찜) 삭제")
	@DeleteMapping
	public ResponseEntity<Void> deleteBookmark(
		@Parameter(description = "북마크의 id", required = true) @RequestParam @NotNull Long bookmarkId) {
		journeyBookmarkService.deleteBookmark(bookmarkId);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "해당 멤버의 북마크(찜) 가져오기", description = "북마크(찜) 가져오기")
	@GetMapping
	public ResponseEntity<List<JourneyBookmarkListResponse>> getBookmarkList(
		@Parameter(description = "북마크를 가져올 멤버 id", required = true) @RequestParam @NotNull String memberId) {
		return ResponseEntity.ok(journeyBookmarkService.getBookmarkList(memberId));
	}
}
