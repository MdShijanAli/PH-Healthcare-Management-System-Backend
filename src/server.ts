import app from "./app";
import { envVers } from "./config/env";

// Start the server

const bootstrap = () => {
  try {
    app.listen(envVers.PORT, () => {
      console.log(`Server is running on http://localhost:${envVers.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

bootstrap();
