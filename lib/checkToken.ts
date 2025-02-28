import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const checkToken = (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return { success: false, error: "Authorization header is missing" };
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return { success: false, error: "Token is missing" };
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return { success: false, error: "Invalid or expired token" };
    }
    const encodeToken = jwt.decode(token);
    return { success: true, data: encodeToken };
  } catch {
    return { success: false, error: "Invalid or expired token" };
  }
};
