import axios from "axios";

const url = "https://example.com/api/data";

const payload = {

};

axios.post(
    url,
    payload,
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_TOKEN_HERE",
            "X-Custom-Header": "my-custom-value"
        }
    }
)
    .then(response => {
        console.log("Server response:", response.data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    