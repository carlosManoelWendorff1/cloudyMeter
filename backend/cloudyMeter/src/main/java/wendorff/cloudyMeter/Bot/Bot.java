package wendorff.cloudyMeter.Bot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Service.OrganizationService;
import wendorff.cloudyMeter.Service.ProvisionService;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.function.BiFunction;

@Component
public class Bot extends TelegramLongPollingBot {

    @Value("${telegram.bot.username}")
    private String botUserName;

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.provision.key}")
    private String provisionKey;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private ProvisionService provisionService;

    private final Map<String, BiFunction<String, String, String>> commands = new HashMap<>();

    public Bot() {
        // registra os comandos
        commands.put("/help", (msg, chatId) -> """
                📋 Comandos disponíveis:
/help - lista de comandos
/register - registrar uma organização
/provision - provisionar um medidor
/info - informações sobre o bot
/whoami - informações sobre o autor
/website - acessar o website do CloudyMeter
                """);

        commands.put("/info", (msg, chatId) -> """
                🤖 Eu sou o *CloudyMeter Bot*!
Sou um assistente para notificar alertas do sistema *Cloudy Meter* (TCC).
O objetivo é facilitar a comunicação e o monitoramento dos eventos do sistema.
                """);

        commands.put("/whoami", (msg, chatId) -> """
                👤 Autor: Carlos Manoel Wendorff
🔗 LinkedIn: www.linkedin.com/in/carlos-manoel-wendorff-66b875228
💻 GitHub do projeto: https://github.com/carlosManoelWendorff1/cloudyMeter
                """);

        commands.put("/website", (msg, chatId) -> """
            🌐 Acesse o website do CloudyMeter:
👉 [Abrir Website](https://seu-dominio-ou-endereco.com)
            """);
    }

    @Override
    public String getBotUsername() {
        return botUserName;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            var mensagem = responder(update);
            try {
                execute(mensagem);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }

    private SendMessage responder(Update update) {
        String originalMessage = update.getMessage().getText().trim();
        String message = originalMessage.toLowerCase(Locale.ROOT);
        String chatId = update.getMessage().getChatId().toString();
        String username = update.getMessage().getFrom().getUserName();

        // primeiro token (o comando mesmo)
        String command = message.split("\\s+")[0];

        String resposta;

        switch (command) {
            case "/register" -> resposta = registerOrganization(originalMessage, chatId, username,provisionKey);
            case "/provision" -> resposta = provisionMeter(originalMessage, chatId);
            default -> {
                var action = commands.get(command);
                resposta = (action != null)
                        ? action.apply(originalMessage, chatId)
                        : "❌ Não entendi!\nDigite /help para ver os comandos disponíveis.";
            }
        }

        return SendMessage.builder()
                .chatId(chatId)
                .text(resposta)
                .parseMode("Markdown")
                .build();
    }

    private String registerOrganization(String message, String chatId, String username, String provisionKey) {
        String[] parts = message.split(" ", 4);
        if (parts.length < 4) {
            return "Uso correto: /register nome senha chaveDeProvisionamento";
        }
        String name = parts[1];
        String pass = parts[2];
        String userProvisionKey = parts[3];

        if(provisionKey == null || provisionKey.isBlank() || !provisionKey.equals(userProvisionKey)) {
            return "❌ Chave de provisionamento inválida.";
        }
        
        Organization org = new Organization();
        org.setName(name);
        org.setChatId(chatId);
        org.setPasswordHash(pass);

        organizationService.save(org);

        return "✅ Organização registrada com sucesso!";
    }

    private String provisionMeter(String message, String chatId) {
        String[] parts = message.split(" ", 3);
        if (parts.length < 3) {
            return "Uso correto: /provision MAC NomeDoMedidor";
        }

        String mac = parts[1];
        String meterName = parts[2];

        Organization org = organizationService.findByChatId(chatId);
        if (org == null) {
            return "⚠️ Organização não encontrada. Registre-se primeiro com /register.";
        }
        provisionService.provisionMeter(mac, org.getId(), meterName);
        return "✅ Medidor provisionado com sucesso!";
    }

    public void notifyOrganization(String chatId, String text) {
        SendMessage message = SendMessage.builder()
                .chatId(chatId)
                .text(text)
                .build();

        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
}
