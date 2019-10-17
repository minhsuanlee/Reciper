package service;

import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class Config {

    @Bean
    public CloudVisionTemplate cloudVisionTemplate() throws IOException {
        return new CloudVisionTemplate(ImageAnnotatorClient.create());
    }
}
