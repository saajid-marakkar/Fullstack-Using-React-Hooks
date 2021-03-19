package io.sajid.students.backend.service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;


import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import io.sajid.students.backend.model.DbSequence;
import io.sajid.students.backend.model.Student;
import io.sajid.students.backend.repository.StudentRepository;


@Service
public class StudentService {
	
	
	
	@Autowired
    private MongoOperations mongoOperations;


	
	@Autowired
	private StudentRepository studentRepository;
	
	public Student save(Student student) //for saving a student into mongodb
	{
		return studentRepository.save(student);
	}
	
	public List<Student> getAll(){ //for getting all the details stored in student collection
		return studentRepository.findAll();
	}
	
	 public List<Student> getAllSorted(){ //for getting all the details stored in student collection in sorted order of name.
		return studentRepository.findAll(Sort.by(Sort.Direction.ASC, "userName"));
	}
	 
	 public int getSequenceNumber(String sequenceName) { //for getting sequence number from Dbsequence collecton and incrementing sequence number.
	        //get sequence no
	        Query query = new Query(Criteria.where("id").is(sequenceName));
	        //update the sequence no
	        Update update = new Update().inc("seq", 1);
	        //modify in document
	        DbSequence counter = mongoOperations
	                .findAndModify(query,
	                        update, options().returnNew(true).upsert(true),
	                        DbSequence.class);

	        return !Objects.isNull(counter) ? counter.getSeq() : 1; //call counter if sequence number exist otherwise giving value as 1.
	 }
	 public ResponseEntity<HttpStatus> deleteStudent(String id) 
	 {
		 try
	     {
			 studentRepository.deleteById(id);
	         return new ResponseEntity<>(HttpStatus.OK);
	     }
	     catch(Exception e)
	     {
	          return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	 }
	 public Student getStudent(String id) 
	 {
		 return studentRepository.findById(id).orElse(null);
	 }
	 public String deleteStud(String id) 
	 {
		 studentRepository.deleteById(id);
		 return id;
	 }
	 
	 public Student editStudent(Student newStudent) 
	 {
		 Student oldStudent = studentRepository.findById(newStudent.getId()).orElse(null);
	        oldStudent.setUserName(newStudent.getUserName());    
	        oldStudent.setStandard(newStudent.getStandard());
	        oldStudent.setDivision(newStudent.getDivision());
	        oldStudent.setGender(newStudent.getGender());
	        oldStudent.setDob(newStudent.getDob());
	        studentRepository.save(oldStudent);
	        return oldStudent;
	 }
}
