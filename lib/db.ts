import sql from "mssql";

const config = {
  user: "Valizade",
  password: "Front@Valizade",
  server: process.env.DB_HOST ||"", // مثلا: 'localhost' یا '192.168.1.100'
  port:parseInt(process.env.DB_PORT) ,
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
