# Usa un'immagine base con Node.js pre-installato
FROM httpd:latest

# Imposta la directory di lavoro
WORKDIR /usr/local/apache2/htdocs/

# Copia il resto del codice sorgente nella directory di lavoro
COPY . .

# Esponi la porta su cui l'app Express.js sta in ascolto
EXPOSE 5054:80



