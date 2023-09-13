import "dotenv/config";
import { main } from "./app";

const PORT = process.env.PORT || 3000;

main().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
