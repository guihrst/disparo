# 📦 Sistema de Disparo de Mensagens via ZPro

Este projeto permite enviar mensagens personalizadas pelo WhatsApp usando a API ZPro. Desenvolvido com frontend em HTML/JS e backend em Node.js, com deploy via Docker.

---

## 🚀 Funcionalidades
- Importação de contatos via CSV
- Envio manual com controle de mensagens por segundo
- Configuração de URL e token via localStorage
- Visualização do status de envio
- Backend leve para intermediar requisições

---

## 📁 Estrutura
```
.
├── frontend/
│   ├── index.html
│   ├── config.html
│   └── Dockerfile
├── backend/
│   ├── server.js
│   └── Dockerfile
└── docker-compose.yml
```

---

## 🧑‍💻 Deploy no GitHub

1. Extraia o conteúdo do zip.
2. Acesse o terminal na pasta:
   ```bash
   cd whatsapp-envio-zpro-completo-atualizado
   ```
3. Inicialize e envie ao GitHub:
   ```bash
   git init
   git remote add origin https://github.com/guihrst/disparo.git
   git add .
   git commit -m "Versão com frontend e backend integrados"
   git branch -M main
   git push -u origin main
   ```

---

## 🐳 Publicar imagens no Docker Hub

1. Faça login:
   ```bash
   docker login
   ```

2. Gere as imagens:
   ```bash
   docker build -t guihorst/whatsapp-envio-zpro-frontend:latest ./frontend
   docker build -t guihorst/whatsapp-envio-zpro-backend:latest ./backend
   ```

3. Envie para o Docker Hub:
   ```bash
   docker push guihorst/whatsapp-envio-zpro-frontend:latest
   docker push guihorst/whatsapp-envio-zpro-backend:latest
   ```

---

## 📦 Deploy via Portainer (GitHub)

1. Acesse o Portainer > Stacks > Add stack.
2. Selecione a opção **Repository**.
3. Informe:
   - Repository: `https://github.com/guihrst/disparo`
   - Branch: `main`
   - Compose path: `docker-compose.yml`
4. Clique em **Deploy the stack**.

---

## 🌐 Acessos

- Frontend: http://SEU_IP:8081
- Backend: http://SEU_IP:3002

---

## 📄 CSV de exemplo

```csv
numero,mensagem,nome,imagem
54999999999,Olá {{nome}},Fulano,
54988888888,Segue o produto {{nome}},Ciclano,https://link-da-imagem.com/img.jpg
```

---

## 🛠️ Configuração via config.html

Acesse `config.html`, preencha a URL da API ZPro e o Bearer Token, e clique em **Salvar**. As configurações são mantidas no navegador.