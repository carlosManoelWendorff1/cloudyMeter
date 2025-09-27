package wendorff.cloudyMeter.Config;

import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import wendorff.cloudyMeter.Dto.ReadingDTO;
import wendorff.cloudyMeter.Service.ReadingService;

@Configuration
public class MqttConfig {

    private static final String BROKER_URL = "tcp://broker.hivemq.com:1883";
    private static final String TOPIC = "cloudymeter/readings"; // tpico que deseja escutar

    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[] { BROKER_URL });
        options.setCleanSession(true);
        factory.setConnectionOptions(options);
        return factory;
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    @Bean
    public MessageProducer inbound() {
        String clientId = "spring-mqtt-subscriber-" + System.nanoTime();
        MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter(clientId,
                mqttClientFactory(), TOPIC);
        adapter.setCompletionTimeout(20000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler(ReadingService readingService, ObjectMapper objectMapper) {
        return message -> {
            try {
                String payload = (String) message.getPayload();
                System.out.println("📡 Mensagem recebida: " + payload);

                // Converte JSON para DTO
                ReadingDTO dto = objectMapper.readValue(payload, ReadingDTO.class);

                // Persiste no banco
                readingService.save(dto);

                System.out.println("💾 Reading salvo com sucesso!");

            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }

}
