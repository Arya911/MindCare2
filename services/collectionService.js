import api from "./apiService";
import axios from "axios";

export const getCollections = async(username) => {
    console.log("Username in getCollections: ", username);
    try {
        const response = await api.get(`collections/${username}`); // Adjust endpoint as needed
        if(response.status === 200){
            console.log("Response in getCollections function: ", JSON.stringify(response.data, null, 2));
            return ({
                data: response.data,
                success: true,
            });
        }
        else if (response.status === 400){
            return ({
                success: false,
                message: "Collection fetching failed. Please try again.",
            });
        }
        else{
            return (
                {
                    success: false,
                    message: "Collections fetching failed due to unknown error. Please try again.",
                }
            );
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return {
            success: false,
            message: 'Sign-up failed. Please try again.',
        };
    }
};

export const removeAffirmationFromCollection = async(collectionId, affirmationId) => {
    try{
        const response = await api.delete(`collections/${collectionId}/removeAffirmation/${affirmationId}`);
        if(response.status===204){
            return({
                success: true
            });
        }
        else return ({
            success: false
        })
    }
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return {
            success: false,
            message: 'Sign-up failed. Please try again.',
        };
    }
};

export const createCollection = async (name, username) => {
    try{
        const response = await api.post(
            'collections/createCollection',
            name,
            {
                params: {username}, // Pass the username as a query parameter
                headers: {
                    'Content-Type': 'text/plain', // Specify the request body format
                },
            }
        );
        console.log('Collection created with ID:', response.data);
        if(response.status===201)
        return ({
            data: response.data,
            success: true
        });

        else {
            console.log("Error in creating collection.");
            return ({
                success: false
            });
        }
    }
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return {
            success: false,
            message: 'Sign-up failed. Please try again.',
        };
    }
}

export const deleteCollection = async (collectionId) => {
    try{
        const response = await api.delete(
            `collections/${collectionId}/deleteCollection`
        );
        if(response.status===204){
            return({
                success: true
            });
        }
        else return ({
            success: false
        })
    }
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return {
            success: false,
            message: 'Sign-up failed. Please try again.',
        };
    }
}

export const createAffirmation = async (collectionId, text, username) => {
    try{
        const response = await api.post(
            `collections/${collectionId}/createAffirmation`,
            {
                username: username,
                text: text
            }
        );
        if(response.status===201){
            return({
                success: true,
                data: response.data
            });
        }
        else return ({
            success: false
        })
    }
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return {
            success: false,
            message: 'Sign-up failed. Please try again.',
        };
    }
}