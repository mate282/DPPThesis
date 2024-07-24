const axios = require('axios');
const qs = require('qs');
/**
 * Request authentication token to SafeLTA API
 *
 * @returns {Promise<string>} Promise that solve the access token
 */
module.exports = async () => {
    //Password generation
    const auth_string = `${process.env.USR}:${process.env.PSW}`;
    const auth_string_b64 = btoa(auth_string);

    const response = await axios.post(process.env.ENDPOINT_AUTH,qs.stringify({grant_type:"client_credentials"}), {
        headers: {
            'Authorization': `Basic ${auth_string_b64}`,
            "Content-Type": "application/x-www-form-urlencoded"
        } 
    });
        
    const token = response.data.access_token;
    return Promise.resolve(token);

}