import "./App.css";
import {useState} from "react";
import axios from "axios";

const App = () => {
  const [username, setUserName] = useState('');
  const [userChosen, setUserChosen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchUser= () => {
    axios.get(`https://api.github.com/users/${username}`).then(
      (res) => {
        setUser({
          name: username,
          alias: res.data.name,
          image: res.data.avatar_url,
          dateCreate: res.data.created_at,
          followers: res.data.followers,
          location: res.data.location,
          repos: res.data.public_repos,
        });
        setUserChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Buscador de usuarios de Github</h1>
        <input type="text" 
        onChange={(event) => {
          setUserName(event.target.value)
        }}/>
        <button onClick={searchUser}>Buscar usuario</button>
      </div>
      <div className="card">
        {!userChosen ? (
          <h1> introduce el nombre de usuario</h1>
        ) : (
          <>
            <h1>{user.name}</h1>
            <img src={user.image} alt={user.name} />
            <h3>Alias: {user.alias}</h3>
            <h3>Location: {user.location}</h3>
            <h3>Followers: {user.followers}</h3>
            <h3>Public repos: {user.repos}</h3>
            <h3>Date create: {user.dateCreate}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
