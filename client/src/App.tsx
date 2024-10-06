import { MouseEvent, useState } from "react";
import { trpc } from "../trpc";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App({ uuid }: { uuid: string }) {
  const [nickname, setNickname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const loginMutation = trpc.login.useMutation({
    onSuccess() {
      setLoggedIn(true);
    },
  });

  const login = (e: MouseEvent) => {
    e.preventDefault();
    loginMutation.mutate({ id: uuid, nickname });
  }

  return loggedIn
    ? <Chat uuid={uuid} />
    : <Login nickname={nickname} setNickname={setNickname} login={login} />
}

export default App;