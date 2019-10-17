package model;
import java.io.FileInputStream;
import java.sql.*;
import java.util.*;


public class Query {
    protected Connection conn;

    public Query() {
    }

    public void openConnection() throws Exception {
        Properties configProps = new Properties();

        String jSQLDriver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        String jSQLUrl = "jdbc:sqlserver://dubhack.database.windows.net;database=dubhack";
        String jSQLUser = "dubhack@dubhack";
        String jSQLPassword = "Password123";

        /* load jdbc drivers */
        Class.forName(jSQLDriver).newInstance();

        /* open connections to the flights database */
        conn = DriverManager.getConnection(jSQLUrl, // database
                jSQLUser, // user
                jSQLPassword); // password

        conn.setAutoCommit(true); //by default automatically commit after each statement
    /* In the full Query class, you will also want to appropriately set the transaction's isolation level:
          conn.setTransactionIsolation(...)
       See Connection class's JavaDoc for details.
    */
    }

    public void closeConnection() throws Exception {
        conn.close();
    }

    public List<FoodEntry> getByIngredient(List<String> foodList) {
        List<FoodEntry> result = new ArrayList<>();
        for (String food : foodList) {
            List<String> incompList = new ArrayList<>();
            getDirect(food, incompList, foodList);
            getByCate(getCategory(food), incompList, foodList);
            if (incompList.size() != 0) {
                result.add(new FoodEntry(food, incompList));
            }
        }
        return result;
    }

    public void getDirect(String food, List<String> result, List<String> recipe) {
        try {
            String categoryStatement = "select name2 from Incompatible as i where i.name1 = ?;";
            PreparedStatement requestCategory = conn.prepareStatement(categoryStatement);
            requestCategory.clearParameters();
            requestCategory.setString(1, food);
            ResultSet foodlist = requestCategory.executeQuery();
            while (foodlist.next()) {
                String name1 = foodlist.getString("name2");
                if (recipe.contains(name1))
                    result.add(name1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void getByCate(String category, List<String> result, List<String> recipe) {
        try {
            String categoryStatement = "select ingredient from IncompatibleCate as i where i.category = ?;";
            PreparedStatement requestCategory = conn.prepareStatement(categoryStatement);
            requestCategory.clearParameters();
            requestCategory.setString(1, category);
            ResultSet foodlist = requestCategory.executeQuery();
            while (foodlist.next()) {
                String name1 = foodlist.getString("name2");
                if (recipe.contains(name1))
                    result.add(name1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public String getCategory(String food) {
        try {
            String categoryStatement = "select catagory from Ingredient as i where i.iname = ?;";
            PreparedStatement requestCategory = conn.prepareStatement(categoryStatement);
            requestCategory.clearParameters();
            requestCategory.setString(1, food);
            ResultSet result = requestCategory.executeQuery();
            if (result.next()) {
                return result.getString("catagory");
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }


}
