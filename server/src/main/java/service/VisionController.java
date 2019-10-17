///*
// * Copyright 2019 Google Inc.
// *
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// * http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// *
// * Modifications copyright (C) 2019 Dubhacks Reciper
// */
//
//package main;
//
//import com.google.cloud.vision.v1.AnnotateImageResponse;
//import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
//import com.google.cloud.vision.v1.EntityAnnotation;
//import com.google.cloud.vision.v1.Feature.Type;
//
//import java.awt.image.BufferedImage;
//import java.io.ByteArrayInputStream;
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.LinkedHashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import com.google.cloud.vision.v1.LocalizedObjectAnnotation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.ResourceLoader;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.ModelAndView;
//import org.apache.commons.codec.binary.Base64;
//import org.springframework.core.io.InputStreamResource;
//
//import javax.imageio.ImageIO;
//
///**
// * Code sample demonstrating Cloud Vision usage within the context of Spring Framework using
// * Spring Cloud GCP libraries. The sample is written as a Spring Boot application to demonstrate
// * a practical application of this usage.
// */
//@RestController
//public class VisionController {
//
//    @Autowired
//    private ResourceLoader resourceLoader;
//
//    // [START spring_vision_autowire]
//    @Autowired
//    private CloudVisionTemplate cloudVisionTemplate;
//    // [END spring_vision_autowire]
//
//    /**
//     * This method downloads an image from a URL and sends its contents
//     * to the Vision API for label detection.
//     *
//     * @param imageBase64 the URL of the image
//     * @param map the model map to use
//     * @return a string with the list of labels and percentage of certainty
//     */
//    @GetMapping("/extractLabels")
//    public ModelAndView extractLabels(String imageBase64, ModelMap map) {
//        byte[] imageBytes = Base64.decodeBase64(imageBase64);
//        InputStream is = null;
//        try {
//            BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
//            ByteArrayOutputStream os = new ByteArrayOutputStream();
//            ImageIO.write(img, "gif", os);
//            is = new ByteArrayInputStream(os.toByteArray());
//        } catch (IOException e) {
//            e.printStackTrace();
//            throw new IllegalStateException();
//        }
//        //[START spring_vision_image_labelling]
//        AnnotateImageResponse response = this.cloudVisionTemplate.analyzeImage(
//                new InputStreamResource(is), Type.OBJECT_LOCALIZATION);
//        List<LocalizedObjectAnnotation> responses = response.getLocalizedObjectAnnotationsList();
//
//        // Display the results
//        for (LocalizedObjectAnnotation entity : responses) {
//            out.format("Object name: %s\n", entity.getName());
//            out.format("Confidence: %s\n", entity.getScore());
//            out.format("Normalized Vertices:\n");
//            entity
//                    .getBoundingPoly()
//                    .getNormalizedVerticesList()
//                    .forEach(vertex -> out.format("- (%s, %s)\n", vertex.getX(), vertex.getY()));
//        }
////        Map<String, Float> imageLabels =
////                response.getLabelAnnotationsList()
////                        .stream()
////                        .collect(
////                                Collectors.toMap(
////                                        EntityAnnotation::getDescription,
////                                        EntityAnnotation::getScore,
////                                        (u, v) -> {
////                                            throw new IllegalStateException(String.format("Duplicate key %s", u));
////                                        },
////                                        LinkedHashMap::new));
//        //[END spring_vision_image_labelling]
//
//        map.addAttribute("annotations", imageLabels);
////        map.addAttribute("imageUrl", );
//
//        return new ModelAndView("result", map);
//    }
//}
