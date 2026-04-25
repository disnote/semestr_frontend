(function () {
    var out = document.getElementById("log");

    function log(msg) {
        out.textContent += msg + "\n";
    }

    log("GET https://vk.com (axios, браузер)…");

    axios
        .get("https://vk.com", {
            timeout: 20000,
            maxRedirects: 5,
            validateStatus: function () {
                return true;
            },
        })
        .then(function (res) {
            log("Ответ получен: HTTP " + res.status);
            var body = typeof res.data === "string" ? res.data : String(res.data);
            log("Длина тела (символов): " + body.length);
            log("Начало тела:\n" + body.slice(0, 400));
        })
        .catch(function (err) {
            log("Ошибка: " + err.message);
            if (err.code) {
                log("code: " + err.code);
            }
            if (err.response) {
                log("HTTP " + err.response.status);
            }
        });
})();
