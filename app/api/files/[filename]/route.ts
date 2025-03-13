import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;

    if (!filename) {
      console.log("Filename is missing"); // لاگ برای خطای ابتدایی
      return Response.json({ error: "Filename is required" }, { status: 400 });
    }

    console.log(`Filename: ${filename}`); // لاگ برای چاپ نام فایل

    const filePath = path.join(
      "/Users/meisam/Desktop/Attachments",
      decodeURIComponent(filename)
    );
    console.log(`filePath: ${filePath}`); // لاگ برای چاپ نام فایل

    // بررسی وجود فایل
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`); // لاگ در صورتی که فایل یافت نشود
      return Response.json({ error: "File not found" }, { status: 404 });
    }

    // بررسی اینکه مسیر یک فایل است نه دایرکتوری
    const fileStat = fs.statSync(filePath);
    if (!fileStat.isFile()) {
      console.log(`Path is not a file: ${filePath}`); // لاگ در صورت دایرکتوری بودن
      return Response.json({ error: "Invalid file path" }, { status: 400 });
    }

    // خواندن فایل به‌صورت Buffer
    console.log(`Reading file: ${filePath}`); // لاگ برای نشان دادن مرحله خواندن فایل
    const fileBuffer = await fs.promises.readFile(filePath);

    console.log(`File read successfully: ${filePath}`); // لاگ پس از خواندن فایل

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "image/jpeg", // بسته به نوع فایل تغییر بده
      },
    });
  } catch (error) {
    console.error("Error processing file:", error); // لاگ برای خطاهای غیرمنتظره
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
