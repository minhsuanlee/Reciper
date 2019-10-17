package server;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;

public class Connect {
    public Query q;

    public Connect() throws Exception {
        q = new Query();
        q.openConnection();
    }

    public void closeConnect() throws Exception {
        q.closeConnection();
    }

    public Object getImcomcpatible(String food) {
        List<String> foodList = new ArrayList<String>();
        foodList.add("milk");
        List<FoodEntry> result = q.getByIngredient(foodList);
        for (FoodEntry foodEntry : result) {
            System.out.println("key = " + foodEntry.getTitle());
            for (String value : foodEntry.getData()) {
                System.out.print("value = " + value + " ");
            }
        }

        Gson gson = new Gson();
        return gson.toJson(result);
    }

    public static void main(String[] args) throws Exception {
        Connect c = new Connect();
        c.getImcomcpatible("milk");

        c.closeConnect();
    }
}
