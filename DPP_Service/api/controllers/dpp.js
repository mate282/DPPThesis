const axios = require('axios');
const fs = require('fs');

//GET: download document with name specified in the request params
exports.get_public_doc = async (req,res, next) => {
    const id = req.params.dppId;

	const request_url = process.env.DOC_API_URL  + id ;
	const req_headers = {
		'x-api-key' : process.env.API_KEY
	}

	try {
		// Effettua una richiesta GET per scaricare il file
		const response = await axios({
		method: 'GET',
		url: request_url,
		headers: req_headers,
		responseType: 'stream' // Imposta responseType su 'stream' per ottenere un flusso diretto del file
		});

		console.log("invio richiesta");

		// Crea uno stream di scrittura per il file
		const fileStream = fs.createWriteStream('../temp_file.json');

		// Pipa il flusso di risposta (contenente il file scaricato) nel flusso di scrittura del file
		response.data.pipe(fileStream);

		// Gestisci l'evento 'finish' per inviare una risposta al client quando il file è stato completamente scaricato e salvato
		fileStream.on('finish', function() {
			const jsonData = JSON.parse(fs.readFileSync('../temp_file.json', 'utf8'));

			// Opzionalmente, elimina il file temporaneo dopo aver letto i dati
			fs.unlinkSync('../temp_file.json');

			// Invia i dati contenuti nel file JSON come risposta
			res.status(200).json(jsonData.Public);		
		});

	} catch (error) {
		console.error('Error during request', error);
		res.status(500).json({message: 'Error processing the request'});
	}

}

exports.get_restricted_doc = async (req,res, next) => {
    const id = req.params.dppId;
	const request_url = process.env.DOC_API_URL  + id ;
	const req_headers = {
		'x-api-key' : process.env.API_KEY
	}

	try {
		// Effettua una richiesta GET per scaricare il file
		const response = await axios({
		method: 'GET',
		url: request_url,
		headers: req_headers,
		responseType: 'stream' // Imposta responseType su 'stream' per ottenere un flusso diretto del file
		});

		console.log("invio richiesta");

		// Crea uno stream di scrittura per il file
		const fileStream = fs.createWriteStream('../temp_file.json');

		// Pipa il flusso di risposta (contenente il file scaricato) nel flusso di scrittura del file
		response.data.pipe(fileStream);

		// Gestisci l'evento 'finish' per inviare una risposta al client quando il file è stato completamente scaricato e salvato
		fileStream.on('finish', function() {
			const jsonData = JSON.parse(fs.readFileSync('../temp_file.json', 'utf8'));

			// Opzionalmente, elimina il file temporaneo dopo aver letto i dati
			fs.unlinkSync('../temp_file.json');

			// Invia i dati contenuti nel file JSON come risposta
			res.status(200).json(jsonData.Restricted);		
		});

	} catch (error) {
		console.error('Error during request', error);
		res.status(500).json({message: 'Error processing the request'});
	}
	
}


//POST: upload document
exports.create_doc = async (req,res,next) => {

    const doc = req.body.document;

	const request_url = process.env.DOC_API_URL;

	const auth_header = process.env.API_KEY


	
	try {

		// Salva i dati ricevuti in un file JSON
		//fs.writeFileSync('temp_data.txt', JSON.stringify(doc));
		//const fileToSend = fs.readFileSync('temp_data.txt');
		const fileName = doc.Public.ProductID + '.json';
		const file = new Blob([JSON.stringify(doc)], { type: 'application/json' });
		const formData = new FormData();
		formData.append('file',file,fileName);

		// Effettua una richiesta POST all'altra API per inviare il file JSON
		const response = await axios.post(request_url, formData, {
			headers: {
				'x-api-key' : auth_header,
				'Content-Type': 'multipart/form-data'
			},
		  });


		// Elimina il file temporaneo dopo averlo inviato
		fs.unlink('temp_data.txt', (err) => {
			if (err) {
			  console.error('Si è verificato un errore durante l\'eliminazione del file:', err);
			  return;
			}
			console.log('Il file è stato eliminato con successo.');
		  });

		// Invia la risposta dell'altra API come risposta alla richiesta originale
		res.json(response.data);

	} catch (error) {
		console.error('Errore durante il processo dei dati:', error);
		res.status(500).json({ error: 'Errore durante il processo dei dati' });
	}
}







