#!/bin/bash

# Script de monitoreo y reinicio automático para Zionary Prime Launch
# Este script monitorea la aplicación y la reinicia si detecta fallos

APP_NAME="zionary-prime-launch"
LOG_DIR="./logs"
PID_FILE="./logs/app.pid"
HEALTH_CHECK_URL="http://localhost:3000"
MAX_RESTART_ATTEMPTS=5
RESTART_DELAY=10
MEMORY_THRESHOLD=90  # Porcentaje de uso de memoria
CPU_THRESHOLD=80     # Porcentaje de uso de CPU

# Crear directorio de logs si no existe
mkdir -p $LOG_DIR

# Función para registrar timestamps en logs
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_DIR/monitor.log"
}

# Función para verificar si la aplicación está respondiendo
health_check() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$HEALTH_CHECK_URL" || echo "000")
    if [ "$response" = "200" ]; then
        return 0
    else
        log_message "Health check failed con código HTTP: $response"
        return 1
    fi
}

# Función para verificar uso de memoria
check_memory() {
    local mem_usage=$(pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .monit.memory" 2>/dev/null || echo "0")
    if [ "$mem_usage" -gt 0 ]; then
        local mem_mb=$((mem_usage / 1024 / 1024))
        log_message "Uso de memoria actual: ${mem_mb}MB"
        
        # Verificar si excede el umbral
        if [ $mem_mb -gt 900 ]; then  # 900MB como umbral de peligro
            log_message "ADVERTENCIA: Uso de memoria crítico: ${mem_mb}MB"
            return 1
        fi
    fi
    return 0
}

# Función para verificar uso de CPU
check_cpu() {
    local cpu_usage=$(pm2 jlist | jq -r ".[] | select(.name==\"$APP_NAME\") | .monit.cpu" 2>/dev/null || echo "0")
    if [ "$cpu_usage" -gt $CPU_THRESHOLD ]; then
        log_message "ADVERTENCIA: Alto uso de CPU: ${cpu_usage}%"
        return 1
    fi
    return 0
}

# Función para reiniciar la aplicación
restart_app() {
    local attempt=${1:-1}
    
    if [ $attempt -gt $MAX_RESTART_ATTEMPTS ]; then
        log_message "ERROR: Se alcanzó el máximo número de intentos de reinicio ($MAX_RESTART_ATTEMPTS)"
        # Enviar notificación de alerta (opcional)
        # send_alert "La aplicación no pudo ser reiniciada después de $MAX_RESTART_ATTEMPTS intentos"
        exit 1
    fi
    
    log_message "Intento de reinicio #$attempt para $APP_NAME"
    
    # Detener la aplicación
    pm2 stop $APP_NAME
    
    # Esperar antes de reiniciar
    sleep $RESTART_DELAY
    
    # Limpiar caché de Node.js si es necesario
    if [ $attempt -gt 2 ]; then
        log_message "Limpiando caché de Node.js..."
        npm cache clean --force
    fi
    
    # Reiniciar la aplicación
    pm2 restart $APP_NAME
    
    # Esperar y verificar si el reinicio fue exitoso
    sleep 30
    
    if health_check && check_memory; then
        log_message "Aplicación reiniciada exitosamente en el intento #$attempt"
        return 0
    else
        log_message "Fallo en el reinicio #$attempt, reintentando..."
        restart_app $((attempt + 1))
    fi
}

# Función principal de monitoreo
monitor() {
    log_message "Iniciando monitoreo de $APP_NAME"
    
    while true; do
        # Verificar si el proceso está corriendo con PM2
        if ! pm2 list | grep -q "$APP_NAME.*online"; then
            log_message "Aplicación no está corriendo, iniciando reinicio..."
            restart_app
        else
            # Verificaciones de salud si está corriendo
            if ! health_check; then
                log_message "Health check falló, iniciando reinicio..."
                restart_app
            elif ! check_memory; then
                log_message "Uso de memoria crítico detectado, iniciando reinicio..."
                restart_app
            elif ! check_cpu; then
                log_message "Alto uso de CPU detectado, esperando..."
                sleep 60  # Esperar más tiempo si es solo CPU alta
            fi
        fi
        
        # Esperar antes del siguiente ciclo de monitoreo
        sleep 30
    done
}

# Función para iniciar el monitoreo en segundo plano
start_monitoring() {
    # Verificar si ya hay un proceso de monitoreo corriendo
    if [ -f "$PID_FILE" ]; then
        local old_pid=$(cat "$PID_FILE")
        if kill -0 "$old_pid" 2>/dev/null; then
            log_message "El proceso de monitoreo ya está corriendo con PID: $old_pid"
            exit 1
        else
            rm "$PID_FILE"
        fi
    fi
    
    # Iniciar monitoreo en segundo plano
    monitor &
    echo $! > "$PID_FILE"
    log_message "Proceso de monitoreo iniciado con PID: $!"
}

# Función para detener el monitoreo
stop_monitoring() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        kill "$pid" 2>/dev/null
        rm "$PID_FILE"
        log_message "Proceso de montoreo detenido"
    else
        log_message "No se encontró un proceso de monitoreo activo"
    fi
}

# Manejo de señales
trap 'stop_monitoring; exit 0' SIGTERM SIGINT

# Casos de uso
case "${1:-start}" in
    start)
        start_monitoring
        ;;
    stop)
        stop_monitoring
        ;;
    restart)
        stop_monitoring
        sleep 2
        start_monitoring
        ;;
    monitor)
        monitor
        ;;
    *)
        echo "Uso: $0 {start|stop|restart|monitor}"
        echo "  start   - Inicia el monitoreo en segundo plano"
        echo "  stop    - Detiene el monitoreo"
        echo "  restart - Reinicia el monitoreo"
        echo "  monitor - Inicia el monitoreo en primer plano (para debugging)"
        exit 1
        ;;
esac