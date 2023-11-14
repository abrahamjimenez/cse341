const url = window.location.href;

const usersLink = document.querySelector(".users")
const swaggerLink = document.querySelector(".swagger")

usersLink.href = `${url}users`
swaggerLink.href = `${url}api-docs`

console.log(url);