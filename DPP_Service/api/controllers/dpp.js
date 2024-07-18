const axios = require('axios');
const fs = require('fs');
const jsonld = require('jsonld');
const getValue = require('../middleware/get-value-from-json');


//GET: download document with name specified in the request params
exports.get_public_doc = async (req, res, next) => {
	const id = req.params.dppId;

	const request_url = process.env.DOC_API_URL + id;
	const req_headers = {
		'x-api-key': process.env.API_KEY
	}

	try {
		// Effettua una richiesta GET per scaricare il file
		const response = await axios({
			method: 'GET',
			url: request_url,
			headers: req_headers,
			responseType: 'stream' // Imposta responseType su 'stream' per ottenere un flusso diretto del file
		});



		// Crea uno stream di scrittura per il file
		const fileStream = fs.createWriteStream('temp_file.json');

		console.log("Dati: " + response.data);

		// Pipa il flusso di risposta (contenente il file scaricato) nel flusso di scrittura del file
		response.data.pipe(fileStream);

		// Gestisci l'evento 'finish' per inviare una risposta al client quando il file è stato completamente scaricato e salvato
		fileStream.on('finish', async () => {
			const jsonData = JSON.parse(fs.readFileSync('temp_file.json', 'utf8'));

			// Invia i dati contenuti nel file JSON come risposta
			res.status(200).json(jsonData);

			// Opzionalmente, elimina il file temporaneo dopo aver letto i dati
			await fs.unlinkSync('temp_file.json');
		});

	} catch (error) {
		console.error('Error during request', error);
		res.status(500).json({ message: 'Error reading document' });
	}

}

exports.get_restricted_doc = async (req, res, next) => {
	const id = req.params.dppId;
	const request_url = process.env.DOC_API_URL + id;
	const req_headers = {
		'x-api-key': process.env.API_KEY
	}

	try {
		// Effettua una richiesta GET per scaricare il file
		const response = await axios({
			method: 'GET',
			url: request_url,
			headers: req_headers,
			responseType: 'stream' // Imposta responseType su 'stream' per ottenere un flusso diretto del file
		});


		// Crea uno stream di scrittura per il file
		const fileStream = fs.createWriteStream('temp_file.json');

		// Pipa il flusso di risposta (contenente il file scaricato) nel flusso di scrittura del file
		response.data.pipe(fileStream);

		// Gestisci l'evento 'finish' per inviare una risposta al client quando il file è stato completamente scaricato e salvato
		fileStream.on('finish', async () => {
			const jsonData = JSON.parse(fs.readFileSync('temp_file.json', 'utf8'));

			// Invia i dati contenuti nel file JSON come risposta
			res.status(200).json(jsonData.Restricted);

			// Opzionalmente, elimina il file temporaneo dopo aver letto i dati
			await fs.unlinkSync('temp_file.json');
		});

	} catch (error) {
		console.error('Error during request', error);
		res.status(500).json({ message: 'Error reading document' });
	}

}

//POST: upload document
exports.create_doc = (req, res, next) => {

	const doc = req.body.document;

	const request_url = process.env.DOC_API_URL;

	const auth_header = process.env.API_KEY

	const base_url = process.env.DPP_API_URL;
	jsonld.expand(doc).then(expandedDoc => {
		const gtin = getValue(expandedDoc, "https://gs1.org/voc/gtin");

		const fileName = gtin + '.json';
		//Blob for json file to send
		const file = new Blob([JSON.stringify(doc)], { type: 'application/json' });
		//form data with file
		const formData = new FormData();

		formData.append('file', file, fileName);

		axios.post(request_url, formData, {
			headers: {
				'x-api-key': auth_header,
				'Content-Type': 'multipart/form-data'
			},
		})
			.then(response => {

				res.status(200).json({
					publicDocUrl: base_url + 'public/' + gtin
				});
			})
			.catch(err => {
				console.error('Error sending request to LTA Service: ', err);
				res.status(500).json({ error: 'Error creating document' });
			});
	});

}







