
function register() {
    axios.post("/register", {
        "name":document.getElementById("name").value,
        "email":document.getElementById("email").value,
        "password":document.getElementById("password").value
    }, () => {
        alert("Returned")
    })
}