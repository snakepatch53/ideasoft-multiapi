import { spawn } from 'child_process';

let currentServer = null;

function killAdonisProcesses() {
    console.log('Matando procesos de Adonis existentes...');

    // Usar PowerShell para buscar procesos de Adonis
    const findProcess = spawn(
        'powershell',
        [
            '-Command',
            'Get-Process | Where-Object { $_.ProcessName -eq "node" -and $_.CommandLine -like "*ace serve*" -or $_.CommandLine -like "*adonis*" } | Select-Object -ExpandProperty Id',
        ],
        { stdio: 'pipe' }
    );

    let pids = '';

    findProcess.stdout.on('data', (data) => {
        pids += data.toString();
    });

    return new Promise((resolve) => {
        findProcess.on('close', async (code) => {
            const processIds = pids
                .trim()
                .split('\n')
                .filter((pid) => pid.trim() && !isNaN(pid.trim()));

            if (processIds.length > 0) {
                console.log('Terminando procesos Adonis...');
                for (const pid of processIds) {
                    const cleanPid = pid.trim();
                    if (cleanPid && cleanPid !== process.pid.toString()) {
                        try {
                            const killCmd = spawn('taskkill', ['/F', '/PID', cleanPid], { stdio: 'pipe' });
                            await new Promise((r) => killCmd.on('close', r));
                            console.log(`Proceso ${cleanPid} terminado.`);
                        } catch (err) {
                            console.log(`No se pudo terminar proceso ${cleanPid}`);
                        }
                    }
                }
                console.log('Procesos Adonis terminados.');
            } else {
                console.log('No se encontraron procesos Adonis para terminar.');
            }
            resolve();
        });

        findProcess.on('error', (err) => {
            console.log('Error al buscar procesos:', err.message);
            resolve(); // Continuar aunque falle la búsqueda
        });
    });
}

async function startServer() {
    // Solo matar procesos Adonis específicos, no todos los de Node
    await killAdonisProcesses();

    console.log('Iniciando servidor Adonis...');
    currentServer = spawn('node', ['ace', 'serve', '--hmr'], {
        stdio: 'inherit',
        detached: false,
    });

    currentServer.on('exit', (code, signal) => {
        if (signal) {
            console.log(`Servidor terminado por señal ${signal}. Reiniciando en 3s...`);
        } else if (code !== 0) {
            console.log(`Servidor salió con código ${code}. Reiniciando en 3s...`);
        } else {
            console.log('Servidor se detuvo normalmente.');
        }

        setTimeout(() => {
            startServer();
        }, 3000);
    });

    currentServer.on('error', (err) => {
        console.error('Error al iniciar el servidor:', err);
        setTimeout(() => {
            startServer();
        }, 3000);
    });
}

process.on('SIGINT', async () => {
    console.log('\nRecibida señal de interrupción. Cerrando servidor...');
    if (currentServer) {
        currentServer.kill('SIGTERM');
    }
    await killAdonisProcesses();
    process.exit(0);
});

console.log('Iniciando gestor de desarrollo...');
startServer();
