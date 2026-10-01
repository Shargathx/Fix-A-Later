const frontURL = "http://localhost:3000";

console.log("FRONT URL:", frontURL);
console.log("API URL:", `${frontURL}/api/items`);

export const getAllItems = async () => {
    const url = `http://localhost:3000/api/items`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();


};


export const addItem = async (payload) => {
    const url = `http://localhost:3000/api/items`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();


};

export const deleteItem = async (id) => {
    const url = `${frontURL}/api/items / ${id}`;

    const response = await fetch(url, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();

};