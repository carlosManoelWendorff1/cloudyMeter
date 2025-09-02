package wendorff.cloudyMeter.Bot;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Service.OrganizationService;

@Component
public class Bot extends TelegramLongPollingBot {

private static final String BOT_USER_NAME = "CWCloudyBot";
private static final String BOT_TOKEN = "8352407039:AAFgSq8EFGBhsoBSfW9bD78jOkcdn26VGqQ";

    @Autowired
    private OrganizationService organizationService;


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
        var textoMensagem = update.getMessage().getText();
        var chatId = update.getMessage().getChatId().toString();
        var username = update.getMessage().getFrom().getUserName();

        var resposta = "";

        if ("data".equalsIgnoreCase(textoMensagem)) {
            resposta = getData();
        } else if (textoMensagem.toLowerCase().startsWith("hora")) {
            resposta = getHora();
        } else if (textoMensagem.toLowerCase().startsWith("ola") || textoMensagem.toLowerCase().startsWith("olá") || textoMensagem.toLowerCase().startsWith("oi")) {
            resposta = "\uD83E\uDD16 Olá, vejo que você entende muito sobre BOTS!";
        } else if (textoMensagem.toLowerCase().startsWith("quem é você") || textoMensagem.toLowerCase().startsWith("quem e voce")) {
            resposta = "\uD83E\uDD16 Eu sou um bot";
        } else if (textoMensagem.toLowerCase().startsWith("/register")) {
            resposta = registrarOrganization(textoMensagem,chatId,username);
        } else if (textoMensagem.toLowerCase().startsWith("/help")) {
            resposta = "Utilize um dos comandos:\n/register nome telefone senha\nolá\ndata\nhora\nquem é você?";
        } else {
            resposta = "Não entendi!\nDigite /help para ver os comandos disponíveis.";
        }

        return SendMessage.builder()
                .text(resposta)
                .chatId(chatId)
                .build();
    }

     private String registrarOrganization(String textoMensagem, String chatId, String username) {
       String[] partes = textoMensagem.split(" ", 3);
        if (partes.length < 3) {
            return "Uso correto: /register nome telefone senha";
        }
        String nome = partes[1];
        String senha = partes[2];

        Organization org = new Organization();
        org.setName(nome);
        org.setTelephone(chatId);
        org.setPasswordHash(senha);

        organizationService.save(org);

        return "Organização registrada com sucesso!";
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

    private String getData() {
        var formatter = new SimpleDateFormat("dd/MM/yyyy");
        return "A data atual é: " + formatter.format(new Date());
    }

    private String getHora() {
        var formatter = new SimpleDateFormat("HH:mm:ss");
        return "A hora atual é: " + formatter.format(new Date());
    }

}