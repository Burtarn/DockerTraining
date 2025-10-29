# Projekt: Docker & Azure, CI/CD.

Detta projekt består av ett **frontend (React/Vite)** och ett **backend (Node.js + Express)** med PostgreSQL som databas. Projektet deployas till **Azure Static Web Apps** för frontend och **Azure Container Apps** för backend.  

## Branch-struktur

- `main`  
  - Produktionsbranch.  
  - CI/CD för **frontend** och **backend** mot produktion.  
  - Säkerhetsscanning: **Snyk**, **CodeQL**.  
  - Docker images pushas till ACR (Azure Container Registry).  
  - Swagger-dokumentation genereras automatiskt vid push och kopieras till frontend.

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
- Swagger-dokumentation genereras automatiskt med `npm run generate-docs`.  
- Swagger JSON kopieras till `frontend/public/swagger.json` för frontend åtkomst.  
- Docker-image byggs och pushas till ACR.  
- Deploy: Azure Container App (DEV för develop, PROD för main).  
- Node-moduler cacheas för snabbare pipeliner.  

### Loggning och övervakning (Azure)

- Backend och databas loggas via **Azure Log Analytics**.  
- Varningsregler:
  - HTTP Server Errors: skickar notifiering vid >0 5xx-svar på 1 minut.  
  - Resursövervakning: ex. minnesanvändning > 100MB triggar notifiering.  
- Aviseringsregler kopplade till **Åtgärdsgrupp** skickar e-post eller push till Azure-mobilappen.  

### Säkerhet

- **Snyk**: skannar `frontend` och `server` för sårbarheter.  
- **CodeQL**: analyserar projektet (JavaScript/TypeScript) mot main-branch.  

### Övrigt

- Docker Build & Push: Bygger och pushar backend och frontend images till Docker Hub.  
- Pull requests mot `develop` och `feature/*` branches trigger CI/CD för test och staging.  
- Swagger-dokumentation kan visas på `/api/docs` i backend och är tillgänglig för frontend.  

## Secrets som behövs i GitHub Actions

- `AZURE_STATIC_WEB_APPS_API_TOKEN`  
- `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`  
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

### Backend
cd server
npm install
npm run dev       # startar backend
npm run generate-docs  # genererar swagger.json



