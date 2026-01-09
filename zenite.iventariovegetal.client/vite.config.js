import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { env } from 'process';

// Configuração dos certificados SSL (padrão do VS)
const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "zenite.iventariovegetal.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7196';

// --- CONFIGURAÇÃO CORRIGIDA ---
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            // ISSO AQUI CONSERTA O ERRO DA TELA BRANCA:
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': { target, secure: false },
            '^/api': { target, secure: false }
        },
        port: 5173,
        https: fs.existsSync(certFilePath) && fs.existsSync(keyFilePath) ? {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        } : undefined
    }
});