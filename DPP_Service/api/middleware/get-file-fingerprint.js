const fs = require('fs');
const crypto = require('crypto');

/**
 * Calculate sha256 fingerprint and then encode with Base64
 * @param {string} fileData file data to calculate fingerprint
 * @returns {string} return fingerprint
 */
module.exports =  (fileData) => {
    
    // Calcola l'hash SHA-256 del file
    const hash = crypto.createHash('sha256');
    hash.update(fileData);
    const fileHash = hash.digest('hex');

    // Codifica l'hash in Base64
    const encoded = Buffer.from(fileHash, 'ascii').toString('base64');

    return encoded;
}


