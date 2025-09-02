package wendorff.cloudyMeter.Service;

import org.springframework.stereotype.Service;

@Service
public class AlertSchedulerService {

    // @Autowired
    // private AlertRepository alertRepository;

    // @Autowired
    // private TelegramService telegramService;

    // // Executa a cada 60 segundos
    // @Scheduled(fixedRate = 60000)
    // public void checkAndSendAlerts() {
    //     List<Alert> alerts = alertRepository.findAll(); // Filtre conforme sua lógica!
    //     for (Alert alert : alerts) {
    //         telegramService.sendMessage("Novo alerta: " + alert.getMessage());
    //         // Marque como enviado ou remova para não enviar de novo!
    //     }
    // }
}