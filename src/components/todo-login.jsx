import axios from "axios";
import { useFormik } from 'formik';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoLogin(){
    
    const [cookies, setCookie, removeCookie]=useCookies("userid");

    const[usermsg,setUserMsg]=useState('');
    const[pwdmsg,setPwdMsg]=useState('');
    const[validClass,setValidClass]=useState('');

    let navigate=useNavigate();
    
    const formik=useFormik({
        initialValues:{
            UserId:"",
            Password:""
        },
        onSubmit:(values)=>{
            axios.get("http://127.0.0.1:5000/get-users")
            .then(response=>{
                const user = response.data.find(user => user.UserId === values.UserId);
                    if (user) {
                        if (user.Password === values.Password) {
                            setCookie('userid',user.UserId);
                            navigate('/dashboard');
                        } else {
                            setPwdMsg("Wrong password! Try again!");
                            setValidClass('text-danger');
                        }
                    }else{
                        setUserMsg("Wrong User Id! Try again!");
                        setValidClass('text-danger');
                    }
            })
        }
    })


    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="bg-light p-4 m-3 border border-2 border-dark rounded w-25">
                <h3 className="bi bi-person-fill me-4">User Login</h3>
                <dl>
                    <dt className="fw-bold">User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control"/></dd>
                    <dd className={validClass}>{usermsg}</dd>
                    <dt className="fw-bold">Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control"/></dd>
                    <dd className={validClass}>{pwdmsg}</dd>
                </dl>
                <button class="btn btn-primary w-100 mt-2">Login</button>
                <Link to="/register">New User Login</Link>
            </form> 
        </div>
    )
}