

var selector = document.querySelector(".theorema")

selector.style.userSelect = "none";
selector.style.webkitUserSelect = "none";

selector.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

selector.addEventListener("selectstart", function (e) {
    e.preventDefault();
});

selector.addEventListener("copy", function (e) {
    e.preventDefault();
});

selector.addEventListener("cut", function (e) {
    e.preventDefault();
});
selector.addEventListener("dragstart", function (e) {
    e.preventDefault();
});
