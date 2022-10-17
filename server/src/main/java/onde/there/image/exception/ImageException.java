package onde.there.image.exception;

import onde.there.exception.type.ErrorCode;

public class ImageException extends RuntimeException {
	private ImageErrorCode errorCode;
	private String errorMessage;

	public ImageException(ImageErrorCode errorCode){
		this.errorCode = errorCode;
		this.errorMessage = errorCode.getDescription();
	}
}
