const axios = require('axios');
const authReq = require('./auth-req');
/**
 * Return AIP ID of required file
 * @param {string} docName name of file to get AIP ID
 * @returns {Promise<string>} Promise that solve the AIP ID of required file
 */
module.exports = async (docName) => {

    const query_params = {
        company_group_title: "unipd",
        company_title: "dpp_poc",
        document_class_title: "dpp_docs_class",
        removeMetadataSuffixes: true,
        from: 0,
        size: 25
    };

    const query_body = {
        searchClauses: [
            {
                fieldName: "title",
                type: "MatchClause",
                value: docName
            }
        ]
    };

    const token = await authReq();
    

    const response = await axios.post(process.env.ENDPOINT_SEARCH,query_body, {
        params: query_params,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    const result = response.data.hits.hits[0];
    return Promise.resolve(result._id);
}