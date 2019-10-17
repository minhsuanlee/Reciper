//package service;
//
//import com.google.cloud.vision.v1.AnnotateImageResponse;
//import com.google.cloud.vision.v1.Feature;
//import com.google.cloud.vision.v1.LocalizedObjectAnnotation;
//import org.apache.commons.codec.binary.Base64;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
//import org.springframework.core.io.InputStreamResource;
//
//import java.io.ByteArrayInputStream;
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.List;
//
//
//public class ItemDetector {
//
//
//    public static ArrayList<String> detect(String data, CloudVisionTemplate cloudVisionTemplate) {
//        byte[] imageBytes = Base64.decodeBase64(data);
//        //            BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
////            ByteArrayOutputStream os = new ByteArrayOutputStream();
////            ImageIO.write(img, "jpg", os);
////            is = new ByteArrayInputStream(os.toByteArray());
//        InputStream is = new ByteArrayInputStream(imageBytes);
//
//        AnnotateImageResponse response = cloudVisionTemplate.analyzeImage(
//                new InputStreamResource(is), Feature.Type.OBJECT_LOCALIZATION);
//        List<LocalizedObjectAnnotation> responses = response.getLocalizedObjectAnnotationsList();
//
//        // Return the results
//        ArrayList<String> r = new ArrayList<>();
//        for (LocalizedObjectAnnotation entity : responses) {
//            String name = entity.getName();
//            r.add(name);
////            out.format("Object name: %s\n", entity.getName());
////            out.format("Confidence: %s\n", entity.getScore());
////            out.format("Normalized Vertices:\n");
////            entity
////                    .getBoundingPoly()
////                    .getNormalizedVerticesList()
////                    .forEach(vertex -> out.format("- (%s, %s)\n", vertex.getX(), vertex.getY()));
//        }
//        return r;
//    }
//}
