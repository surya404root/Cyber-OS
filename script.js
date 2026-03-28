function log(text){
    let t = document.getElementById("terminal");
    t.innerHTML += text + "<br>";
    t.scrollTop = t.scrollHeight;
}

// TERMINAL
function runCmd(e){
    if(e.key==="Enter"){
        let cmd = e.target.value.toLowerCase();
        log("> "+cmd);

        if(cmd==="help") log("help, ip, clear");
        else if(cmd==="clear") document.getElementById("terminal").innerHTML="";
        else if(cmd==="ip") getIP();
        else log("Unknown command");

        e.target.value="";
    }
}

// HASH
async function hashText(){
    let t = document.getElementById("hashInput").value;
    let buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
    let hash = Array.from(new Uint8Array(buf))
        .map(b=>b.toString(16).padStart(2,'0')).join('');
    document.getElementById("hashOut").innerText = hash;
}

// PASSWORD
function checkPass(){
    let p = document.getElementById("passInput").value;
    let s = p.length>8 ? "Strong 💪" : "Weak ⚠️";
    document.getElementById("passOut").innerText = s;
}

// IP
async function getIP(){
    let r = await fetch("https://api.ipify.org?format=json");
    let d = await r.json();
    document.getElementById("ipOut").innerText = d.ip;
    log("IP: "+d.ip);
}

// MAP
async function trackIP(){
    let res = await fetch("https://ipapi.co/json/");
    let data = await res.json();

    let map = L.map('map').setView([data.latitude, data.longitude], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map);

    L.marker([data.latitude, data.longitude])
        .addTo(map)
        .bindPopup("Your Location")
        .openPopup();
}

// NETWORK
function scanNetwork(){
    let devices = [
        "192.168.0.1 (Router)",
        "192.168.0.5 (Mobile)",
        "192.168.0.10 (Laptop)"
    ];
    document.getElementById("netOut").innerText = devices.join("\n");
}

// CRACK SIMULATOR
function crack(){
    let target = document.getElementById("targetPass").value;
    let tries = 0;

    let interval = setInterval(()=>{
        tries++;
        document.getElementById("crackOut").innerText =
            "Trying... "+tries;

        if(tries>200){
            clearInterval(interval);
            document.getElementById("crackOut").innerText =
                "Cracked: "+target+" 💀";
        }
    },20);
}

// AI
function aiSend(e){
    if(e.key==="Enter"){
        let input = e.target.value;
        let chat = document.getElementById("aiChat");

        chat.innerHTML += "<div>> "+input+"</div>";
        chat.innerHTML += "<div>AI: Processing... 🤖</div>";

        e.target.value="";
    }
}

// FILE SYSTEM
function saveFile(){
    let name = document.getElementById("fileName").value;
    let content = document.getElementById("fileContent").value;

    localStorage.setItem(name, content);
    document.getElementById("fileOut").innerText = "Saved 💾";
}

function loadFile(){
    let name = document.getElementById("fileName").value;
    let content = localStorage.getItem(name);

    document.getElementById("fileOut").innerText =
        content || "No file found";
}
