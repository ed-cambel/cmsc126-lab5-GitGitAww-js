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

const studentList = JSON.parse(localStorage.getItem('students')) || [];

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

    const newStudent = { 
        id: generate_student_id(),
        name: nameValue,
        age: ageInput, 
        email: emailInput,
        course: courseValue 
    };

    studentList.push(newStudent);

    localStorage.setItem('students', JSON.stringify(studentList));

    alert("Student '" + nameValue + "' has been added with ID: " + newStudent.id);

    //clear inputs
    nameInput.value = ''; 
    document.getElementById('student_age').value = '';
    document.getElementById('student_email').value = '';
    courseInput.selectedIndex = 0;

    display_student_list();
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
    const tableBody = document.getElementById('tableBody');

    if (!tableBody) return; 
    
    tableBody.innerHTML = "";

    if (studentList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No students registered yet.</td></tr>';
        return;
    }

    studentList.forEach((student) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function validate_form() {
    // code here
}

function generate_student_id() {
    // generate random id according to the format
    let id;
    do {
    const year = 2024;
    const random = Math.floor(Math.random() * 90000) + 10000;
    id = "" + year + random
    } while (validate_student_id(id, studentList) === false);

    return id;
}

<<<<<<< HEAD
function validate_student_id() {
   // code here
=======
function validate_student_id(generated_id, students) {
    // checks if generated id is unique
    return !students.some(student => student.id === generated_id);
>>>>>>> main
}

