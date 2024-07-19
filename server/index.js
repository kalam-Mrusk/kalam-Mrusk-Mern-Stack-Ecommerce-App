import app from "./app.js";
import dbConnect from "./db.js";

const PORT = process.env.PORT || 8800;

// dbConnect();
// app.listen(PORT, () => {
//   console.log("Server connected, PORT:", PORT);
// });
dbConnect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log("Server connected !!, PORT:", PORT);
      });
    } catch (error) {
      console.log("Server Connecting Error !!!");
      throw error;
    }
  })
  .catch((error) => {
    console.log("MONGO Connection Error !!");
    throw error;
  });
