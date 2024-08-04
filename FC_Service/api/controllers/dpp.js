const Dpp = require('../models/dpp');
const mongoose = require('mongoose');



exports.get_doc_links = async (req, res, next) => {
    const id = req.params.dppId;
    Dpp.findById(id)
        .exec()
        .then(dpp => {
            if (dpp) {
                console.log(dpp);
                res.status(200).json(dpp);
            }
            else {
                res.status(404).json({ message: "No valid entry found" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


exports.register_doc = (req, res, next) => {
    const doc = req.body.dpp;

    const newDpp = new Dpp({
        _id: doc.id,
        public_link: doc.public_link,
        private_link: doc.private_link
    });

    Dpp.findById(doc.id)
        .exec()
        .then(dpp => {
            if (dpp) {
                res.status(500).json({
                    message: "Document already registered",
                    doc: dpp
                });
            }
            else {
                newDpp
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Document successfully registered"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


}

exports.update_doc = (req, res, next) => {
    const doc = req.body.dpp;

    const dpp = new Dpp({
        _id: doc.id,
        public_link: doc.public_link,
        private_link: doc.private_link
    });

    update = Dpp.findOneAndUpdate(
        { _id: doc.id },
        { $addToSet: { public_link: doc.public_link, private_link: doc.private_link } },  // Utilizza $addToSet per evitare duplicati
        { new: true, upsert: false }  // Opzioni: new: true per ritornare il documento aggiornato
    );

    update.then(updatedDoc => {
        if (updatedDoc) {
            console.log('Documento aggiornato:', updatedDoc);
            res.status(200).json({ message: "Document updated successfully", doc: updatedDoc });
        } else {
            console.log('Documento non trovato');
            res.status(404).json({ message: "Document not found" });
        }
    })
        .catch(error => {
            console.error('Errore durante l\'aggiornamento:', error.message);
            res.status(500).json({
                error: err
            });
        });

}







