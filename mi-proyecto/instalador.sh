#!/bin/bash

set -e  # Detiene el script si algo falla

# Verifica si Docker está instalado
if ! command -v docker &> /dev/null; then
  echo "Instalando Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
fi

# Verifica si Docker Compose v2 está disponible (docker compose, no docker-compose)
if ! docker compose version &> /dev/null; then
  echo "Instalando Docker Compose v2 (plugin)..."
  sudo apt-get update
  sudo apt-get install -y docker-compose-plugin
fi

# Clona el repositorio solo si no existe
REPO_URL="https://github.com/XxSebasx/prueba-docker"
DIR="app-fullstack"

if [ ! -d "$DIR" ]; then
  git clone "$REPO_URL" "$DIR"
else
  echo "Directorio '$DIR' ya existe. No se vuelve a clonar."
fi

# Entra en la carpeta y levanta los contenedores
cd "$DIR"
sudo docker compose up -d --build

echo "✅ Aplicación desplegada correctamente. Accede a: http://localhost:3000/api/users"
