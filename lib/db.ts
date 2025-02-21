import sql from "mssql";

const config = {
  user: "Valizade",
  password: "Front@Valizade",
  server: "46.100.55.147", // مثلا: 'localhost' یا '192.168.1.100'
  port: 7454,
  database: "Db_PMO",
  options: {
    encrypt: false, // اگر از Azure استفاده می‌کنی، true بگذار
    trustServerCertificate: true,
  },
};

export async function connectDB() {
  try {
    const db = await sql.connect(config);

    return db;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}
