import { variables } from "../components/include/Variables";

const url = variables.API_URL;

export async function getDoctorList(api_endpoint) {
    const response = await fetch(url + api_endpoint);
    return await response.json();
}

export async function getPatientList(api_endpoint) {
    const response = await fetch(url + api_endpoint);
    return await response.json();
}

export async function getRoles(api_endpoint) {
    const response = await fetch(url + api_endpoint);
    return await response.json();
}

export async function getGender(api_endpoint) {
    const response = await fetch(url + api_endpoint);
    return await response.json();
}

export async function getThingspeakFeedsData() {
    const url = 'https://api.thingspeak.com/channels/1596329/feeds.json?api_key=PY5EDT094TON962X&results=1';
    const response = await fetch(url);
    return await response.json();
}

export async function getThingspeakFieldData() {
    const url = 'https://api.thingspeak.com/channels/1596329/fields/1.json?api_key=PY5EDT094TON962X';
    const response = await fetch(url);
    return await response.json();
}

export async function getThingspeakChannelStatus() {
    const url = 'https://api.thingspeak.com/channels/1596329/status.json?api_key=PY5EDT094TON962X';
    const response = await fetch(url);
    return await response.json();
}

