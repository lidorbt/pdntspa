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