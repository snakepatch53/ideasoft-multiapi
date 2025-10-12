import env from '#start/env';
import { BaseCommand } from '@adonisjs/core/ace';
import { NodeSSH } from 'node-ssh';
import fs from 'node:fs';
import path from 'node:path';

export default class StorageProd extends BaseCommand {
    static commandName = 'storage:prod';
    static description = 'Subir archivos de storage hacia producción via SSH';

    async run() {
        try {
            // Configuración consolidada desde variables de entorno
            const config = {
                host: env.get('PROD_SSH_HOST'),
                user: env.get('PROD_SSH_USER'),
                port: Number(env.get('PROD_SSH_PORT', '22')),
                password: env.get('PROD_SSH_PASS'),
                localPath: './storage',
                remotePath: env.get('PROD_SSH_PATH') + '/build/public/storage',
            };

            // Validar configuración requerida
            if (!config.host || !config.user || !config.password)
                return this.logger.error('Faltan variables de entorno: PROD_SSH_HOST, PROD_SSH_USER, PROD_SSH_PASS');
            if (!fs.existsSync(config.localPath)) return this.logger.error(`El directorio local ${config.localPath} no existe`);
            this.logger.info(`🔗 Conectando a: ${config.user}@${config.host}:${config.port}`);
            // Confirmación antes de subir
            const shouldContinue = await this.prompt.confirm(
                `¿Confirmas SUBIR archivos hacia producción? Esto sobreescribirá archivos en el servidor.`
            );
            if (!shouldContinue) return this.logger.info('Operación cancelada');
            this.logger.info('📤 Subiendo archivos hacia producción...');
            const ssh = new NodeSSH();
            // Conectar usando configuración
            await ssh.connect({ host: config.host, username: config.user, password: config.password, port: config.port });
            this.logger.info('✅ Conectado exitosamente');
            // Subir directorio completo
            await ssh.putDirectory(config.localPath, config.remotePath, {
                recursive: true,
                concurrency: 10,
                validate: (itemPath) => {
                    const baseName = path.basename(itemPath);
                    return !baseName.startsWith('.') && baseName !== 'node_modules';
                },
                tick: (localFile, remoteFile, error) => {
                    if (error) this.logger.error(`❌ Error subiendo ${localFile}: ${error.message}`);
                    else this.logger.info(`📁 ${localFile} -> ${remoteFile}`);
                },
            });
            ssh.dispose();
            this.logger.success('✅ Transferencia completada exitosamente');
        } catch (error: any) {
            this.logger.error('❌ Error en la transferencia:');
            this.logger.error(error.message);
            this.exitCode = 1;
        }
    }
}
