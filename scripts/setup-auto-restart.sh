#!/bin/bash

# Script de instalación y configuración para el sistema de reinicio automático
# Zionary Prime Launch - Configuración de PM2 con reinicio automático

set -e

# Colores para salida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_success() {
    print_message $GREEN "✅ $1"
}

print_warning() {
    print_message $YELLOW "⚠️  $1"
}

print_error() {
    print_message $RED "❌ $1"
}

print_info() {
    print_message $BLUE "ℹ️  $1"
}

# Verificar si se ejecuta como root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_error "Este script debe ejecutarse como root o con sudo"
        exit 1
    fi
}

# Verificar sistema operativo
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$NAME
        VER=$VERSION_ID
    else
        print_error "No se pudo detectar el sistema operativo"
        exit 1
    fi
    print_info "Sistema operativo detectado: $OS $VER"
}

# Instalar dependencias del sistema
install_dependencies() {
    print_info "Instalando dependencias del sistema..."
    
    case $OS in
        "Ubuntu"*|"Debian"*)
            apt-get update
            apt-get install -y curl wget git build-essential
            ;;
        "CentOS"*|"Red Hat"*|"Fedora"*)
            yum update -y
            yum install -y curl wget git gcc-c++ make
            ;;
        *)
            print_error "Sistema operativo no soportado: $OS"
            exit 1
            ;;
    esac
    
    print_success "Dependencias instaladas correctamente"
}

# Instalar Node.js si no está presente
install_nodejs() {
    if ! command -v node &> /dev/null; then
        print_info "Node.js no encontrado. Instalando Node.js LTS..."
        
        case $OS in
            "Ubuntu"*|"Debian"*)
                curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
                apt-get install -y nodejs
                ;;
            "CentOS"*|"Red Hat"*|"Fedora"*)
                curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
                yum install -y nodejs
                ;;
        esac
        
        print_success "Node.js instalado correctamente"
    else
        print_success "Node.js ya está instalado: $(node --version)"
    fi
}

# Instalar PM2 globalmente
install_pm2() {
    if ! command -v pm2 &> /dev/null; then
        print_info "Instalando PM2 globalmente..."
        npm install -g pm2
        print_success "PM2 instalado correctamente"
    else
        print_success "PM2 ya está instalado: $(pm2 --version)"
    fi
}

# Configurar usuario para la aplicación
setup_user() {
    local app_user=${1:-nodeuser}
    
    if ! id "$app_user" &>/dev/null; then
        print_info "Creando usuario: $app_user"
        useradd -r -s /bin/false -d /var/www $app_user
        print_success "Usuario $app_user creado correctamente"
    else
        print_success "Usuario $app_user ya existe"
    fi
    
    # Establecer variables para el servicio systemd
    sed -i "s/NODE_USER/$app_user/g" ../systemd/pm2-zionary.service
}

# Crear directorios necesarios
create_directories() {
    local app_dir="/var/www/zionary-prime-launch"
    local log_dir="$app_dir/logs"
    
    print_info "Creando directorios necesarios..."
    
    mkdir -p $app_dir
    mkdir -p $log_dir
    
    # Asignar permisos
    chown -R nodeuser:nodeuser $app_dir
    chmod -R 755 $app_dir
    
    print_success "Directorios creados y permisos asignados"
}

# Configurar servicio systemd
setup_systemd() {
    print_info "Configurando servicio systemd para PM2..."
    
    # Copiar archivo de servicio
    cp ../systemd/pm2-zionary.service /etc/systemd/system/
    
    # Recargar systemd
    systemctl daemon-reload
    
    # Habilitar servicio para inicio automático
    systemctl enable pm2-zionary.service
    
    print_success "Servicio systemd configurado correctamente"
}

# Configurar PM2 para que guarde procesos
setup_pm2_persistence() {
    print_info "Configurando persistencia de PM2..."
    
    # Iniciar PM2 y guardar lista de procesos actual
    sudo -u nodeuser pm2 save
    
    # Configurar PM2 para启动时 resurrect
    sudo -u nodeuser pm2 startup
    
    print_success "Persistencia de PM2 configurada"
}

# Configurar rotación de logs
setup_log_rotation() {
    print_info "Configurando rotación de logs..."
    
    cat > /etc/logrotate.d/zionary-prime-launch << EOF
/var/www/zionary-prime-launch/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 nodeuser nodeuser
    postrotate
        pm2 reloadLogs
    endscript
}
EOF
    
    print_success "Rotación de logs configurada"
}

# Configurar firewall si está disponible
setup_firewall() {
    if command -v ufw &> /dev/null; then
        print_info "Configurando firewall (ufw)..."
        ufw allow 3000/tcp
        print_success "Firewall configurado para puerto 3000"
    elif command -v firewall-cmd &> /dev/null; then
        print_info "Configurando firewall (firewalld)..."
        firewall-cmd --permanent --add-port=3000/tcp
        firewall-cmd --reload
        print_success "Firewall configurado para puerto 3000"
    else
        print_warning "No se encontró firewall configurado. Asegúrate de abrir el puerto 3000 manualmente."
    fi
}

# Función principal de instalación
main() {
    print_info "Iniciando instalación del sistema de reinicio automático para Zionary Prime Launch"
    
    check_root
    detect_os
    install_dependencies
    install_nodejs
    install_pm2
    setup_user
    create_directories
    setup_systemd
    setup_pm2_persistence
    setup_log_rotation
    setup_firewall
    
    print_success "¡Instalación completada!"
    print_info "Siguientes pasos:"
    echo "1. Copia los archivos de tu aplicación a /var/www/zionary-prime-launch"
    echo "2. Ejecuta 'cd /var/www/zionary-prime-launch'"
    echo "3. Ejecuta 'npm install --production'"
    echo "4. Ejecuta 'npm run build'"
    echo "5. Ejecuta 'npm run start' para iniciar la aplicación con PM2"
    echo "6. Ejecuta 'npm run monitor' para iniciar el monitoreo automático"
    echo ""
    print_info "Comandos útiles:"
    echo "- Ver estado: npm run status"
    echo "- Ver logs: npm run logs"
    echo "- Reiniciar: npm run restart"
    echo "- Monitoreo interactivo: npm run monit"
}

# Ejecutar función principal
main "$@"