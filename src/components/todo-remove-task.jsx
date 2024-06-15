import axios from "axios";
import moment from 'moment';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function ToDoRemoveTask(){
    
    const[appointments, setAppointments]=useState([{Appointment_Id:0,Title:'',Description:'',Date:new Date(),UserId:''}]);
    var navigate=useNavigate();

    let params=useParams();
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/view-task/${params.id}`)
        .then(response=>{
            setAppointments(response.data);
        })
    })

    function handleRemoveClick()
    {
        axios.delete(`http://127.0.0.1:5000/delete-task/${params.id}`)
        .then(()=>{
            alert('Record Deleted!');
            navigate('/dashboard');
        })
    }
    
    return (
        <div className="bg-light text-dark p-4">
            <h3>Delete Task</h3>
             <dl>
                <dt>Title</dt>
                <dd>{appointments[0].Title}</dd>
                <dt>Description</dt>
                <dd>{appointments[0].Description}</dd>
                <dt>Date</dt>
                <dd>{moment(appointments[0].Date).format('dddd, MMMM Do YYYY')}</dd>
            </dl>
            <button onClick={handleRemoveClick} className="btn btn-primary">Yes</button>
            <Link to='/dashboard' className="btn btn-danger ms-2">No</Link>
        </div>
    )
}