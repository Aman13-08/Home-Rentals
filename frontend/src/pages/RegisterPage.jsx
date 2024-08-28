import React,{useEffect,useState} from 'react'
import uploadProfilePic from "../assets/upload.png"
import { Link, useNavigate } from "react-router-dom"
const RegisterPage = () => {
    const [formData , setFromData] = useState({
        FirstName:"",
        LastName:"",
        email:"",
        password: "",
        confirmPassword: "",
        profileImage: "",
    })
console.log(formData);

    const handleChange = (e) =>{
        const {name ,value,files} =e.target

        setFromData({
            ...formData,
            [name]:value,
            [name]:name ==="profileImage" ? files[0] : value,

        })
    }
    

  return (
    <div className='max-w-lg mx-auto p-3'>
            <h1 className='text-3xl text-center my-7 font-semibold'>Signup</h1>
            <form action='' className='flex flex-col gap-4'>
                <input type="text"  
                placeholder='First Name' 
                name='FirstName' 
                className='p-3 rounded-lg border ' 
                 value={formData.FirstName}
          onChange={handleChange} required />

                <input type="text"  
                placeholder='Last Name' 
                name='LastName' 
                className='p-3 rounded-lg border'  
                value={formData.LastName}
          onChange={handleChange} required/>

                <input type="email" 
                 placeholder='Email'
                  name='email' 
                  className='p-3 rounded-lg border'
                  required
                  value={formData.email}
          onChange={handleChange}
                  />
                <input type="password"  
                placeholder='password' 
                name='password'
                 className='p-3 rounded-lg border' 
                 value={formData.password}
          onChange={handleChange} required
          />

                <input type="password" 
                 placeholder='Confirm password'
                  name='confirmPassword'
                   className='p-3 rounded-lg border'
                   value={formData.confirmPassword}
          onChange={handleChange} required/>

                <input id='image' 
                type="file" 
                name="profileImage" 
                accept='image/*' 
                className='hidden'
          onChange={handleChange} required/>
                <label htmlFor="image" className="flex items-center gap-3 mt-2 mb-2">
                {formData.profileImage ? (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          ) : (
            <img
              src={uploadProfilePic}
              alt="add profile photo"
              className="w-8 h-8"
            />
          )}
              
                <p className='text-lg text-slate-700'>Upload your Photo </p>
                </label>
                <button className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-97 disabled:opacity-80'>Register </button>
            </form>
            <div className="mt-5 flex gap-2">
        <p>Already have an account?</p>

        <Link to={"/login"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
    </div>
    </div>
  )
}

export default RegisterPage
