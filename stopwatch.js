let min = 0;
let sec = 0;
let min_orig = 0;
let sec_orig = 0;
let timerInterval;
let running = false
let audio = false
let action_status =false
let settings_status = false
let timer = 0
localStorage.removeItem("countup")
localStorage.setItem("countup", "true")
let settings = `Defalt Timer Name: <input type="text" id="timer_name" style="width: 100px; border-radius: 5px;" maxlength="15"><br><br><button class="control-buttons light" onclick="save()">Save</button> <button class="control-buttons light"  style="color:red" onclick="settings_clear()">Clear</button><br/><br/>`
// if(localStorage.getItem("hour_countup") !== null){
//     let hour_countup_status = localStorage.getItem("hour_countup");
// } else{
//     let hour_countup_status = false
// }
let hour_countup_status = localStorage.getItem("countup");
// let hour_countup_status = true
let defalt_name = localStorage.getItem("name");

function settings_clear(){
    const setting_panel = document.getElementById("settings")
    setting_panel.innerHTML = settings
    localStorage.clear()
}
document.addEventListener("DOMContentLoaded", (event) => {
    let min_input = document.getElementById("min");
    let sec_input = document.getElementById("sec");
    timer = document.getElementById("time");
    const title = document.getElementById("title");
    if(hour_countup_status == "true"){
        
    } else{
        timer.innerHTML = `
            <input class="outputs left" value="5" type="number" id="min" name="min" min="0" max="60" />
            : 
            <input class="outputs right" value="00" type="number" id="sec" name="sec" min="0" max="59" />
        `
    }

    if (defalt_name) {
        title.value = defalt_name
        
    }
    min_input.value = min
    sec_input.value = sec < 10 ? '0' + sec : sec
    sound_element = document.createElement("audio");
    
  });
  

function set_timer(event) {
    if(event){
        event.preventDefault();
    }
    
    
    let min_input = document.getElementById("min");
    let sec_input = document.getElementById("sec");
    const timer = document.getElementById("time");
    min = parseInt(min_input.value);
    sec = parseInt(sec_input.value);
    if(isNaN(min)){
        min = 0
    }
    if(isNaN(sec)){
        sec = 0
    }

    min_orig = min;
    sec_orig = sec;

    min_input.value = min
    sec_input.value = sec < 10 ? '0' + sec : sec
    // timer.innerHTML = `${min}:${sec < 10 ? '0' + sec : sec}`;

    clearInterval(timerInterval); // Clear any existing timer
    startCountdown();
}

function startCountdown() {
    let min_input = document.getElementById("min");
    let sec_input = document.getElementById("sec");
    running = true
    const timer = document.getElementById("time");
    min_input.style.color = "wheat";
    sec_input.style.color = "wheat";
    timer.style.color = "wheat";
    
    timerInterval = setInterval(() => {
        if (sec === 0 && min === 0) {
            clearInterval(timerInterval);
            times_up()
            return;
        }

        if (sec === 0) {
            min--;
            sec = 59;
        } else {
            sec--;
        }
        min_input.value = min
        sec_input.value = sec < 10 ? '0' + sec : sec
    }, 1000);
}

function times_up(){
    countup()
}

function countup() {
    let min_input = document.getElementById("min");
    let sec_input = document.getElementById("sec");
    let hour_input = document.getElementById("hour");
    // if(hour_countup_status == "true"){
    //     let hour_input = document.getElementById("hour");
    //     hour_input.style.color = "red";
    // }
    
    let hour = 0
    
    const timer = document.getElementById("time");
    // min_input.style.color = "red";
    // sec_input.style.color = "red";
    // timer.style.color = "red";
    
    
    timerInterval = setInterval(() => {
        if (sec === 59) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            if(hour_countup_status == "true"){
                hour++;
                min = 0;
                hour_input.value = hour
            } else{
                kill()
                timer.style.color = "brown";
                min_input.style.color = "brown";
                sec_input.style.color = "brown";

            }
            
        } else {
            sec++;
        }

        min_input.value = min
        sec_input.value = sec < 10 ? '0' + sec : sec
    }, 1000);
}

function reset(){
    const startStop = document.getElementById("startStop")
    let min_input = document.getElementById("min");
    let sec_input = document.getElementById("sec");
    startStop.innerHTML = '<i class="fa-solid fa-play"></i>'
    min = parseInt(min_orig)
    sec = parseInt(sec_orig)
    const timer = document.getElementById("time");
    min_input.value = min
    sec_input.value = sec < 10 ? '0' + sec : sec
    timer.style.color = "wheat";
    min_input.style.color = "wheat";
    sec_input.style.color = "wheat";
    kill()

    


}
function kill(){
    // Set a fake timeout to get the highest timeout id
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
}

function setting_toggle(){
    const setting_panel = document.getElementById("settings")

    if(settings_status){
        settings_status = false
        setting_panel.innerHTML = ""
    } else{
        settings_status = true
        setting_panel.innerHTML = settings
        const hour_countup = document.getElementById("countup")
        const timer_name = document.getElementById("name")

        if(hour_countup_status == "true"){
            hour_countup.checked = "true";

        }

        if (defalt_name != false) {
            timer_name.value = defalt_name
            
        }
        // hour_countup.addEventListener('change', function() {
        //     if (this.checked) {
        //         localStorage.removeItem("hour_countup")
        //         localStorage.setItem("hour_countup", "true")
        //     } else {
        //         localStorage.removeItem("hour_countup")
        //         localStorage.setItem("hour_countup", "false")
        //     }
        //   });

          
    }
    
}

function save(){
    const timer = document.getElementById("time");

    const timer_name = document.getElementById("name")
    if (timer_name.value) {
        localStorage.removeItem("name")
        localStorage.setItem("name", timer_name.value)
    } else {
        localStorage.removeItem("name")
        localStorage.setItem("name", "Stopwatch")
    }
    setTimeout(() => {
        location.reload() 
    }, 1000);

}
function toggle(){
    const startStop = document.getElementById("startStop")
    if(running){
        startStop.innerHTML = '<i class="fa-solid fa-play"></i>'
        kill()
        running = false
    } else {
        startStop.innerHTML = '<i class="fa-solid fa-pause"></i>'
        set_timer()
    }
}
function preset(min){
    const actions = document.getElementById("actions")
    let min_input = document.getElementById("min");
    let sec_input = document.getElementById("sec");
    let secs = "00"
    min_input.value = min
    sec_input.value = secs
    set_timer(false)
    actions.innerHTML = ''
    action_status = false

}


function menu_toggle(){
    var x = document.getElementById("menu");
    var toggle = document.getElementById("menu_toggle");
    if (x.style.display === "none") {
        toggle.innerHTML = '<i class="fa-solid fa-chevron-up"></i>'
        x.style.display = "block";
    } else {
        toggle.innerHTML = '<i class="fa-solid fa-chevron-down"></i>'
        x.style.display = "none";
    }
}

