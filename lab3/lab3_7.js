(function () {
    var circle = document.querySelector(".blue-circle");
    if (!circle) return;

    function moveTo(clientX, clientY) {
        circle.style.left = clientX + "px";
        circle.style.top = clientY + "px";
    }

    document.addEventListener("mousemove", function (e) {
        moveTo(e.clientX, e.clientY);
    });
})();
