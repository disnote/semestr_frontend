async function fetchData() {

    const res = await fetch("https://reqres.in/api/collections/user/records", {
        headers: { "x-api-key": "pro_658391d7bc4647d1ba255c4f18af506bcf692e2c5b967ea5" }
    });
    const data = await res.json();
    console.log(data.data[0]["data"]["title"]);
}
fetchData();