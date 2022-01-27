const input = document.getElementById("input");
const send = document.getElementById("send");
const chat = document.getElementById("chat");
const users = document.getElementById("users");

const socket = io("https://socket-io-lesson.herokuapp.com");

let userName = "";

const onUserConnect = (user) => {
    userName = user || `${prompt('Jake je tve jmeno?', '')}`;
    socket.emit("new user connected", userName);
    newUser(userName);
    console.log(userName)
}

if(userName = null){
    window.location.reload();
}

const newUser = (user) => {
    if (document.querySelector(`.${user}-userlist`)) return;
    const newUserDiv = `<li><span class="tag is-white is-medium">
        <div class="${user}-userlist">
            <p>${user} </p>
        </div></span>
        </li>
    `;
    users.innerHTML += newUserDiv;
    chat.innerHTML += user + " joined!";
}

onUserConnect();

socket.on("new user connected", (data) => {
    data.map((user) => newUser(user));
});

socket.on("user disconnected", (user) => {
    document.querySelector(`.${user}-userlist`).remove();
});

socket.on("chat", (data) => {
    chat.innerHTML += `<p>${data}</p>`;
});

send.onclick = () => {
socket.emit("chat", `${userName}: ${input.value}`);
input.value = "";
}
