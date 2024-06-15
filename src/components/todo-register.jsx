import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ToDoRegister(){

    const [msg, setMsg]=useState('');
    const [validClass, setValidClass]=useState('');

    let navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            UserId:"",
            UserName:"",
            Password:"",
            Email:"",
            Mobile:""
        },
        onSubmit:(user)=>{
            axios.post("http://127.0.0.1:5000/register-user",user)
            .then(()=>{
                alert('User Registered');
                navigate("/login");
            })
        }
    })
    
    function verifyUser(e){
        axios.get("http://127.0.0.1:5000/get-users")
        .then(response=>{
            for(var user of response.data){
                if(user.UserId===e.target.value){
                    setMsg('User Id Taken - Try Another');
                    setValidClass('text-danger');
                }
                else{
                    setMsg('User Id Available ');
                    setValidClass('text-success');
                }
            }
        })
    }
    
    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="bg-light p-4 m-3 border border-2 border-dark rounded w-25">
                <div className="bi h5 bi-person-fill">Register User</div>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onKeyUp={verifyUser} onChange={formik.handleChange} className="form-control" /></dd>
                    <dd className={validClass}>{msg}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Register</button>
                <Link to="/login">Existing User Login</Link>
            </form>
        </div>
    )
}