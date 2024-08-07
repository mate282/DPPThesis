# Usa un'immagine base con Node.js pre-installato
FROM node:latest

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia il package.json e il package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente nella directory di lavoro
COPY . .

# Esponi la porta su cui l'app Express.js sta in ascolto
EXPOSE 5051:5051

# Avvia l'applicazione
CMD ["npm", "start"]