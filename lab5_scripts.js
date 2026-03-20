/*
    Cambel - HTML Structure + CSS Styling
    Espartero - Backend Functions
    Fallarme - Backend Functions
    Gelvezon - CSS Styling
*/

function time_now() {
    // code here
    if (window.clockInterval) return;

    const update = () => {
        const now = new Date();
    
    const date = now.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    const weekday = now.toLocaleDateString(undefined, {weekday: 'long'});

    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString(undefined, timeOptions);

    const output = document.getElementById('dateOutput');
    output.innerHTML = `Today is ${date}, ${weekday}. <br>  Current time is ${timeString}.`;  
    };

    update();
    window.clockInterval = setInterval(update, 1000);
}

function add_student() {
    // code here
}
 
function find_student() {
    // code here
}

function display_student_list() {
    // code here
}

function validate_form() {
    // code here
}

function generate_student_id() {
    // code here
}

function validate_student_id() {
    // code here
}

