package onde.there;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableAsync

@SpringBootApplication
public class THereApplication {

	public static void main(String[] args) {
		SpringApplication.run(THereApplication.class, args);
	}

}
