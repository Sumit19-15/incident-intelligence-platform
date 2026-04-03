import server from "./src/app.js";
import "dotenv/config";
import connectDatabase from "./src/config/db.js";

const PORT = process.env.PORT;

connectDatabase();

server.listen(PORT, () => {
  console.log("Server is running on the port:", PORT);
});
