import supabase from "../config/supabaseClient";
import {useState} from 'react'
const LoginPage = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")


    
    
     const registerUser = async (e) => {
        e.preventDefault();
const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })
         console.log(data,error)
        // console.log(email,password)
         
     }

    return (
        <div>
            <h2>LOGIN PAGE</h2>
            <form>
                <div>
                    <label htmlFor="email">
                        Email<br/>
                        <input value={email}  onChange={(e) => setEmail(e.target.value)} id="email" type="text" />
                    </label>
                </div>
                <div>
                    <label htmlFor="haslo">
                        Haslo<br/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} id="haslo" type="text" />
                    </label>
                </div>
                <button onClick={registerUser}>Register</button>
            </form>
          
        </div>
    )
}
export default LoginPage;