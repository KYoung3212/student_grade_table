$(document).ready(initializeApp);

var studentArray = [];

function initializeApp() {
    addClickHandlersToElements();
    getDataFromServer();
    $(document).ajaxStart(function () {
        $('.fa-spin').show();
    })
    $(document).ajaxComplete(function () {
        $('.fa-spin').hide();
    })
}

function addClickHandlersToElements() {
    $('.addButton').on('click', handleAddClicked);
    $('.cancel').on('click', handleCancelClick);
    $('.serverData').on('click', getDataFromServer);

    console.log('Add Click Handlers');


}

function handleAddClicked() {
    console.log('handleAddClick: success')
    if ($('#studentName').val() === '' && $('#course').val() === '' && $('#studentGrade').val() === '') {
        return;
    }
    addStudent();
}

function handleCancelClick() {
    clearAddStudentFormInputs();
    console.log('handleCancelClicked: success')
}


function addStudent() {
    var studentName = $('#studentName').val();
    var course = $('#course').val();
    var grade = $('#studentGrade').val();
    var studentObj = {
        name: studentName,
        course: course,
        grade: grade,
        id: studentArray[studentArray.length - 1].id + 1
    };

    studentArray.push(studentObj);
    console.log(studentArray);
    clearAddStudentFormInputs();
    updateStudentList();
    sendToServer(studentObj);
}


function clearAddStudentFormInputs() {
    console.log('Clear add student from Inputs');
    $('input:text').val('')

}

function updateStudentList() {
    renderStudentOnDom(studentArray[studentArray.length - 1]);
    var avgGrade = calculateGradeAverage(studentArray);
    $('.avgGrade').text(avgGrade + "%");
}

function renderStudentOnDom(studentObj) {
    var tableRow = $('<tr>')
    var studentName = $('<td>').text(studentObj.name);
    var studentCourse = $('<td>').text(studentObj.course);
    var studentGrade = $('<td>').text(studentObj.grade);
    var updateButtonTd = $('<td>');
    var deleteButtonTd = $('<td>');

    var deleteButton = $('<button>', {
        class: 'btn btn-danger',
        text: 'Delete',
        id: studentObj.id
    });
    var updateButton = $('<button>', {
        class: 'btn btn-warning',
        text: 'Update',
        id: studentObj.id
    });
    deleteButton.on('click', function () {
                $('#deleteConfirm').modal({
                    show: true
                });

                var closestRow = this.closest('tr');
                console.log(closestRow)
                $('.deleteText').text(`Are you sure you want to delete ${studentObj.name}?`)

                $('.confirmDeleteButton').on('click', function () {
                    $(closestRow).remove();
                    handleDeleteButton(studentObj);
                    deleteStudent(studentObj);
                    $('#deleteConfirm').modal('hide')
                })
            });

                updateButton.on('click', function () {
                    $('#updateEntry').modal({
                        show: true
                    });

                })
                updateButtonTd.append(updateButton);
                deleteButtonTd.append(deleteButton);
                tableRow.append(studentName, studentCourse, studentGrade, updateButtonTd, deleteButtonTd);
                $('tbody').append(tableRow);
            };




            function calculateGradeAverage(array) {
                var totalGrades = 0;
                var totalStudents = array.length;
                for (var i = 0; i < totalStudents; i++) {
                    totalGrades += parseInt(array[i].grade)
                }
                var averageGrade = parseInt(totalGrades / totalStudents);
                if (isNaN(averageGrade)) {
                    averageGrade = 0;
                }
                return averageGrade;
            }

            function handleDeleteButton(studentObj) {
                console.log('delete button clicked');
                // this.closest('tr').remove();
                // var removeStudent = $(this).attr('id');
                studentArray.splice(studentObj, 1);
                var avgGrade = calculateGradeAverage(studentArray);
                $('.avgGrade').text(avgGrade + "%")
                // deleteStudent(studentObj)

            }

            function getDataFromServer() {
                var the_data = {
                    api_key: "OH4GI7VfKh"
                }
                var ajaxOptions = {
                    dataType: "json",
                    data: the_data,
                    method: "POST",
                    url: "https://s-apis.learningfuze.com/sgt/get",

                    success: function (response) {
                        var responseArray = response.data;
                        console.log(studentArray);
                        for (var i = 0; i < responseArray.length; i++) {
                            studentArray = responseArray;
                            renderStudentOnDom(responseArray[i]);
                            var avgGrade = calculateGradeAverage(responseArray);
                            $(".avgGrade").text(avgGrade + "%")
                        }
                    },
                    error: failedToRetrieve
                }
                $.ajax(ajaxOptions)
            }

            function sendToServer(studentObj) {
                var the_data = {
                    api_key: "OH4GI7VfKh",
                    name: studentObj.name,
                    course: studentObj.course,
                    grade: studentObj.grade,
                    student_id: parseInt(studentObj.id)
                }
                var ajaxOptions = {
                    dataType: "json",
                    data: the_data,
                    method: "POST",
                    url: "https://s-apis.learningfuze.com/sgt/create",

                    success: function () {
                        console.log("Success: Student Add to Serve")
                    },
                    error: failedToRetrieve

                }
                $.ajax(ajaxOptions);
            }

            function deleteStudent(studentObj) {
                var the_data = {
                    api_key: "OH4GI7VfKh",
                    student_id: parseInt(studentObj.id)

                }
                var ajaxOptions = {
                    dataType: "json",
                    data: the_data,
                    method: "POST",
                    url: "https://s-apis.learningfuze.com/sgt/delete",

                    success: function () {
                        console.log("Success: Student Add to Serve")
                    },
                    error: failedToRetrieve

                }
                $.ajax(ajaxOptions);
            }


            function failedToRetrieve() {
                $('.errorModal').modal('show');
            }

            function loadSpinner() {
                $(document).ajaxStart(function () {
                    $('.fa-spin').show();
                })
                $(document).ajaxComplete(function () {
                    $('.fa-spin').hide();
                })
            }