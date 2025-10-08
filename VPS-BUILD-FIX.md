# Solución para error de JavaScript heap out of memory en VPS AWS

## Problema
El error `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory` ocurre cuando el proceso de build de Vite consume más memoria de la disponible en el VPS.

## Causas identificadas
1. Memoria RAM insuficiente en el VPS (probablemente 1GB o menos)
2. Proyecto con muchas dependencias (50+ dependencias de Radix UI)
3. Configuración de Node.js con límite de memoria predeterminado
4. Falta de espacio de swap configurado

## Soluciones implementadas

### 1. Aumentar límite de memoria de Node.js
Se han modificado los scripts en `package.json`:
- `npm run build`: Usa 2GB de memoria máxima
- `npm run build:low-memory`: Usa 1GB de memoria máxima (para VPS con recursos muy limitados)

### 2. Optimizar configuración de Vite
Se ha optimizado `vite.config.ts` con:
- Separación de dependencias en chunks más pequeños
- Configuración específica para entornos con memoria limitada
- Optimización de dependencias

### 3. Configurar espacio de swap
Se ha creado el script `setup-swap.sh` para configurar 2GB de swap.

## Pasos para resolver en el VPS

### Opción 1: Solución completa (recomendada)

1. **Configurar swap en el VPS:**
   ```bash
   chmod +x setup-swap.sh
   ./setup-swap.sh
   ```

2. **Limpiar caché de npm:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Ejecutar el build con memoria aumentada:**
   ```bash
   npm run build
   ```

### Opción 2: Solución rápida (si no tienes permisos de sudo)

1. **Limpiar caché e instalar:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Ejecutar con memoria limitada:**
   ```bash
   npm run build:low-memory
   ```

### Opción 3: Si aún falla

1. **Reiniciar servicios en el VPS:**
   ```bash
   sudo systemctl restart nginx  # si usas nginx
   sudo free -h                  # verificar memoria disponible
   ```

2. **Ejecutar build con logs detallados:**
   ```bash
   npm run build -- --mode production --debug
   ```

## Verificación

Después de aplicar las soluciones:

1. **Verificar memoria disponible:**
   ```bash
   free -h
   ```

2. **Verificar uso de swap:**
   ```bash
   swapon --show
   ```

3. **Verificar que el build se completó:**
   ```bash
   ls -la dist/
   ```

## Prevención

Para evitar futuros problemas:
1. Considera actualizar a un VPS con más RAM (2GB+)
2. Configura swap permanentemente usando el script proporcionado
3. Monitorea el uso de memoria durante los builds

## Notas adicionales

- Las configuraciones aplicadas son específicas para entornos con recursos limitados
- El script `setup-swap.sh` es compatible con la mayoría de distribuciones Linux de AWS
- Si usas una instancia t2.micro o similar, la Opción 1 es altamente recomendada