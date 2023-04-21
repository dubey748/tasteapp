const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://dubey748:taste@cluster0.asczlhk.mongodb.net/taste?retryWrites=true&w=majority";
const connectToMongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async (err, res) => {
      if (err) console.log(err);
      else {
        console.log("Connected to MongoDB");
        const fetchedData = await mongoose.connection.db.collection(
          "food_items"
        );
        fetchedData.find({}).toArray(async (err, data) => {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray((err, catData) => {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.foodCategory = catData;
            }
          });
        });
      }
    }
  );
};

module.exports = connectToMongoDB;
