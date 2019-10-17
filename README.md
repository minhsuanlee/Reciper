# Reciper
### 2019 UW DubHacks Project

An Incompatible Ingredients Detection Recipe Mobile Application

Core Features:
 - Build-in phone camera access to make taking photos of the ingredients much easier
 - Ability to identify food ingredients from the uploaded photos
 - Capability of displaying as well as modifying the ingredients
 - Ability to provide helpful feedback on whether any of the ingredients are incompatible with each others, i.e. cooking them together may cause allergic reactions or food poisoning
 - Once the ingredients are compatible with each other, recipes that include some or all the given ingredients will be provided

Core Technologies:
 - Object detection as well object recognition via **Google Vision API**
 - User friendly mobile application interface with **React-Native** on top of **Expo** platform
 - Connection to self-deployed micro server using **Spring Boot** from Spring Framework
 - Data about incompatible food ingredients are stored on **Microsoft Azure** and are accessed via optimized **SQL** queries
