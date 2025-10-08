#!/bin/bash

# Script para configurar swap en un VPS de AWS Linux
# Esto ayuda a manejar picos de memoria durante el build

echo "Configurando espacio de swap para el VPS..."

# Verificar si ya existe swap
if grep -q "SwapTotal" /proc/meminfo && [ $(grep SwapTotal /proc/meminfo | awk '{print $2}') -gt 0 ]; then
    echo "Ya existe espacio de swap configurado:"
    free -h
    exit 0
fi

# Crear archivo de swap de 2GB
echo "Creando archivo de swap de 2GB..."
sudo fallocate -l 2G /swapfile

# Establecer permisos correctos
echo "Estableciendo permisos..."
sudo chmod 600 /swapfile

# Formatear como swap
echo "Formateando como swap..."
sudo mkswap /swapfile

# Activar swap
echo "Activando swap..."
sudo swapon /swapfile

# Hacer permanente el cambio
echo "Haciendo permanente el cambio..."
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Configurar parámetros de swap
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
echo 'vm.vfs_cache_pressure=50' | sudo tee -a /etc/sysctl.conf

# Mostrar estado actual
echo "Configuración completada. Estado actual:"
free -h
echo ""
echo "Uso de swap:"
swapon --show

echo ""
echo "El espacio de swap está configurado. Ahora intenta ejecutar:"
echo "npm run build"
echo ""
echo "Si aún tienes problemas, usa:"
echo "npm run build:low-memory"