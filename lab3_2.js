(function () {
    var STORAGE_KEY = "lab3_2_clicker_count_button";
    var counterEl = document.getElementById("counter");
    var rateEl = document.getElementById("rate");
    var btn = document.getElementById("click-btn");


    var count = 0;
    var pageStartMs = performance.now();
    var countAtLoad = 0;

    function loadCount() {
        var raw = localStorage.getItem(STORAGE_KEY);
        var n = raw === null ? 0 : parseInt(raw, 10);
        return isNaN(n) ? 0 : n;
    }

    function saveCount(value) {
        localStorage.setItem(STORAGE_KEY, String(value));
    }

    function render() {
        counterEl.textContent = String(count);
        var elapsedSec = (performance.now() - pageStartMs) / 1000;
        var clicksThisPage = count - countAtLoad;
        var avg_result = elapsedSec > 0 ? clicksThisPage / elapsedSec : 0;
        rateEl.textContent = avg_result.toFixed(2);
    }

    count = loadCount();
    countAtLoad = count;
    render();

    setInterval(render, 200);

    btn.addEventListener("click", function () {
        count += 1;
        saveCount(count);
        render();
    });
})();
