import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoDashboard()
{
    const [cookies, setCookie, removeCookie]=useCookies("userid");
    const [appointments, setAppointments]=useState([{Appointment_Id:0,Title:'',Description:'',Date:new Date(),UserId:''}])

    let navigate=useNavigate();

    function signOut(){
        removeCookie('userid');
        navigate('/login');
    }
    
    useEffect(()=>{
        if(cookies['userid']===undefined){
            navigate('/login');
        }
        else{
            axios.get(`http://127.0.0.1:5000/view-tasks/${cookies['userid']}`)
            .then(response=>{
                setAppointments(response.data);
            })
        }
    })


    return(
        <div className="bg-light m-3 p-4">
            <h3 className="d-flex justify-content-between"><span>{cookies['userid']} DashBoard</span> <button onClick={signOut} className="btn btn-link">Sign Out</button></h3>
            <Link to="/add" className="btn btn-primary bi bi-calendar my-3">Add appointment</Link>
            <main className="w-50">
                {
                    appointments.map(appointment=>
                        <div className="alert alert-success alert-dismissible">
                            <button className="btn btn-close" data-bs-dismiss="alert"></button>
                            <h2>{appointment.Title}</h2>
                            <p>{appointment.Description}</p>
                            <p>{moment(appointment.Date).format('dddd, MMMM Do YYYY')}</p>
                            <Link to={`/edit/${appointment.Appointment_Id}`} className="btn btn-warning bi bi-pen-fill">Edit</Link>
                            <Link to={`/delete/${appointment.Appointment_Id}`} className="btn btn-danger ms-2 bi bi-trash">Delete</Link>
                        </div>
                    )
                }
            </main>
        </div>
    )
}