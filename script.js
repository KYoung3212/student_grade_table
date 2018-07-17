$(document).ready(initializeApp);

var studentArray = [];

function initializeApp(){
    addClickHandlersToElements();
}

function addClickHandlersToElements(){
    $('.add').on('click', handleAddClicked)
    $('.cancel').on('click', handleCancelClick)
    console.log('Add Click Handlers');
    
    
}

function handleAddClicked(){
    console.log('handleAddClick: success')
    if($('#studentName').val() === '' && $('#course').val() === '' && $('#studentGrade').val() === ''){
        return;
    }
    addStudent();


    
    
}

function handleCancelClick(){
    clearAddStudentFormInputs();
    console.log('handleCancelClicked: success')
}


function addStudent(){
    var studentName = $('#studentName').val();
    var course = $('#course').val();
    var grade = $('#studentGrade').val();
    var studentObj= {
        name: studentName,
        course: course,
        grade: grade
    };

    studentArray.push(studentObj);
    console.log(studentArray);  
    clearAddStudentFormInputs();

    updateStudentList();
}


function clearAddStudentFormInputs(){
    console.log('Clear add student from Inputs');
    $('input:text').val('')

}
function updateStudentList(){
    renderStudentOnDom();
    var avgGrade = calculateGradeAverage();
    $('.avgGrade').text(avgGrade);    
}

function renderStudentOnDom(){
    for (var i=0; i< studentArray.length; i++){
    var tableRow = $('<tr>')
    var studentName = $('<td>').text(studentArray[i].name);
    var studentCourse = $('<td>').text(studentArray[i].course);
    var studentGrade = $('<td>').text(studentArray[i].grade);
    var deleteButton = $('<button>', {
        class : 'btn btn-danger',
        text: 'Delete',
        id: `delete-${i}`,
    });
    deleteButton.on('click', handleDeleteButton)
    tableRow.append(studentName, studentCourse, studentGrade, deleteButton);
    }
    $('tbody').append(tableRow)
}



function calculateGradeAverage(){
    var totalGrades = 0;
    var totalStudents = studentArray.length;
    for (var i = 0; i < totalStudents; i++){
        totalGrades += parseInt(studentArray[i].grade)
    }
    var average = totalGrades / totalStudents;
    return average;
}

function handleDeleteButton (){
    console.log('delete button clicked');
    this.closest('tr').remove();
    var removeStudent = $(this).attr('id');
    studentArray.splice(removeStudent, 1);
}