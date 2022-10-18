package onde.there.comment.repository;

import java.util.List;
import onde.there.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findAllByPlaceId(Long placeId);
}
