import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function Signup  ()  {
    
    const[credenditals,setcredenditals] = useState({name:"",email:"",password:"",geolocation:""})
    
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
      let result = await  axios.post('http://localhost:5000/data', {name: credenditals.name});
      console.log(result.data)
        console.log(JSON.stringify({name:credenditals.name,email:credenditals.email,password:credenditals.password,location:credenditals.geolocation}))
        const response = await fetch("http://localhost:5000/createuser/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credenditals.name,email:credenditals.email,password:credenditals.password,location:credenditals.geolocation})
        });
    const json = await response.json()
    console.log(json);

        if(!json.success){
            alert("enter valid credentials")
        }
        
    }
        const onChange=(event)=>{
            setcredenditals({...credenditals,[event.target.name]:event.target.value})
        } 
  return (
    <>
    <div className='container'>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="Username" className="htmlForm-label">Name</label>
      <input type="text" className="htmlForm-control" name='name' value={credenditals.name}onChange={onChange}/>
      </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
      <input type="email" className="htmlForm-control" name='email' value={credenditals.email}onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="htmlForm-text">We'll never share your email with anyone else.</div>
      </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password</label>
      <input type="password" className="htmlForm-control" name='password' value={credenditals.password}onChange={onChange} id="exampleInputPassword1"/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="htmlForm-label">Address</label>
      <input type="text" className="htmlForm-control" name='geolocation' value={credenditals.geolocation}onChange={onChange} id="exampleInputPassword1"/>
    </div>
    <button type="submit" className=" m-3 btn btn-success">Submit</button>
    <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
    </form>
  </div>

    </>
  )
}
