export function uint8ArrayToBase64(uint8Array: Buffer) {
  let binaryString = "";
  if (!uint8Array || !uint8Array.length) return "";
  uint8Array.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  return Buffer.from(binaryString, "binary").toString("base64");
}

export function detectMimeType(uint8Array: Buffer) {
  if (!uint8Array || !uint8Array.length) return "";
  const signature = uint8Array.subarray(0, 8); // بررسی ۸ بایت اول
  const signatures = {
    "image/jpeg": [[0xff, 0xd8, 0xff]],
    "image/png": [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    "image/gif": [[0x47, 0x49, 0x46, 0x38]], // GIF8
    "image/webp": [
      [0x52, 0x49, 0x46, 0x46], // RIFF
      [0x57, 0x45, 0x42, 0x50], // WEBP
    ],
  };

  for (const [mimeType, patterns] of Object.entries(signatures)) {
    for (const pattern of patterns) {
      if (pattern.every((byte, index) => signature[index] === byte)) {
        return mimeType;
      }
    }
  }

  return "application/octet-stream"; // نوع ناشناخته
}
