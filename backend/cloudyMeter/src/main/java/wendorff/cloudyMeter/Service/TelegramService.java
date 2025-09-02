package wendorff.cloudyMeter.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TelegramService {
    private final String BOT_TOKEN = "8352407039:AAFgSq8EFGBhsoBSfW9bD78jOkcdn26VGqQ";
    private final String CHAT_ID = "SEU_CHAT_ID";

    public void sendMessage(String message) {
        String url = String.format(
            "https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s",
            BOT_TOKEN, CHAT_ID, message.replace(" ", "%20")
        );
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getForObject(url, String.class);
    }
}