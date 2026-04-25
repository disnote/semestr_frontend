import axios from "axios";

const url = "https://vk.com";

console.log("GET", url, "(axios, Node.js)…\n");

try {
    const res = await axios.get(url, {
        timeout: 20000,
        maxRedirects: 5,
        validateStatus: () => true,
    });

    console.log("HTTP", res.status);
    console.log("Content-Type:", res.headers["content-type"] || "(нет)");

    const body = typeof res.data === "string" ? res.data : String(res.data);
    console.log("Длина тела (символов):", body.length);
    console.log("\nНачало тела:\n", body.slice(0, 600));
} catch (err) {
    console.error("Ошибка:", err.message);
    if (err.code) {
        console.error("code:", err.code);
    }
    if (err.response) {
        console.log("HTTP", err.response.status);
    }
}
