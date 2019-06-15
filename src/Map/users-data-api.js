const API_URL = "https://us-central1-pdntspa-tira.cloudfunctions.net/webApi/api/v1/users"

export const getAllUser = async () => {
    // const users = [
    //     {
    //         "firstName": "ofir",
    //         "lastName": "elarat",
    //         "lat": 32.182292,
    //         "lng": 34.897132
    //     },
    //     {
    //         "firstName": "nofar",
    //         "lastName": "elarat",
    //         "lat": 32.382292,
    //         "lng": 34.497132
    //     }
    // ];

    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}

export const updateMyLocation = async (position) => {
    const USER_ID = '7bVl84qShGSWMhRW9a9F';
    const response = await fetch(API_URL + '/' + USER_ID, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            "lat": position.coords.latitude,
            "lng": position.coords.longitube,
            "isUser": true,
            "title": "ofir elarat"
        })
    });

    console.log(response);
}