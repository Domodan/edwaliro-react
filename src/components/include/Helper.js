import { variables } from "./Variables";

export function validateFormFields(e) {
    const target = e.target;

    if(e.currentTarget === target) {
        if(target.value === "") {
            target.classList.add('is-invalid');
            target.classList.remove('is-valid');
        }
        else {
            target.classList.add('is-valid');
            target.classList.remove('is-invalid');
        }
    }
}

export async function deleteObject(id, api_endpoint) {
    if(window.confirm("Are you sure you want to delete this Doctor detail?")) {
        const url = variables.API_URL + api_endpoint + id + "/";
        const method = "DELETE";
        const contentType = "application/json";
        const accept = "application/json";

        await fetch(url, {
            method: method,
            headers: {
                'Accept': accept,
                'Content-Type': contentType
            }
        })
        .then( (response) => {
            if(response.statusText === 'No Content') {
                return response.status;
            }
        },
        (error) => {
            console.log("Error: ", error);
        });
    }
}