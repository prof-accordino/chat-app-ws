# Usa un'immagine di base Node.js
FROM node:14

# Imposta la directory di lavoro nel container
WORKDIR /usr/src/app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente nel container
COPY . .

# Espone le porte su cui gira l'app
EXPOSE 3500
EXPOSE 5500

# Imposta la variabile di ambiente NODE_ENV su production
ENV NODE_ENV=production

# Definisce il comando per avviare l'app
CMD ["node", "index.js"]
