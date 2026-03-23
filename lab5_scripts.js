/*
    Cambel - HTML Structure + CSS Styling
    Espartero - Backend Functions
    Fallarme - Backend Functions
    Gelvezon - CSS Styling
*/

function time_now() {
    //checks if the clock is already on the screen
    if (window.clockInterval) return;   

    //new variable update
    const update = () => {      
        const now = new Date();
    
    //Date 
    const date = now.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    const weekday = now.toLocaleDateString(undefined, {weekday: 'long'});

    //Time
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleTimeString(undefined, timeOptions);

    //Display
    const output = document.getElementById('date_output');
    output.innerHTML = `Today is ${date}, ${weekday}. <br>  Current time is ${timeString}.`;  
    };

    //updates the clock every 1000 millisecods
    update(); 
    window.clockInterval = setInterval(update, 1000);
}

//Local Storage
const studentList = JSON.parse(localStorage.getItem('students')) || [];

function add_student() {
    //variable initialization
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

    //Validation
    if (nameValue == "") {
        showError("Please enter a name.");
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

    //Adds the newStudent to the array list
    studentList.push(newStudent);

    //Saves the data into the Local Storage
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
    //Error Handling
    const errorList = document.getElementById('form_error');

    const li = document.createElement('li');
    li.textContent = message;
    li.style.color = "red";
    li.style.listStyle = "none";
    li.style.textAlign = "center";
    errorList.appendChild(li);
}
 
function find_student() {
    // find student through id property and display solely in table
    const search_id = document.getElementById('search_id').value;
    const found_student = studentList.find(student => student.id === search_id)

    if (found_student) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = "";
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${found_student.id}</td>
            <td>${found_student.name}</td>
            <td>${found_student.age}</td>
            <td>${found_student.email}</td>
            <td>${found_student.course}</td>
        `;
        tableBody.appendChild(row);

    } else {
        alert('Student record does not exist');
    }

    console.log(search_id);
    console.log(found_student);
}

function display_student_list() {
    const tableBody = document.getElementById('tableBody'); 

    //checks if the array has an item
    if (studentList.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No students registered yet.</td></tr>';
        return;
    }

    //iterates through the studentList
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

function validate_student_id(generated_id, students) {
    // checks if generated id is unique
    return !students.some(student => student.id === generated_id);
}

