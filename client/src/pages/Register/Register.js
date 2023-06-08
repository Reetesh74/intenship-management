import React, { useContext, useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import {useNavigate} from 'react-router-dom'
import "./register.css";
import Spiner  from '../../components/Spiner/Spiner';
import {registerfunc} from "../../services/Apis"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from "react-toastify";
import { addData } from '../../components/context/ContextProvider';

const Register = () => {
  // get input from a form create a three state
  const [inputdata,setInputDate]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })
  console.log(inputdata);



  // status ans image
  const [status,setStatus]=useState("Active");
  const [image,setImage]=useState("");
  const [preview,setPreview]=useState("");

  // spiner
  const [showspin,setShowSpin]=useState(true);

  // navigate for home page
  const navigate=useNavigate();
  const {useradd,setUseradd}=useContext(addData);



  // status option
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  // setinput value
  const setInputvalue=(e)=>{
    const {name,value} =e.target;
    setInputDate({...inputdata,[name]:value})
  }

  // status set
  const setStatusValu=(e)=>{
      setStatus(e.value);
  }

  // profile
  const setProfile=(e)=>{
    setImage(e.target.files[0]);
  }



  // submit userdata
  const submitUserdata=async(e)=>{
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
      const data=new FormData();
      data.append("fname",fname);
      data.append("lname",lname);
      data.append("email",email);
      data.append("mobile",mobile);
      data.append("gender",gender);
      data.append("status",status);
      data.append("user_profile",image);
      data.append("location",location);
      
      const config ={
        "Content-type":"multipart/form-data"
      }

      // send a data to the Apis.js
      const response=await registerfunc(data,config)
      // console.log(response);

      if(response.status===200){
        setInputDate({
          ...inputdata,
          fname:"",
          lname:"",
          email:"",
          mobile:"",
          gender:"",
          location:""
        });
        setImage("");
        setStatus("");
        setUseradd(response.data)
        navigate("/");
      }else{
        toast.error("Error!")
      }
      
    }

  }

  useEffect(()=>{
    if(image){
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(()=>{
      setShowSpin(false)
    },1200)
  },[image])


  return (
    <>
      {
        showspin ? <Spiner/>:<div className='container'>
        <h2 className='text-center mt-1'>Register Your Details</h2>
        <Card className='shadow mt-3 p-3'>
          <div className='profile_dev text-center'>
            <img src={preview ? preview :"/i1.png"} alt="img" />
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
                        onChange={setInputvalue}
                      />
                      <Form.Check 
                        type={"radio"}
                        label={`Female`}
                        name='gender'
                        value={"female"}
                        onChange={setInputvalue}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Select Your Status</Form.Label>
                      <Select options={options}  onChange={setStatusValu} />
                    </Form.Group>
  
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Select Your Profile</Form.Label>
                      <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile'/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                      <Form.Label>Enter Your Location</Form.Label>
                      <Form.Control type="text" value={inputdata.location} name='location' onChange={setInputvalue} placeholder='Enter Location'/>
                    </Form.Group>
                    <Button variant="primary"  type="submit" onClick={submitUserdata}>
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

export default Register
