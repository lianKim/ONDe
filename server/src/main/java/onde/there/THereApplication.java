package onde.there;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class THereApplication {

	public static void main(String[] args) {
		SpringApplication.run(THereApplication.class, args);
	}

	
}
