import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner  from '../../components/Spiner/Spiner';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from "react-toastify";
import "./edit.css"
import { useParams } from 'react-router-dom';
import { singleUsergetfunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';


const Edit = () => {

  const [inputdata,setInputData]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })



  // status ans image
  const [status,setStatus]=useState("Active");
  const [imgdata,setImgdata]=useState("");
  const [image,setImage]=useState("");
  const [preview,setPreview]=useState("");

  console.log(status);

  // spiner
  const [showspin,setShowSpin]=useState(true);

  const {id}=useParams();



  // status option
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  // setinput value
  const setInputvalue=(e)=>{
    const {name,value} =e.target;
    setInputData({...inputdata,[name]:value})
  }

  // status set
  const setStatusValu=(e)=>{
      setStatus(e.value);
  }

  // profile
  const setProfile=(e)=>{
    setImage(e.target.files[0]);
  }

  // get a value of single user
  const userProfileGet=async()=>{
    const response=await singleUsergetfunc(id);
    
    if(response.status===200){
      setInputData(response.data);
      setStatus(response.data.status);
      setImgdata(response.data.profile);
    }else{
      console.log("error");
    }
    
  }

  // submit userdata
  const submitUserDate=(e)=>{
    e.preventDefault();

    const {fname,lname,email,mobile,gender,location}=inputdata;

    if(fname===""){
      toast.error("First Name is Required !")
    }else if(lname===""){
      toast.error("Last Name is Required !")
    }else if(email===""){
      toast.error("Email is Required !")
    }else if(!email.includes('@')){
      toast.error("Enter Valid Email !")
    }else if(mobile===""){
      toast.error("Mobile Number is Required !")
    }else if(mobile.length>10){
      toast.error("Enter valid Mobile!")
    }else if(gender===""){
      toast.error("Gender is Required !")
    }else if(image===""){
      toast.error("Profile is Required !")
    }else if(location===""){
      toast.error("Location is Required !")
    }else{
      toast.error("Registration succesfully done")
    }

  }

  useEffect(()=>{
    if(image){
      setImgdata("");
      setPreview(URL.createObjectURL(image));
    }
    userProfileGet();
    setTimeout(()=>{
      setShowSpin(false)
    },1200)
  },[image])

  return (
    <>
      
      {
        showspin ? <Spiner/>:<div className='container'>
        <h2 className='text-center mt-1'>Update Your Details</h2>
        <Card className='shadow mt-3 p-3'>
          <div className='profile_dev text-center'>
            <img src={image ? preview :`${BASE_URL}/uploads/${imgdata}`} alt="img" />
          </div>
              <Form>
                  <Row>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" value={inputdata.fname} name='fname' onChange={setInputvalue} placeholder='Enter FirstName'/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputvalue} placeholder='Enter LastName'/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputvalue} placeholder='Enter Email' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputvalue} placeholder='Enter Mobile' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Select Your Gender</Form.Label>
                      <Form.Check 
                        type={"radio"}
                        label={`Male`}
                        name='gender'
                        value={"Male"}
                        checked={inputdata.gender=="Male" ?true:false}
                        onChange={setInputvalue}
                      />
                      <Form.Check 
                        type={"radio"}
                        label={`Female`}
                        name='gender'
                        value={"female"}
                        checked={inputdata.gender=="Female" ?true:false}
                        onChange={setInputvalue}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Select Your Status</Form.Label>
                      <Select options={options} defaultValue={status} onChange={setStatusValu} />
                    </Form.Group>
  
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Select Your Profile</Form.Label>
                      <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile'/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Enter Your Location</Form.Label>
                      <Form.Control type="text" value={inputdata.location} name='location' onChange={setInputvalue} placeholder='Enter Location'/>
                    </Form.Group>
                    <Button variant="primary"  type="submit" onClick={submitUserDate}>
                      Submit
                    </Button>
                  </Row>
  
              </Form>
         
  
          </Card>
        <ToastContainer position="top-center" />
  
      </div>
      }
       
      
    </>
  )
}

export default Edit
