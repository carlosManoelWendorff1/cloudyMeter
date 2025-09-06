package wendorff.cloudyMeter.Bot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@Configuration
public class BotConfig {

    private boolean registered = false;

    @Bean
    public TelegramBotsApi telegramBotsApi(Bot bot) throws Exception {
        TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);

        if (!registered) {
            botsApi.registerBot(bot);
            registered = true;
        }

        return botsApi;
    }
}
