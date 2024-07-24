const axios = require('axios');
const authReq = require('./auth-req');
/**
 * Return document with the AIP ID passed in params
 * @param {string} id name of file to get AIP ID
 * @returns {Promise<string>} Promise that solve the document required
 */
module.exports = async (id) => {


    const token = await authReq();
    

    const response = await axios.get(`${process.env.ENDPOINT_DOWNLOAD}/${id}/representation`, {
        headers: {
            'x-safe-user-name':'matteoschiesaro',
            'x-safe-idp-id':'DPP_POC',
            'Authorization': `Bearer ${token}`
        }
    });

    const result = response.data;
    return Promise.resolve(result);
}