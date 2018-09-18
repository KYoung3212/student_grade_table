<?php

//check if you have all the data you need from the client-side call.  This should include the fields being changed and the ID of the student to be changed
//if not, add an appropriate error to errors

//write a query that updates the data at the given student ID.  
$result = null;
//send the query to the database, store the result of the query into $result


//check if $result is empty.  
	//if it is, add 'database error' to errors
//else: 
	//check if the number of affected rows is 1.  Please note that if the data updated is EXCACTLY the same as the original data, it will show a result of 0
		//if it did, change output success to true
	//if not, add to the errors: 'update error'

?>

<?php
$student_id = $_GET['student_id'];

//check if you have all the data you need from the client-side call.  
//if not, add an appropriate error to errors

//write a query that deletes the student by the given student ID  
$query = "DELETE FROM `student_data` WHERE `id` = $student_id";
$result = null;
$result = mysqli_query($conn, $query);//send the query to the database, store the result of the query into $result

if(empty($result)){
	$output['errors'][]='database error';
} else {
	if(mysqli_affected_rows($conn) === 1) {//check if any data came back
		$output['success']=true;
	} else {
		$output['errors'][]='delete error';
	}	
}
//check if $result is empty.  
	//if it is, add 'database error' to errors
//else: 
	//check if the number of affected rows is 1
		//if it did, change output success to true
		
	//if not, add to the errors: 'delete error'

?>

