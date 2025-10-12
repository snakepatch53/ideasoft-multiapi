import env from '#start/env';
import { BaseCommand, flags } from '@adonisjs/core/ace';
import { spawn } from 'node:child_process';

export default class MigrationProd extends BaseCommand {
    static commandName = 'migration:prod';
    static description = 'Ejecutar migraciones en base de datos de producción';

    @flags.boolean({ description: 'Fresh + seed Migrations' })
    declare fresh: boolean;

    async run() {
        try {
            // Determinar acción basada en flag
            const action = this.fresh ? 'reset + migrate' : 'migraciones';
            // Siempre pedir confirmación para producción
            const shouldContinue = await this.prompt.confirm(`¿Confirmas ejecutar ${action} en la base de datos de PRODUCCIÓN?`);
            if (!shouldContinue) return this.logger.info('Operación cancelada');
            this.logger.info('🔄 Ejecutando migraciones con credenciales de producción...');
            // Crear variables de entorno para el subproceso
            const prodEnv = {
                ...process.env,
                DB_PORT: env.get('PROD_DB_PORT'),
                DB_HOST: env.get('PROD_DB_HOST'),
                DB_USER: env.get('PROD_DB_USER'),
                DB_PASS: env.get('PROD_DB_PASS'),
                DB_NAME: env.get('PROD_DB_NAME'),
            };
            this.logger.info(`Conectando a: ${prodEnv.DB_HOST}`);
            this.logger.info(`Base de datos: ${prodEnv.DB_NAME}`);
            this.logger.info(`Usuario: ${prodEnv.DB_USER}`);
            // Determinar comandos a ejecutar
            const commands = this.fresh ? [['node', 'ace', 'migration:fresh', '--seed']] : [['node', 'ace', 'migration:run']];
            // Ejecutar comandos secuencialmente
            for (const [nodeCmd, ...args] of commands) {
                this.logger.info(`🔄 Ejecutando: ${args.join(' ')}`);
                await new Promise((resolve, reject) => {
                    const child = spawn(nodeCmd, args, { env: prodEnv, stdio: 'inherit', cwd: process.cwd() });
                    child.on('close', (code) =>
                        code === 0 ? resolve(code) : reject(new Error(`El comando ${args.join(' ')} terminó con código de salida ${code}`))
                    );
                    child.on('error', (error) => reject(error));
                });
            }
            this.logger.success('✅ Proceso completado exitosamente');
        } catch (error: any) {
            this.logger.error('❌ Error crítico:');
            this.logger.error(error.message);
            this.exitCode = 1;
        }
    }
}
