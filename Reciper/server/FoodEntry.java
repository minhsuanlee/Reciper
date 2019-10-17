package server;

import java.util.List;

public class FoodEntry {
    public String title;
    public List<String> data;

    public FoodEntry(String title, List<String> data) {
        this.title = title;
        this.data = data;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getData() {
        return data;
    }
}
