# Disparo WhatsApp via ZPro (com Proxy Backend)

## 📦 Como subir o projeto

### 1. Clonar o projeto
```bash
git clone https://github.com/guihrst/disparo.git
cd disparo
```

---

### 2. Build e envio para o Docker Hub

```bash
# FRONTEND
docker build -t guihorst/whatsapp-envio-zpro:latest .

# BACKEND PROXY
cd backend
docker build -t guihorst/whatsapp-envio-zpro-proxy:latest .

# PUSH
docker push guihorst/whatsapp-envio-zpro:latest
docker push guihorst/whatsapp-envio-zpro-proxy:latest
```

---

### 3. Deploy no Portainer (via Stack)

Use este docker-compose.yml:

```yaml
version: '3'
services:
  web:
    image: guihorst/whatsapp-envio-zpro:latest
    ports:
      - "8081:80"

  proxy:
    image: guihorst/whatsapp-envio-zpro-proxy:latest
    ports:
      - "3002:3000"
```

---

Acesse:

- http://SEU_IP:8081 → Frontend
- http://SEU_IP:3002 → Proxy (API interna usada pelo front)
