# Projekt: [Ditt Projektnamn]

Detta projekt består av ett **frontend (React/Vite)** och ett **backend (Node.js + Express)** med PostgreSQL som databas. Projektet deployas till **Azure Static Web Apps** för frontend och **Azure Container Apps** för backend.  

## Branch-struktur

- `main`  
  - Produktionsbranch.  
  - CI/CD för **frontend** och **backend** mot produktion.  
  - Säkerhetsscanning: **Snyk**, **CodeQL**.  
  - Docker images pushas till ACR (Azure Container Registry).  

- `develop`  
  - Utvecklingsbranch för integration och staging.  
  - CI/CD deployar frontend och backend till **staging/dev-miljöer**.  
  - Docker images byggs och pushas till ACR.  

- `feature/*`  
  - Feature-brancher för pågående utveckling.  
  - CI/CD för testning och bygg av både frontend och backend.  
  - Deploy till **preview environments** på Azure Static Web Apps (frontend).  

## CI/CD Pipelines

### Frontend

- Byggs med Node.js 22 och npm.  
- Lint och test körs (om script finns).  
- Byggs till `dist`-mappen.  
- Deploy: Azure Static Web Apps (Staging för develop, Production för main).  

### Backend

- Node.js 20.  
- Lint, tester och build körs (om script finns).  
- Docker-image byggs och pushas till ACR.  
- Deploy: Azure Container App (DEV för develop, PROD för main).  
- Node-moduler cacheas för snabbare pipeliner.  

### Säkerhet

- **Snyk**: skannar `frontend` och `server` för sårbarheter.  
- **CodeQL**: analyserar projektet (JavaScript/TypeScript) mot main-branch.  

### Övrigt

- Docker Build & Push: Bygger och pushar backend och frontend images till Docker Hub.  
- Pull requests mot `develop` och `feature/*` branches trigger CI/CD för test och staging.  

## Secrets som behövs i GitHub Actions

- `AZURE_STATIC_WEB_APPS_API_TOKEN`  
- `AZURE_CREDENTIALS`  
- `ACR_USERNAME`  
- `ACR_PASSWORD`  
- `DOCKER_USERNAME`  
- `DOCKER_PASSWORD`  
- `SNYK_TOKEN`  
- PostgreSQL secrets: `PGHOST`, `PGUSER`, `PGPORT`, `PGDATABASE`, `PGPASSWORD`  

## Lokalt

### Frontend

```bash
cd frontend
npm install
npm run dev
