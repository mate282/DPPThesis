const axios = require('axios');
const fs = require('fs');
const jsonld = require('jsonld');
const getValue = require('../middleware/get-value-from-json');
const authReq = require('../middleware/auth-req');
const getCurrentDateTime = require('../middleware/get-current-time');
const calculateFileFingerprint = require('../middleware/get-file-fingerprint');
const getAipId = require('../middleware/get-aip-id');
const getDocFromAIP = require('../middleware/get-doc-from-aip');

//GET: download document with name specified in the request params
exports.get_public_doc = async (req, res, next) => {
	const id = req.params.dppId;

	//Request for AIP ID of the document
	getAipId(`dpp_${id}.json`).
	then(aipId => {
		console.log("AIP:", aipId);
		//request to download the document
		getDocFromAIP(aipId).
		then(doc => {
			res.status(200).json(doc);
		}).
		catch(error => {
			res.status(500).json({message: "Error retrieving document", error: error});
		})
	})
	.catch(err => {
		console.log("Error: ", err);
		res.status(500).json({message: "Error searching document", error: err});
	});

}

exports.get_restricted_doc = async (req, res, next) => {
	const id = req.params.dppId;
	const request_url = process.env.DOC_API_URL + id;
	const req_headers = {
		'x-api-key': process.env.API_KEY
	}

	res.status(500).json({message: "NOT IMPLEMENTED"});
	/*try {
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
	*/
}

//POST: upload document
exports.create_doc = (req, res, next) => {

	const doc = req.body.document;

	const request_url = process.env.ENDPOINT_PRESERV;

	const base_url = process.env.DPP_API_URL;


	//Expand json-ld document to read gtin property
	jsonld.expand(doc).then(expandedDoc => {
		const gtin = getValue(expandedDoc, "https://gs1.org/voc/gtin");

		const fileName = gtin + '.json';

		const fingerprint = calculateFileFingerprint(JSON.stringify(doc));

		authReq().then(token => {
			//Blob for json file to send
			const file = new Blob([JSON.stringify(doc)], { type: 'application/json' });
			//form data with file
			const formData = new FormData();
			//add file to form data
			formData.append('file', file, fileName);
			//query params to send
			const query_params = {
				title: `dpp_${fileName}`,
				mimeType: "application / json",
				producer: "dpp_service",
				submitter: "dpp_service"
			}
			//define file attributes
			const file_attributes = {
				doc_identifier: `dpp_${fileName}`,
				doc_algorithm: "SHA-256",
				doc_fingerprint: fingerprint,
				doc_creation_mode: "a",
				doc_type: "dpp documents",
				doc_preservation_time: "10",
				doc_type_flow: "I",
				doc_no_registry_type: "Nessuno",
				doc_no_registry_datetime: getCurrentDateTime(),
				doc_no_registry_code: "DPP_POC",
				doc_tag_object: "DPP_POC",
				"role_author_legal.0.denomination": "DPP_POC",
				"role_recipient_legal.0.denomination": "Infocert SpA",
				doc_reserved: "true",
				doc_format: "JSON",
				doc_digital_signed_flag: "true",
				doc_digital_timestamp_flag: "false",
				doc_digital_eseal_flag: "false",
				doc_compliance_copies_flag: "false",
				doc_name: fileName,
				doc_version: "1"
			};

			formData.append('attributes', JSON.stringify(file_attributes));

			//define query
			axios.post(request_url, formData, {
				params: query_params,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				}
			})
				.then(response => {
					res.status(200).json({
						publicDocUrl: base_url + 'public/' + gtin
					});
				})
				.catch(err => {
					console.error('Error sending request to SafeLTA: ', err);
					res.status(500).json({ error: 'Error creating document' });
				});

		});
	})
		.catch(error => {
			//Error with JSON-LD expansion
			res.status(500).json({ message: "Invalid document", errorType: error })
		});







}







