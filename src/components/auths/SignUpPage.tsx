import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATH_AUTH } from "../../routes/paths";
import { useStore } from "../../hooks/useStore";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { supabase } = useAuth(); // Assuming your useAuth hook exposes a signUp method
  const { rootStore } = useStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { user, error: signUpError } = await supabase.signUp(
        email,
        password
      );
      console.log("🚀 ~ handleSubmit ~ signUpError:", signUpError);
      console.log("🚀 ~ handleSubmit ~ user:", user);

      if (signUpError || !user) throw signUpError;

      // rootStore.app?.profile.insertProfile({ id: user.id, username: user.email });

      navigate(PATH_AUTH.login); // Navigate to login page or dashboard as per your flow
    } catch (error) {
      alert("Error signing up");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", cursor: "pointer" }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
