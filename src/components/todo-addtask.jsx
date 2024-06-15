import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function ToDoAddTask()
{

    const [cookies, setCookie, removeCookie]=useCookies('userid');
    var navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            Appointment_Id:0,
            Title:'',
            Description:'',
            Date:'',
            UserId:cookies['userid']
        },
        onSubmit:(task)=>{
            axios.post("http://127.0.0.1:5000/add-task",task)
            alert("Task added!");
            navigate('/dashboard');
        }
    })

    return(
        <div className="bg-light text-dark p-4">
            <form onSubmit={formik.handleSubmit} className="w-25">
            
                <dl>
                    <dt>Appointment Id</dt>
                    <dd><input type="number" name="Appointment_Id" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><textarea rows="4" cols="40" name="Description" onChange={formik.handleChange} className="form-control" ></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-50">Submit</button>
                <button className="btn btn-danger w-50">Cancel</button>
            </form>
        </div>
    )
}