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

export const updateMyLocation = async (position, data) => {
    const USER_ID = '7bVl84qShGSWMhRW9a9F';
    const response = await fetch(API_URL + '/' + USER_ID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "lat": position.coords.latitude,
            "lng": position.coords.longitude,
            "isUser": true,
            "title": data.title,
            "userName": data.userName
        })
    });

    return response;
}

export const insertNewUser = async (position, userName) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "lat": position.coords.latitude,
            "lng": position.coords.longitude,
            "isUser": true,
            "title": userName,
            "userName": userName
        })
    });

    return response;
}

export const AddPlace = async (title, lat, lng,uploadFileName) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "lat": lat,
            "lng": lng,
            "isUser": false,
            "title": title,
            "fileName": uploadFileName
        })
    });

    return response;
}