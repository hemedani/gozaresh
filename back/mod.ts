import { runServer, coreApp } from "./deps.ts";

// Import schemas
import { setSchemas } from "./src/mod.ts";

// Import models
import { setModels } from "./src/mod.ts";

// Import functions/acts
import { setFunctions } from "./src/mod.ts";

// Environment variables
const ENV = Deno.env.get("ENV") || "development";
const APP_PORT = Number(Deno.env.get("APP_PORT")) || 1405;
const MONGO_URI = Deno.env.get("MONGO_URI") || "mongodb://127.0.0.1:27017/";

// Initialize the application
const init = async () => {
  // Set database connection
  coreApp.odm.setDb(MONGO_URI, "gozarish");

  // Setup schemas
  setSchemas();

  // Setup models
  setModels();

  // Setup functions/acts
  setFunctions();

  // Start server
  await runServer({
    port: APP_PORT,
    coreApp,
    playground: true,
    staticPath: "./uploads",
    cors: {
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "token"],
    },
  });

  console.log(`🚀 Gozarish Backend running on port ${APP_PORT}`);
  console.log(`📊 Environment: ${ENV}`);
  console.log(`🎮 Playground: http://localhost:${APP_PORT}/playground`);
};

init();
