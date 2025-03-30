// import { NextResponse } from "next/server";
// import { Client } from "basic-ftp";
// import mime from "mime";
// import { Writable } from "stream";

// export async function GET(
//   req: Request,
//   { params }: { params: { filename: string } }
// ) {
//   const client = new Client();
//   client.ftp.verbose = true;

//   try {
//     const { filename } = params;
//     if (!filename) {
//       console.log("Filename is missing");
//       return NextResponse.json(
//         { error: "Filename is required" },
//         { status: 400 }
//       );
//     }
//     // await client.connect("46.100.55.147", 7453);
//     // await client.login("ftpuser", "Ftp@789654123");

//     // await client.access({
//     //   host: process.env.FTP_HOST,
//     //   port: Number(process.env.FTP_PORT),
//     //   user: process.env.FTP_USER,
//     //   password: process.env.FTP_PASS,
//     //   secure: false,
//     // });
//     // const decodeFilePath = decodeURIComponent(filename);
//     // const filePath = `/Attachments/${decodeFilePath}`;
//     // const mimeType = mime.getType(filePath) || "application/octet-stream";
//     // console.log({ decodeFilePath, filePath, mimeType });
//     // let fileBuffer = Buffer.alloc(0);
//     // const writable = new Writable({
//     //   write(chunk, encoding, callback) {
//     //     fileBuffer = Buffer.concat([fileBuffer, chunk]);
//     //     callback();
//     //   },
//     // });

//     // await client.downloadTo(writable, filePath);
//     await client.close();

//     return new NextResponse(undefined, { status: 200 });
//     // return new NextResponse(fileBuffer, {
//     //   headers: {
//     //     "Content-Type": mimeType,
//     //     "Content-Length": fileBuffer.length.toString(),
//     //   },
//     // });
//   } catch (error) {
//     console.error("FTP Error:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve file from FTP" },
//       { status: 200 }
//     );
//   } finally {
//     client.close();
//   }
// }

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
      "192.168.10.8/Attachments",
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
