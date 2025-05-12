require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Path = require("path");
const fs = require("fs");
const routes = require("./routes/index");
const db = require("./database");
const { Admin } = require("./models");

// Define server variable in global scope
let server;

// Fungsi untuk menghapus semua file di folder uploads
const clearUploadsFolder = () => {
  try {
    const uploadsDir = Path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
      console.log("Uploads directory does not exist, skipping cleanup");
      return;
    }

    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        console.error("Error reading uploads directory:", err);
        return;
      }

      files.forEach((file) => {
        // Skip .gitkeep file
        if (file === ".gitkeep") return;

        const filePath = Path.join(uploadsDir, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", filePath, err);
            return;
          }
          console.log("Deleted file:", filePath);
        });
      });
    });
  } catch (error) {
    console.error("Error in clearUploadsFolder:", error);
  }
};

const init = async () => {
  // Comment out the line below to prevent clearing uploads folder on server start
  clearUploadsFolder();

  // Initialize MongoDB connection
  try {
    await db.connectToDatabase();
    console.log("Database connection has been established successfully.");

    // Create default admin if not exists
    const bcrypt = require("bcryptjs");
    const adminExists = await Admin.findOne({ email: "admin@example.com" });

    if (!adminExists) {
      await Admin.create({
        id: "admin-001",
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("admin123", 10),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log("Default admin created successfully.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }

  server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
      files: {
        relativeTo: Path.join(__dirname),
      },
      response: {
        emptyStatusCode: 204,
        failAction: 'log',
        modify: true,
        options: {
          allowUnknown: true,
          stripUnknown: true,
          convert: true
        }
      },
      validate: {
        failAction: async (_, __, err) => {
          console.error('Validation error:', err.message);
          throw err;
        }
      }
    },
    debug: {
      request: ['error']
    }
  });

  await server.register(Inert);
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);

  return server;
};

// Initialize the server
init().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
