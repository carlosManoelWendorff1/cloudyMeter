package wendorff.cloudyMeter.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wendorff.cloudyMeter.Bot.Bot;
import wendorff.cloudyMeter.Dto.AlertDTO;
import wendorff.cloudyMeter.Model.Alert;
import wendorff.cloudyMeter.Model.Organization;
import wendorff.cloudyMeter.Repository.AlertRepository;
import wendorff.cloudyMeter.Repository.SensorRepository;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private Bot bot;

    public Alert createAlert(AlertDTO alert) {
        Alert entity = new Alert();
        entity.setMessage(alert.getMessage());
        entity.setSensor(sensorRepository.findById(alert.getSensorId()).orElseThrow());

        Alert saved = alertRepository.save(entity);

        // Pega o chatId do dono da organização
        Organization org = saved.getSensor().getMeter().getOrganization();
        String chatId = org.getChatId();

        // Notifica no Telegram
        try {
            bot.notifyOrganization(chatId,
                "🚨 Novo alerta!\nSensor: " + saved.getSensor().getName() +
                "\nMensagem: " + saved.getMessage());
        } catch (Exception e) {
            // Logue o erro, mas não interrompa o fluxo
            System.err.println("Erro ao notificar no Telegram: " + e.getMessage());
        }

        return saved;
    }
    public List<Alert> findByOrganization(Organization org) {
        return alertRepository.findBySensorMeterOrganization(org);
    }
}