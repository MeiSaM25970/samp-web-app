import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const checkToken = (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return { success: false, error: "Authorization header is missing" };
  }

  // استخراج توکن از هدر
  const token = authHeader.split(" ")[1]; // فرض بر این است که هدر به شکل "Bearer <token>" است
  if (!token) {
    return { success: false, error: "Token is missing" };
  }
  console.log({ token });
  // اعتبارسنجی توکن
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return { success: false, error: "Invalid or expired token" };
    }
    return { success: true, data: decoded };
  } catch {
    return { success: false, error: "Invalid or expired token" };
  }
};
