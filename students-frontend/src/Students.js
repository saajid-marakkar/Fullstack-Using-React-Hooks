import './App.css';
import React, { useState, useEffect} from 'react';
import { Link, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function Students() {
  const [students, setStudents] = useState([])
  const [id, setId] = useState("")
  const [userName, setUserName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [standard, setStandard] = useState("")
  const [division, setDivision] = useState("")
  const [gender, setGender] = useState("")
  const [nameError, setNameError] = useState("")
  const [formError, setFormError] = useState("")
  const [editFlag, setEditFlag] = useState(false)
  useEffect( ()=>
  {
    axios.get("http://localhost:8080/getAllByName")// sending get request to backend
        .then((res)=>{
            setStudents(res.data)
            // console.log(students)
        })  
  }, )
    
  const submit = (event) => //fuction for handling submit
  {
      
    if(editFlag)
    {
        console.log("in edit option")
        if((userName) ==="" || (birthday) ==="" || (standard) ==="" || (division) ==="" || (gender) ==="" ){
            setFormError("enter all fields in the form")
        }
        else
        {
            setFormError("")
            const regex =/^[A-Za-z ]*$/
            let isValid = userName.match(regex) //checking name field contains input having letters and spaces only.
            if(isValid){
                setNameError("")
                //put
                axios.put("http://localhost:8080/editstudent",{
                    id:id,
                    userName:userName,
                    standard:standard,
                    division:division,
                    gender:gender,
                    dob:birthday
                    }).then((res)=>{
                    console.log(res.data)
                    setEditFlag(false)
                    setId("")
                    setUserName("")
                    setBirthday("")
                    setStandard("")
                    setDivision("")
                    setGender("")
                    setNameError("")
                    setFormError("")
                
                })
            }
            else
            {
                console.log("else part");
                setNameError("enter name with letters and space only.")
            }
        }
    }
    else
    {
        //checking all input fields are entered or not
        console.log("in new data option")
        if((userName) ==="" || (birthday) ==="" || (standard) ==="" || (division) ==="" || (gender) ==="" ){
            setFormError("enter all fields in the form")
        }
        else
        {
            setFormError("")
            const regex =/^[A-Za-z ]*$/
            let isValid = userName.match(regex) //checking name field contains input having letters and spaces only.
            if(isValid){
                setNameError("")
                axios.post("http://localhost:8080/send",{ //sending post request to backend
                    userName:userName,
                    standard:standard,
                    division:division,
                    gender:gender,
                    dob:birthday
                    }).then((res)=>{ //clearing all fields if post request is successful
                        console.log(res.data)
                        setId("")
                        setUserName("")
                        setBirthday("")
                        setStandard("")
                        setDivision("")
                        setGender("")
                        setNameError("")
                        setFormError("")
                })
            
            }
            
            else{
                console.log("else part");
                setNameError("enter name with letters and space only.")
            }
        }
    }
    
  }
  const deleteStudent = (id) =>
  {
    console.log(typeof(id))
    console.log("in deletestudent",id)
    axios.delete("http://localhost:8080/students/"+id)
    .then((res)=>{
        console.log(res.data)
      })
  }
  const edit = (id) =>
  {
    axios.get("http://localhost:8080/getById/"+id)// sending getbyid request to backend
    .then((res)=>{
        console.log(res.data)
        setEditFlag(true)
        setId(res.data.id)
        setUserName(res.data.userName)
        setBirthday(res.data.dob)
        setStandard(res.data.standard)
        setDivision(res.data.division)
        setGender(res.data.gender)
    })  
  }
 
    return (
        <div className="students-page">
            <div className="container">
                <div className="row">
                    <div className="login col-12 col-sm-12 col-md-5 col-lg-5" > {/* students form */}
                        <div className='login-box'>
                            <h1 className="login-title text-center">Student Form</h1>
                            <br></br>
                            <form >
                            <input type="text"
                                placeholder="Enter Student Name"
                                className=" form-control name-field w-75 mx-auto "
                                name="userName"
                                value={userName} 
                                onChange={(e)=>{setUserName(e.target.value)}} 
                                pattern="^[A-Za-z ]+$"
                                required
                            /> 
                            <pre className="error  text-center">{nameError}</pre> {/* for showing studentname error*/}
                            <br></br>
                            
                            <div className="birthday  text-center">
                                <label htmlFor="birthday"  className=" mx-auto text-center" >Date of Birth:</label>
                                    <input type="date"
                                    id="birthday"
                                    className="form-control form-control-sm w-75 mx-auto"
                                    value={birthday} 
                                    onChange={(e)=>{setBirthday(e.target.value)}}  
                                    name="birthday"/>
                            </div>
                            
                            <br/>
                            <div className="studyingin text-center">
                                <label htmlFor="standard"  >Studying in:</label>
                                <select 
                                        value={standard} 
                                        name="standard" 
                                        className="form-control form-control-sm w-75 mx-auto"
                                        onChange={(e)=>{setStandard(e.target.value)}} >
                                        <option value="">-- Select Class --</option>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                        <option value="V">V</option>
                                        <option value="VI">VI</option>
                                        <option value="VII">VII</option>
                                        <option value="VIII">VIII</option>
                                        <option value="IX">IX</option>
                                        <option value="X">X</option>
                                        <option value="XII">XII</option>
                                        <option value="XI2">XI2</option>
                                </select>
                                
                                <select 
                                        value={division} 
                                        name="division" 
                                        className="form-control form-control-sm w-75 mx-auto"
                                        onChange={(e)=>{setDivision(e.target.value)}} >
                                        <option value="">-- Select Division --</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                </select>
                                <br/>
                                
                            </div>
                                    <div className="gender text-center">
                                        <label htmlFor="gender">Gender: </label>
                                        <br/>
                                        
                                        <label >
                                            <input 
                                                type="radio" 
                                                name="gender"
                                                value="male"
                                                
                                                checked={gender === "male"}
                                                onChange={(e)=>{setGender(e.target.value)}}    
                                            /> Male
                                        </label>
                                        <br />
                                        <label >
                                            <input 
                                                type="radio" 
                                                name="gender"
                                                value="female"
                                                checked={gender === "female"}
                                                onChange={(e)=>{setGender(e.target.value)}} 
                                            /> Female
                                        </label>
                                    </div>
                                    
                                    <br />      
                                    <pre className="error  text-center">{formError}</pre> {/* for showing input fields error*/}
                                <div className="text-center">
                                    <button type="button" className="btn btn-outline-danger" onClick={submit}>Submit</button>
                                </div>
                            </form>
                            <br/>
                        </div>
                    </div>
                    <div className="student-details col-12 col-sm-12 col-md-7 col-lg-7"> {/* students table */}
                        <h1 className="text-center" style={{color:"white"}}>Students Details</h1>
                        <table className="table table-dark">
                            <thead className="thead-dark">
                                <tr >
                                    <th scope="col">Name</th>
                                    <th scope="col">Class</th>
                                    <th scope="col">Division</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">DOB</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            {/* {console.log(students)} */}
                            <tbody>
                            {
                                
                                students.map(student =>  //passing each document fetched using api to each rows in table.
                                <tr scope="row" key={student.rollNumber}>
                                    <td>{student.userName}</td>
                                    <td>{student.standard}</td>
                                    <td>{student.division}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.dob}</td>
                                    <td>
                                        <button type="button" onClick={(e)=>deleteStudent(student.id)} className="btn btn-outline-danger" >delete</button>
                                        <button type="button" onClick={(e)=>edit(student.id)} className="btn btn-outline-secondary">edit</button>
                                        
                                    </td>
                                </tr>
                                )
                            }
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </div> 
      );
  }
  
  export default withRouter(Students);