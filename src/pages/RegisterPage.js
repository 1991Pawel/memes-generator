import supabase from "../config/supabaseClient";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    // console.log(user);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data) {
      sessionStorage.setItem("user_id", JSON.stringify(data.session.user.id));
      sessionStorage.setItem(
        "token",
        JSON.stringify(data.session.access_token)
      );
      console.log(data);
      setUser(data);
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h2>LOGIN PAGE</h2>
      {console.log(user?.session.access_token)}
      <form>
        <div>
          <label htmlFor="email">
            Email
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="text"
            />
          </label>
        </div>
        <div>
          <label htmlFor="haslo">
            Haslo
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="haslo"
              type="text"
            />
          </label>
        </div>
        <button onClick={loginUser}>LOGIN</button>
        <button onClick={registerUser}>Register</button>
      </form>
      {/* <form>
        <div>
          <label htmlFor="email">
            Email
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="text"
            />
          </label>
        </div>
        <div>
          <label htmlFor="haslo">
            Haslo
            <br />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="haslo"
              type="text"
            />
          </label>
        </div>
        <button onClick={registerUser}>Register</button>
      </form> */}
    </div>
  );
};
export default LoginPage;
