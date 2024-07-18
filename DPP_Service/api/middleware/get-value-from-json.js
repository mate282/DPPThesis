module.exports =  (expandedDoc, propertyUri) => {
    for (const item of expandedDoc[0][propertyUri] || []) {
        if (item['@value']) {
            return item['@value'];
        }
    }
    return null;
}

