const API_URL = "https://us-central1-pdntspa-tira.cloudfunctions.net/webApi/api/v1/messages"

export const getAllMessages = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}

export const sendMessage = async (userName, message) => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        message: message,
      })
    })
}