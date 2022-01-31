const input = document.getElementById("input");
const send = document.getElementById("send");
const chat = document.getElementById("chat");
const users = document.getElementById("users");
const login = "nic";

const socket = io("https://socket-io-lesson.herokuapp.com");

let userName = "";

const onUserConnect = (user) => {
    userName = user || `${prompt('Jake je tve jmeno?', '')}` ;
    socket.emit("new user connected", userName);
    newUser(userName);
    admin();
}

if(userName = null ){
    window.location.reload();
}

async function admin(){ 
let connUser = await userName;
    
    if(connUser == login){
        console.log("loggined")
        /*userName = `Anonymous ${Math.floor(Math.random() * 10000)}`;
        cracked = userName;
        console.log(user)
        await document.querySelector(`.${user}-userlist`).remove();*/
    }
    
        
       
}

const newUser =  (user) => {
            if (document.querySelector(`.${user}-userlist`)) return;
            const newUserDiv = `<li class="${user}-cli cli" ><span class="tag is-white is-medium">
                <div class="${user}-userlist">
                    <p>${user}</p>
                </div></span>
                </li>
            `;
            users.innerHTML += newUserDiv;
            chat.innerHTML += user + " joined! <br>";
            if(userName == login){
                user + " disconnect! <br>"
                userName + " joined! "
        }
            
        }

 onUserConnect();
        
        socket.on("new user connected", (data) => {
            data.map((user) => newUser(user));
        });
        
        socket.on("user disconnected", (user) => {
            document.querySelector(`.${user}-userlist`).remove();
            document.querySelector(`.${user}-cli`).remove();
            chat.innerHTML += user + " disconnect! <br>";
        });
        
        socket.on("chat", (data) => {
            chat.innerHTML += `<p>${data}</p>`;
        });
        
        

    

        if(userName == "null" || alert.closed){
            window.location = "/"
        }
        else{
            input.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                 event.preventDefault();
                 send.click();
                }
              });
              
              
              send.onclick = () => {
              socket.emit("chat", `${userName}: ${input.value}`);
              input.value = "";
              }
        }