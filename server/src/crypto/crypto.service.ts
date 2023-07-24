import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
    private readonly key = crypto.scryptSync('password', 'salt', 32); // Replace 'password' and 'salt' with your own values
    private readonly iv = crypto.randomBytes(16); // Initialization vector

    encrypt(text: string): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return this.iv.toString('hex') + ':' + encrypted;
    }
}
