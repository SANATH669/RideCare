import fs from 'fs';
import path from 'path';

// Load .env file and set environment variables
const envPath = path.resolve(process.cwd(), '.env');

const envContent = fs.readFileSync(envPath, 'utf-8');

// Remove BOM and split into lines
const cleanContent = envContent.replace(/^\uFEFF/, '');
const envLines = cleanContent.split(/\r?\n/);

envLines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed && !trimmed.startsWith('#')) {
        const equalIndex = trimmed.indexOf('=');
        if (equalIndex > 0) {
            // Extract key and value
            let key = trimmed.substring(0, equalIndex).trim();
            const value = trimmed.substring(equalIndex + 1).trim().replace(/^["']|["']$/g, '');

            // Remove BOM from key if present (handles cases where BOM is in the middle)
            key = key.replace(/\uFEFF/g, '');

            if (key && value) {
                process.env[key] = value;
            }
        }
    }
});

console.log('Environment variables loaded successfully');
console.log('- DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('- PORT:', process.env.PORT ? 'SET' : 'NOT SET');
