module.exports = () => {

    const now = new Date();

    // Ottieni i componenti della data
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // I mesi sono indicizzati da 0, quindi aggiungi 1
    const day = String(now.getDate()).padStart(2, '0');

    // Ottieni i componenti dell'ora
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Componi la stringa nel formato desiderato
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;

}