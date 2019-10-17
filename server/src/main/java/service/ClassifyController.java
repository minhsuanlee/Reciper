package service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import com.google.cloud.vision.v1.*;
import model.*;
import java.util.*;

import com.google.gson.Gson;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.*;


@RestController
public class ClassifyController {

//    private static final String template = "Hello, %s!";
//    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private ResourceLoader resourceLoader;

    private CloudVisionTemplate cloudVisionTemplate;

    @Autowired
    public ClassifyController(CloudVisionTemplate template) {
        cloudVisionTemplate = template;
    }

    @RequestMapping("/classify")
    public List<String> classify(@RequestParam(value="imgData") String data) throws IOException {
        ArrayList<String> arrayList = detect(data, cloudVisionTemplate);
        String json = new Gson().toJson(arrayList);
        // compare with db, remove non-existing items

        //return arrayList;
        System.out.println(arrayList);
        return new ArrayList<String>(){{add("milk"); add("banana");}};
    }

    @RequestMapping("/classify2")
    public List<String> classify2(@RequestParam(value="imgData") String data) throws IOException {
        ArrayList<String> arrayList = detect2(data, cloudVisionTemplate);
        String json = new Gson().toJson(arrayList);
        // compare with db, remove non-existing items

        //return arrayList;
        System.out.println(arrayList);
        return arrayList;
    }

    @RequestMapping("/list")
    public String getIncompFood(@RequestParam(value="data") String data) {
        

        // generate incompatible food list
	List<String> foodlist = new ArrayList<String>();
	String[] templist = data.split(",");
        System.out.println(Arrays.toString(templist));
	for (String food : templist) {
		foodlist.add(food);
	}

	Object jsonObject= null;
        try {
	    
            Connect c = new Connect();
            jsonObject = c.getImcomcpatible(foodlist);

        } catch (Exception e) {
            e.printStackTrace();
        }
        // return json

        System.out.println((String) jsonObject);
        return (String)jsonObject;
    }

    @GetMapping("/msg")
    public String test() {
        return "Hellooooooooooooo";
    }

    public ArrayList<String> detect(String data, CloudVisionTemplate cloudVisionTemplate) {
        byte[] imageBytes = Base64.decodeBase64(data);
        InputStream is = new ByteArrayInputStream(imageBytes);

        AnnotateImageResponse response = cloudVisionTemplate.analyzeImage(
                new InputStreamResource(is), Feature.Type.OBJECT_LOCALIZATION);
        List<LocalizedObjectAnnotation> responses = response.getLocalizedObjectAnnotationsList();
//        AnnotateImageResponse response = cloudVisionTemplate.analyzeImage(
//                , Feature.Type.LABEL_DETECTION);
//        List<EntityAnnotation> responses = response.getLabelAnnotationsList();


        // Return the results
        ArrayList<String> r = new ArrayList<>();
        for (LocalizedObjectAnnotation entity : responses) {
            String name = entity.getName();
            r.add(name);
        }
        return r;
    }

    public ArrayList<String> detect2(String data, CloudVisionTemplate cloudVisionTemplate) throws IOException {
        byte[] imageBytes = Base64.decodeBase64(data);
        System.out.println(Arrays.toString(imageBytes));
        Image img = Image.parseFrom(new ByteArrayInputStream(imageBytes));


        List<AnnotateImageRequest> requests = new ArrayList<>();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder()
                        .addFeatures(Feature.newBuilder().setType(Feature.Type.OBJECT_LOCALIZATION))
                        .setImage(img)
                        .build();
        requests.add(request);

        ArrayList<String> r = new ArrayList<>();
        // Perform the request
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();
            client.close();
            // Display the results
            for (AnnotateImageResponse res : responses) {
                for (LocalizedObjectAnnotation entity : res.getLocalizedObjectAnnotationsList()) {
                    r.add(entity.getName());
                }
            }
        }
        return r;
    }
}
