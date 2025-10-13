import { exec, spawn } from 'child_process';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();
const PORT = process.env.PORT || process.env.HOST_PORT || 3333;
const DEBUG = process.env.DEBUG === 'true';

let currentServer = null;
let isShuttingDown = false;
let restartCount = 0;
let lastRestartTime = Date.now();

// Colores ANSI para los logs
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
};

// Funciones de log mejoradas con colores y emojis
const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
};

const log = {
    info: (message) => console.log(`${colors.gray}[${getTime()}]${colors.reset} ${colors.cyan}ℹ${colors.reset} ${message}`),
    success: (message) => console.log(`${colors.gray}[${getTime()}]${colors.reset} ${colors.green}✓${colors.reset} ${message}`),
    warning: (message) => console.log(`${colors.gray}[${getTime()}]${colors.reset} ${colors.yellow}⚠${colors.reset} ${message}`),
    error: (message) => console.log(`${colors.gray}[${getTime()}]${colors.reset} ${colors.red}✗${colors.reset} ${message}`),
    server: (message) => console.log(`${colors.gray}[${getTime()}]${colors.reset} ${colors.magenta}🚀${colors.reset} ${message}`),
    clean: (message) => console.log(`${colors.gray}[${getTime()}]${colors.reset} ${colors.blue}🧹${colors.reset} ${message}`),
};

const debugLog = (message) => DEBUG && console.log(`${colors.dim}[DEBUG] ${message}${colors.reset}`);

// Función optimizada para matar procesos rápidamente
async function killServerPort() {
    log.clean(`Limpiando puerto ${colors.yellow}${PORT}${colors.reset}...`);
    // Ejecutar métodos en paralelo para máxima velocidad
    await Promise.all([
        // Método 1: kill-port
        new Promise((resolve) => {
            const killPort = spawn('npx', ['kill-port', PORT.toString()], { stdio: 'pipe', shell: true });
            killPort.on('close', resolve);
            killPort.on('error', resolve);
            setTimeout(resolve, 1500); // Timeout de seguridad
        }),
        // Método 2: Buscar PID y matar con taskkill
        new Promise((resolve) => {
            exec(`netstat -ano | findstr :${PORT} | findstr LISTENING`, (error, stdout) => {
                if (error || !stdout.trim()) return resolve();
                try {
                    const lines = stdout.trim().split('\n');
                    const pids = lines
                        .map((line) => {
                            const parts = line.trim().split(/\s+/);
                            return parts[parts.length - 1];
                        })
                        .filter((pid) => pid && !isNaN(pid));
                    // Matar todos los PIDs encontrados en paralelo
                    if (pids.length > 0) {
                        debugLog(`Terminando ${pids.length} proceso(s): ${pids.join(', ')}`);
                        Promise.all(pids.map((pid) => new Promise((r) => exec(`taskkill /F /T /PID ${pid}`, { shell: true }, () => r())))).then(
                            resolve
                        );
                    } else resolve();
                } catch (e) {
                    resolve();
                }
            });
            setTimeout(resolve, 1500); // Timeout de seguridad
        }),
    ]);
    // Espera mínima para que el sistema libere el puerto
    await new Promise((resolve) => setTimeout(resolve, 100));
    debugLog(`Puerto ${PORT} limpio`);
    return true;
}

async function startServer() {
    if (isShuttingDown) return;
    // Limpiar puerto
    await killServerPort();
    log.server(`Iniciando servidor Adonis en puerto ${colors.yellow}${PORT}${colors.reset}...`);
    try {
        const env = { ...process.env, NODE_NO_CLEAR: '1', FORCE_COLOR: '1', NO_CLEAR: '1', ADONIS_NO_CLEAR: '1' };
        currentServer = spawn('node', ['ace', 'serve', '--hmr', '--no-clear'], { stdio: ['inherit', 'pipe', 'pipe'], detached: false, env: env });
        currentServer.stdout.on('data', (data) => {
            const output = data.toString();
            const filteredOutput = output.replace(/\u001Bc/g, '').replace(/\u001B\[2J\u001B\[0;0H/g, '');
            process.stdout.write(filteredOutput);
            if (output.includes('starting HTTP server') || output.includes('server started'))
                log.success(`Servidor listo en ${colors.green}http://localhost:${PORT}${colors.reset}`);
        });
        currentServer.stderr.on('data', (data) => process.stderr.write(data));
        const now = Date.now();
        if (now - lastRestartTime < 60000) restartCount++;
        else restartCount = 1;
        lastRestartTime = now;
        log.info(`PID: ${colors.cyan}${currentServer.pid}${colors.reset} | Reinicio: ${colors.yellow}#${restartCount}${colors.reset}`);
        currentServer.on('exit', (code, signal) => {
            if (isShuttingDown) return log.info('Servidor cerrado correctamente.');
            // Salto de línea para separar intentos
            console.log('\n');
            if (code !== 0) log.warning(`Servidor terminado con código ${colors.red}${code}${colors.reset}. Reiniciando...`);
            else if (signal) log.warning(`Servidor terminado por señal ${colors.red}${signal}${colors.reset}. Reiniciando...`);
            setTimeout(startServer, 200);
        });
        currentServer.on('error', (err) => {
            log.error(`Error: ${err.message}`);
            if (!isShuttingDown) setTimeout(startServer, 200);
        });
    } catch (error) {
        log.error(`Error crítico: ${error.message}`);
        if (!isShuttingDown) setTimeout(startServer, 1000);
    }
}

async function shutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\n${colors.yellow}⏹${colors.reset}  Cerrando servidor...`);
    try {
        if (currentServer && !currentServer.killed) {
            log.info(`Terminando proceso ${colors.cyan}${currentServer.pid}${colors.reset}...`);
            currentServer.kill('SIGTERM');
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (!currentServer.killed) {
                log.warning('Forzando cierre del servidor...');
                currentServer.kill('SIGKILL');
            }
        }
    } catch (error) {
        log.error(`Error al cerrar: ${error.message}`);
    }
    await killServerPort();
    log.success('Servidor cerrado correctamente. ¡Hasta pronto!');
    process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

process.on('uncaughtException', (err) => {
    log.error(`Excepción no capturada: ${err.message}`);
    if (!isShuttingDown) setTimeout(startServer, 500);
});

console.log(`\n${colors.bright}${colors.magenta}╔═══════════════════════════════════════════════╗${colors.reset}`);
console.log(
    `${colors.bright}${colors.magenta}║${colors.reset}  🚀 ${colors.bright}Servidor de Desarrollo Adonis${colors.reset}        ${colors.bright}${colors.magenta}║${colors.reset}`
);
console.log(`${colors.bright}${colors.magenta}╚═══════════════════════════════════════════════╝${colors.reset}\n`);
log.info(`Puerto configurado: ${colors.yellow}${PORT}${colors.reset}`);
log.info(`Modo debug: ${DEBUG ? colors.green + 'Activado' : colors.gray + 'Desactivado'}${colors.reset}`);
log.server('Iniciando gestor de reinicio automático...\n');
startServer();
