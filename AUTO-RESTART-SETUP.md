# Configuración de Reinicio Automático para Zionary Prime Launch

Este documento describe cómo configurar un sistema robusto de reinicio automático para la aplicación Zionary Prime Launch utilizando PM2 y scripts personalizados de monitoreo.

## 🎯 Objetivo

Configurar un sistema que:
- Reinicie automáticamente la aplicación si falle
- Monitoree el uso de memoria y CPU
- Implemente health checks periódicos
- Guarde logs detallados para debugging
- Se inicie automáticamente con el sistema operativo

## 📋 Requisitos Previos

- Sistema Linux (Ubuntu/Debian/CentOS/RHEL)
- Acceso root o sudo
- Node.js instalado (versión LTS recomendada)
- La aplicación ya desplegada en el servidor

## 🚀 Instalación Automática

### 1. Ejecutar el script de instalación

```bash
chmod +x scripts/setup-auto-restart.sh
sudo ./scripts/setup-auto-restart.sh
```

Este script instalará automáticamente:
- Dependencias del sistema
- Node.js (si no está instalado)
- PM2 globalmente
- Usuario专门 para la aplicación
- Servicio systemd
- Configuración de logs
- Reglas de firewall

### 2. Desplegar la aplicación

```bash
# Copiar archivos de la aplicación
sudo cp -r . /var/www/zionary-prime-launch/
sudo chown -R nodeuser:nodeuser /var/www/zionary-prime-launch

# Cambiar al directorio de la aplicación
cd /var/www/zionary-prime-launch

# Instalar dependencias y construir
sudo -u nodeuser npm install --production
sudo -u nodeuser npm run build
```

### 3. Iniciar la aplicación con PM2

```bash
# Iniciar la aplicación
sudo -u nodeuser npm run start

# Iniciar el monitoreo automático
sudo -u nodeuser npm run monitor
```

## 📁 Arquitectura del Sistema

### Componentes Principales

1. **PM2** - Process Manager para Node.js
2. **ecosystem.config.js** - Configuración de PM2
3. **auto-restart.sh** - Script de monitoreo avanzado
4. **pm2-zionary.service** - Servicio systemd
5. **setup-auto-restart.sh** - Script de instalación

### Flujo de Monitoreo

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Sistema       │    │   PM2            │    │   Aplicación    │
│   systemd       │───▶│   Process        │───▶│   React/Vite    │
│                 │    │   Manager        │    │   App           │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Reinicio      │    │   Reinicio       │    │   Health        │
│   del sistema   │    │   automático     │    │   Checks        │
│                 │    │   en fallos      │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │   Script de      │
                    │   Monitoreo      │
                    │   auto-restart   │
                    │   .sh            │
                    └──────────────────┘
```

## ⚙️ Configuración Detallada

### PM2 Ecosystem Config

El archivo [`ecosystem.config.cjs`](ecosystem.config.cjs) contiene:

- **Autorestart**: Reinicio automático en fallos
- **Memory limit**: 1GB máximo antes de reiniciar
- **Max restarts**: Máximo 10 intentos de reinicio
- **Environment**: Variables de entorno para producción
- **Logging**: Configuración de logs separados

### Script de Monitoreo

El script [`scripts/auto-restart.sh`](scripts/auto-restart.sh) implementa:

- **Health Checks**: Verificación HTTP cada 30 segundos
- **Memory Monitoring**: Alerta si uso > 900MB
- **CPU Monitoring**: Alerta si uso > 80%
- **Smart Restart**: Reinicio con limpieza de caché si hay fallos repetidos
- **Logging**: Registro detallado de todas las acciones

### Servicio Systemd

El archivo [`systemd/pm2-zionary.service`](systemd/pm2-zionary.service) proporciona:

- **Inicio automático** con el sistema
- **Reinicio automático** del servicio PM2
- **Limites de recursos** (2GB RAM, 100% CPU)
- **Seguridad** con sandboxing

## 🛠️ Comandos Útiles

### Gestión de PM2

```bash
# Iniciar aplicación
npm run start

# Detener aplicación
npm run stop

# Reiniciar aplicación
npm run restart

# Ver estado
npm run status

# Ver logs en tiempo real
npm run logs

# Monitoreo interactivo
npm run monit

# Eliminar proceso de PM2
npm run delete
```

### Gestión del Monitoreo

```bash
# Iniciar monitoreo automático
npm run monitor

# Detener monitoreo
npm run monitor:stop

# Reiniciar monitoreo
npm run monitor:restart
```

### Logs y Diagnóstico

```bash
# Ver logs de PM2
pm2 logs zionary-prime-launch

# Ver logs del monitoreo
tail -f logs/monitor.log

# Ver logs de errores
tail -f logs/err.log

# Ver logs combinados
tail -f logs/combined.log
```

## 📊 Métricas y Alertas

### Umbrales Configurados

| Métrica | Umbral | Acción |
|---------|--------|--------|
| Memoria | 900MB | Reinicio automático |
| CPU | 80% | Alerta y espera |
| Health Check | Falla HTTP | Reinicio inmediato |
| Reinicios | 10 intentos | Detener y notificar |

### Logs Generados

- `logs/monitor.log` - Actividad del monitoreo
- `logs/err.log` - Errores de la aplicación
- `logs/out.log` - Salida estándar
- `logs/combined.log` - Logs combinados de PM2

## 🔧 Personalización

### Cambiar Umbrales

Edita [`scripts/auto-restart.sh`](scripts/auto-restart.sh):

```bash
MEMORY_THRESHOLD=90  # Porcentaje de uso de memoria
CPU_THRESHOLD=80     # Porcentaje de uso de CPU
MAX_RESTART_ATTEMPTS=5
RESTART_DELAY=10
```

### Cambiar Puerto

Edita [`ecosystem.config.js`](ecosystem.config.js):

```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3000  // Cambiar aquí
}
```

### Configurar Notificaciones

Puedes agregar notificaciones por email o Slack en el script de monitoreo:

```bash
send_alert() {
  # Agregar aquí tu lógica de notificación
  curl -X POST -H 'Content-type: application/json' \
    --data '{"text":"Aplicación Zionary necesita atención"}' \
    YOUR_SLACK_WEBHOOK_URL
}
```

## 🚨 Solución de Problemas

### Aplicación no inicia

```bash
# Verificar estado de PM2
pm2 status

# Ver logs de errores
pm2 logs zionary-prime-launch --err

# Verificar configuración
pm2 show zionary-prime-launch
```

### Monitoreo no funciona

```bash
# Verificar permisos del script
ls -la scripts/auto-restart.sh

# Ejecutar manualmente para debugging
./scripts/auto-restart.sh monitor

# Ver logs del monitoreo
tail -f logs/monitor.log
```

### Problemas de memoria

```bash
# Ver uso de memoria actual
pm2 monit

# Limpiar caché de Node.js
npm cache clean --force

# Reiniciar con limpieza
pm2 restart zionary-prime-launch
```

## 🔄 Mantenimiento

### Actualización de la Aplicación

```bash
# 1. Actualizar código
git pull origin main

# 2. Actualizar dependencias
npm install

# 3. Reconstruir
npm run build

# 4. Reiniciar PM2
pm2 restart zionary-prime-launch
```

### Limpieza de Logs

Los logs se rotan automáticamente cada día y se conservan por 7 días. Para limpiar manualmente:

```bash
# Limpiar logs antiguos
find logs/ -name "*.log" -mtime +7 -delete

# Limpiar logs de PM2
pm2 flush
```

## 📈 Monitoreo Avanzado

Para monitoreo más avanzado, considera integrar:

- **PM2 Plus**: https://app.keymetrics.io/
- **Grafana + Prometheus**: Métricas detalladas
- **Sentry**: Error tracking
- **Uptime monitoring**: Pingdom, UptimeRobot

## 🆘 Soporte

Si encounteras problemas:

1. Revisa los logs detallados en `logs/`
2. Ejecuta el monitoreo en modo foreground para debugging
3. Verifica los recursos del sistema con `free -h` y `df -h`
4. Asegúrate de que el puerto 3000 esté abierto en el firewall

---

**Nota**: Esta configuración está optimizada para VPS con recursos limitados (1-2GB RAM). Para servidores más potentes, puedes ajustar los límites de memoria y CPU según sea necesario.