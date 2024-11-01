import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export async function encryptText(textToEncrypt: string) {
    const iv = randomBytes(16);
    const password = process.env.EMAIL_ENCRYPTION_SECRET;

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
        cipher.update(textToEncrypt),
        cipher.final(),
    ]);

    return {
        encryptedText: encryptedText.toString(),
        iv: iv.toString()
    };
}

export async function  decryptText(textToDecrypt: Buffer) {
    const password = process.env.EMAIL_ENCRYPTION_SECRET;
    const iv = randomBytes(16);

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
        decipher.update(textToDecrypt),
        decipher.final(),
    ]);
    return decryptedText;
}