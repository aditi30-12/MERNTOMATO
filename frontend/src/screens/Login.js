import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
export default  function Login () {
  let navigate = useNavigate();
    const[credenditals,setcredenditals] = useState({email:"",password:""})
    const handleSubmit= async(e)=>{
        e.preventDefault();
      let result = await  axios.post('http://localhost:5000/data', {name: credenditals.name});
      console.log(result.data)
        console.log(JSON.stringify({email:credenditals.email,password:credenditals.password}))
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credenditals.email,password:credenditals.password})
        });
    const json = await response.json()
    console.log(json);
        if(!json.success){
            alert("enter valid credentials")
        }
        if(json.success){
          localStorage.setItem("authToken",json.authToken)
          console.log(localStorage.getItem("authToken"))
          navigate("/");
        }
    }
        const onChange=(event)=>{
            setcredenditals({...credenditals,[event.target.name]:event.target.value})
        }
        return(
            <div>
              <div className='container'>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
      <input type="email" className="htmlForm-control" name='email' value={credenditals.email}onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="htmlForm-text">We'll never share your email with anyone else.</div>
      </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="htmlForm-label">Password</label>
      <input type="password" className="htmlForm-control" name='password' value={credenditals.password}onChange={onChange} id="exampleInputPassword1"/>
    </div>
    <button type="submit" className=" m-3 btn btn-success">Submit</button>
    <Link to="/signup" className='m-3 btn btn-danger'>I'm a new user</Link>
    </form>
  </div>
</div>
        ) 
}
