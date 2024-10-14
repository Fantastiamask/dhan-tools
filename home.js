let sessions = JSON.parse(localStorage.getItem("session")) || [];
let sessions_id = JSON.parse(localStorage.getItem("sessions_id")) || [];
let count_id = sessions.length
console.log(count_id)
function welcome(){
    const spacer = document.createElement('div');
    spacer.className = 'spacer';
    spacer.id = 'spacewelcome';
    const container = document.createElement('div');
    container.className = 'container';
    container.id = 'welcome';
    container.innerHTML = `
        Hello World!
        <br>
        <i class="fa-solid fa-hourglass"></i>&ensp; to create a timer widget
        <br>
        <i class="fa-solid fa-stopwatch"></i>&ensp; to create a stopwatch widget
        <br>
        <i class="fa-solid fa-wand-magic-sparkles"></i>&ensp; to clear widgets
        <br>
        <br>
        <button class="close" onclick="closeWelcome()"><i class="fa-solid fa-xmark"></i></button>`;

    // Insert the spacer and container at the top of the body
    document.body.insertBefore(container, document.body.firstChild);
    document.body.insertBefore(spacer, container);

}
function closeWelcome(){
    const welcome = document.getElementById("welcome")
    const spacewelcome = document.getElementById("spacewelcome")
    welcome.remove()
    spacewelcome.remove()
}
if (sessions.length === 0) {
    console.log("No Session");
    const spacer = document.createElement('div');
    spacer.className = 'spacer';  
    const container = document.createElement('div');
    container.className = 'container';
    container.id = 'welcome';
    container.innerHTML = `Hello World!
        <br>
        <i class="fa-solid fa-hourglass"></i>&ensp; to create a timer widget
        <br>
        <i class="fa-solid fa-stopwatch"></i>&ensp; to create a stopwatch widget
        <br>
        <i class="fa-solid fa-wand-magic-sparkles"></i>&ensp; to clear widgets
        <br>
        <br>
        <button class="close" onclick="closeWelcome()"><i class="fa-solid fa-xmark"></i></button>`

    // Append the container to the body of the document

    document.body.appendChild(container);
    document.body.appendChild(spacer);

} else {
    restore()
    // console.log("Current Sessions:", sessions);
}

function save(type, id) {
    console.log("saving", type)
    if (type == "1") {
        
        sessions.push(1);
    } else {
        sessions.push(2);
    }
    sessions_id.push(id);
    // Save the updated sessions array back to localStorage
    localStorage.setItem("session", JSON.stringify(sessions));
    localStorage.setItem("sessions_id", JSON.stringify(sessions_id));
}
function addWidget(file, save_bool, save_id){
    // Create a new div element
    const spacer = document.createElement('div');
    spacer.className = 'spacer';  
    spacer.id = `spacer-${count_id}`;
    const container = document.createElement('div');
    container.className = 'container';
    container.id = `container-${count_id}`;
    const button = document.createElement('button');
    button.className = 'remove';
    button.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    console.log("Adding", count_id)
    button.setAttribute("onclick", `deleteDiv(${count_id})`)


    // Append the button to the container

    
    // Create an iframe element
    const iframe = document.createElement('iframe');
    iframe.src = file;

    // Append the iframe to the container
    container.appendChild(iframe);
    container.appendChild(button);

    // Append the container to the body of the document

    document.body.appendChild(container);
    document.body.appendChild(spacer);
    if (save_bool == true) {
        console.log("saving")
        save(save_id, count_id);
    }


}

function restoreWidget(file, save_bool, save_id, location){
    // Create a new div element
    let temp = JSON.parse(localStorage.getItem("sessions_id"))
    const spacer = document.createElement('div');
    spacer.className = 'spacer';  
    spacer.id = `spacer-${temp[location]}`;
    const container = document.createElement('div');
    container.className = 'container';
    container.id = `container-${temp[location]}`;
    const button = document.createElement('button');
    button.className = 'remove';
    button.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';
    console.log("Adding", temp[location])
    
    button.setAttribute("onclick", `deleteDiv(${temp[location]})`)


    // Append the button to the container

    
    // Create an iframe element
    const iframe = document.createElement('iframe');
    iframe.src = file;

    // Append the iframe to the container
    container.appendChild(iframe);
    container.appendChild(button);

    // Append the container to the body of the document

    document.body.appendChild(container);
    document.body.appendChild(spacer);
    if (save_bool == true) {
        console.log("saving")
        save(save_id, count_id);
    }


}
function add() {
    count_id += 1

    addWidget("stopwatch.html", true, "1")
}

function add2() {
    count_id += 1
    addWidget("timer.html", true, "2")
}

function restore(){
    let x = 0
    sessions.forEach(element => {
        if (element == "1") {
            restoreWidget("stopwatch.html", false, element, x)
        }
        if (element == "2") {
            restoreWidget("timer.html", false, element, x)
        }
        x+=1
    });
}

function deleteDiv(id){
    console.log("Deleting container with id", id)

    const container = document.getElementById(`container-${id}`);
    const spacer = document.getElementById(`spacer-${id}`);
    container.remove();
    spacer.remove();
    
    let index = sessions_id.indexOf(id)
    sessions.splice(index, 1);
    sessions_id.splice(index, 1);
    localStorage.removeItem("session")
    localStorage.setItem("session", JSON.stringify(sessions));
    localStorage.removeItem("sessions_id")
    localStorage.setItem("sessions_id", JSON.stringify(sessions_id));


}
function clearWidgets(){
    localStorage.clear()
    location.reload()
}