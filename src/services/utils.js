import { variables } from "../components/include/Variables";

const url = variables.API_URL + "user/get_token";

export async function getToken() {
    const response = await fetch(url);
    return await response.json();
}
