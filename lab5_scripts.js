/*
    Cambel - HTML Structure + CSS Styling
    Espartero - Backend Functions
    Fallarme - Backend Functions
    Gelvezon - CSS Styling
*/

function time_now() {
    if (window.clockInterval) return;

    const update = () => {
        const now = new Date();
    
    const date = now.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    const weekday = now.toLocaleDateString(undefined, {weekday: 'long'});

    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString(undefined, timeOptions);

    const output = document.getElementById('date_output');
    output.innerHTML = `Today is ${date}, ${weekday}. <br>  Current time is ${timeString}.`;  
    };

    update();
    window.clockInterval = setInterval(update, 1000);
}

const studentList = [];

function add_student() {
    const nameInput = document.getElementById('student_id');
    const nameValue = nameInput.value.trim();

    const ageInput = document.getElementById('student_age').value;
    const emailInput = document.getElementById('student_email').value.trim();
    
    const courseInput = document.getElementById('course');
    const courseValue = courseInput.value;

    const errorList = document.getElementById('form_error');
   
    const namePattern = /^[a-zA-Z]+\s+[a-zA-Z]+/;
    const emailPattern = /^[^\s@]+@up\.edu\.ph$/;

    //Reset UI
    errorList.innerHTML = "";
    nameInput.style.border = "1px solid #ccc";

    //Validation
    if (nameValue == "") {
        showError("Please enter a name.")
        return;
    }

    if (nameValue.length < 5){
        showError("Name must be more than 5 letters long");
        return;
    
    }if (!namePattern.test(nameValue)){
        showError("Please enter both your first and last name");
        return;
    }

    if (ageInput < 18 || ageInput > 99){
        showError("Input a valid age (18-99)");
        return;
    }

    if (!emailPattern.test(emailInput)){
        showError("Input your valid UP Mail (up.edu.ph)");
        return;
    }

    if (courseValue == ""){
        showError("Choose a course");
        return;
    }

    studentList.push({ 
        name: nameValue, 
        age: ageInput, 
        email: emailInput,
        course: courseValue
    });

    console.log("Success!! Adding student: ", studentList);
    alert("Student '" + nameValue + "' has been added.");

    //clear inputs
    nameInput.value = ''; 
    document.getElementById('student_age').value = '';
    document.getElementById('student_email').value = '';
    courseInput.selectedIndex = 0;
}

function showError(message){
    const errorList = document.getElementById('form_error');
    const nameInput = document.getElementById('student_id');

    const li = document.createElement('li');
    li.textContent = message;
    li.style.color = "red";
    li.style.listStyle = "none";
    li.style.textAlign = "center";
    errorList.appendChild(li);

    nameInput.style.border  = "2px solid red";

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

