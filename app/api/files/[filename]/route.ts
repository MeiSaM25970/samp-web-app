import fs from "fs/promises";
import path from "path";
import mime from "mime";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;

    if (!filename) {
      console.log("Filename is missing");
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(
      process.env.Attachments || "D:/Attachments",
      decodeURIComponent(filename)
    );

    // بررسی وجود فایل و اینکه دایرکتوری نباشد
    let fileStat;
    try {
      fileStat = await fs.stat(filePath);
      if (!fileStat.isFile()) {
        return NextResponse.json(
          { error: "Invalid file path" },
          { status: 400 }
        );
      }
    } catch {
      console.log(`File not found: ${filePath}`);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // خواندن فایل
    const fileBuffer = await fs.readFile(filePath);

    // تعیین نوع MIME بر اساس پسوند فایل
    const mimeType = mime.getType(filePath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Length": fileStat.size.toString(),
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
