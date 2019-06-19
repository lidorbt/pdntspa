const API_URL_MESSAGES = "https://us-central1-pdntspa-tira.cloudfunctions.net/webApi/api/v1/messages"
const API_URL_FILES = "https://us-central1-pdntspa-tira.cloudfunctions.net/webApi/api/v1/files"

export const getAllMessages = async () => {
    const response = await fetch(API_URL_MESSAGES);
    const data = await response.json();

    return data;
}

export const sendMessage = async (userName, message, sentDate, location, isFile) => {
    fetch(API_URL_MESSAGES, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        message: message,
        sentDate: sentDate,
        location: location,
        isFile: isFile
      })
    })
}

export const uploadFile = async (file) => {
  console.log(file);
  fetch(API_URL_FILES, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //file: JSON.stringify(file)
        fileName: file.name
      })
    })
}