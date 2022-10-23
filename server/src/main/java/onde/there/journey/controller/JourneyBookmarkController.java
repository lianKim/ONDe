package onde.there.journey.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
public class JourneyBookmarkController {
	private final JourneyBookmarkService journeyBookmarkService;

	@PostMapping
	public ResponseEntity<Void> createBookmark(
		@RequestBody JourneyBookmarkDto.CreateRequest request) {
		journeyBookmarkService.createBookmark(request);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping
	public ResponseEntity<Void> deleteBookmark(Long bookmarkId) {
		journeyBookmarkService.deleteBookmark(bookmarkId);
        return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<List<JourneyBookmarkListResponse>> getBookmarkList(String memberId) {
		return ResponseEntity.ok(journeyBookmarkService.getBookmarkList(memberId));
	}
}
