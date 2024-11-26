import { ChangeEvent } from "react";
import type { LoginPropTypes } from "../../types";

const Login = ({ nickname, setNickname, login }: LoginPropTypes) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);
  }

  return (
    <div id="login-form-container" className="flex justify-center items-center w-full h-full">
      <form id="login-form" className="flex flex-col w-80 justify-center border-2 border-black p-8 bg-queen-blue rounded-lg shadow-lg"
        autoComplete="off">
        <label htmlFor="nickname" className="text-xl text-black font-semibold">Nickname</label>
        <input id="nickname" type="text" value={nickname} onChange={handleChange} className="font-xl p-3 mt-2 rounded-lg bg-bubbles" />
        <button className="border border-black rounded-md p-2 mt-8 font-bold bg-medium-ruby" onClick={login}>Login</button>
      </form>
    </div>
  );
}

export default Login;