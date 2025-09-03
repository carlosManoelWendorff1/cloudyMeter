package wendorff.cloudyMeter.Bot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Service.OrganizationService;
import wendorff.cloudyMeter.Service.ProvisionService;

@Component
public class Bot extends TelegramLongPollingBot {

private static final String BOT_USER_NAME = "CWCloudyBot";
private static final String BOT_TOKEN = "8352407039:AAFgSq8EFGBhsoBSfW9bD78jOkcdn26VGqQ";

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private ProvisionService provisionService;


    @Override
    public String getBotUsername() {
        return BOT_USER_NAME;
    }

    @Override
    public String getBotToken() {
        return BOT_TOKEN;
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
        var message = update.getMessage().getText();
        var chatId = update.getMessage().getChatId().toString();
        var username = update.getMessage().getFrom().getUserName();

        var resposta = "";


       
        if (message.toLowerCase().startsWith("/register")) {
            resposta = registerOrganization(message,chatId,username);
        } else if (message.toLowerCase().startsWith("/provision")) {
            resposta = provisionMeter(message,chatId);
        }else if (message.toLowerCase().startsWith("/help")) {
            resposta = "Utilize um dos comandos:\n/register nome telefone senha\nolá\ndata\nhora\nquem é você?";
        } else {
            resposta = "Não entendi!\nDigite /help para ver os comandos disponíveis.";
        }

        return SendMessage.builder()
                .text(resposta)
                .chatId(chatId)
                .build();
    }

     private String registerOrganization(String message, String chatId, String username) {
       String[] parts = message.split(" ", 3);
        if (parts.length < 3) {
            return "Uso correto: /register nome telefone senha";
        }
        String name = parts[1];
        String pass = parts[2];

        Organization org = new Organization();
        org.setName(name);
        org.setChatId(chatId);
        org.setPasswordHash(pass);

        organizationService.save(org);

        return "Organização registrada com sucesso!";
    }

     private String provisionMeter(String message, String chatId) {
       String[] parts = message.split(" ", 4);
        if (parts.length < 3) {
            return "Uso correto: /provision MAC NomeDoMedidor";
        }

        String mac = parts[1];
        String meterName = parts[2];

        Organization org = organizationService.findByChatId(chatId);
        if (org == null) {
            return "Organização não encontrada. Registre-se primeiro com /register.";
        }
        provisionService.provisionMeter(mac, org.getId(),meterName);
        // Aqui você deve adicionar a lógica para provisionar o medidor com o MAC fornecido
        return "Medidor registrado!";
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