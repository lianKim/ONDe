package onde.there.member.utils;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class RandomUtil {

    public String getRandomPassword() {
        int leftLimit = 97; //'a'
        int rightLimit = 122; // 'z'
        int targetStringLength = 10;
        Random random = new Random(System.currentTimeMillis());

        return random.ints(leftLimit, rightLimit + 1)
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

    }
}
