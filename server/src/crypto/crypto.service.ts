import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoService {
    key = process.env.CRYPTO_KEY;

    encryptData(data: string): string {
        const cipherText = CryptoJS.AES.encrypt(data, this.key).toString();
        return cipherText;
    }
}
