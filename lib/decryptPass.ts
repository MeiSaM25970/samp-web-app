import { createCipheriv, createDecipheriv, pbkdf2Sync } from "crypto";

const EncryptionKey = "ShahrokhVazifedan@Jahad-Tossee.Com";
const saltKey = "Ivan Medvedev";

export const Encrypt = (encryptString: string): string => {
  // Salt equivalent to C# byte array: [0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76]
  const salt = Buffer.from(saltKey, "utf8");

  // Generate key and IV using PBKDF2 (equivalent to Rfc2898DeriveBytes in C#)
  const keyIV = pbkdf2Sync(
    EncryptionKey,
    salt,
    1000, // iterations (default in C# Rfc2898DeriveBytes)
    32 + 16, // key (32 bytes) + IV (16 bytes)
    "sha1" // default for Rfc2898DeriveBytes
  );

  const key = keyIV.subarray(0, 32);
  const iv = keyIV.subarray(32, 32 + 16);

  // Convert string to UTF-16 LE buffer (equivalent to Encoding.Unicode in C#)
  const clearBytes = Buffer.from(encryptString, "utf16le");

  // Create AES cipher
  const cipher = createCipheriv("aes-256-cbc", key, iv);

  // Encrypt and convert to Base64
  const encrypted = Buffer.concat([cipher.update(clearBytes), cipher.final()]);

  return encrypted.toString("base64");
};
export const Decrypt = (encryptedString: string): string => {
  // Same salt as encryption
  const salt = Buffer.from(saltKey, "utf8");

  // Generate same key/IV pair
  const keyIV = pbkdf2Sync(EncryptionKey, salt, 1000, 32 + 16, "sha1");

  const key = keyIV.subarray(0, 32);
  const iv = keyIV.subarray(32, 32 + 16);

  // Convert Base64 to Buffer
  const encryptedBytes = Buffer.from(encryptedString, "base64");

  // Create AES decipher
  const decipher = createDecipheriv("aes-256-cbc", key, iv);

  // Decrypt and convert from UTF-16 LE
  const decrypted = Buffer.concat([
    decipher.update(encryptedBytes),
    decipher.final(),
  ]);

  return decrypted.toString("utf16le");
};
