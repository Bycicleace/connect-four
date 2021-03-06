import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import "./UserBio.css";
import { ADD_GAME } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

const UserBio = (props) => {
  const { openGames, setOpenGames } = props;

  const userId = Auth.getProfile().data._id;
  const [createGame] = useMutation(ADD_GAME);

  const handleCreateGame = (event) => {
    event.preventDefault();
    try {
      createGame();
      // window.location.reload();
      setOpenGames(openGames + 1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateComputerGame = (event) => {
    event.preventDefault();
    try {
      createGame({
        variables: {
          hasComputer: true
        }
      }).then(gameData => {
        console.log(gameData);
        window.location.replace('/game/' + gameData.data.addGame._id);
      })
    } catch (e) {
      console.error(e);
    }
  }

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { id: userId },
  }); //where do we get the id for after Query user?

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="userBio__container">
      <div className="userBio__bio-card">
        <h2 className="userBio__usernameHeader">{`${data.user.username}`}</h2>
        <div className="userBio__stats-container">
          {/* <h3 className="userBio__stats-header">Statistics </h3>
          <p className="userBio__stats-text">Wins: {`${data.user.wins}`}</p> */}
          {/* 
        // # of games completed?
        //# of completed games?
        // Win percentage? */}
        </div>
        <button
          onClick={(e) => handleCreateGame(e)}
          className="userBio__button"
        >
          Create a Game!
        </button>
        <button
          onClick={(e) => handleCreateComputerGame(e)}
          className="userBio__button"
        >
          Play Computer!
        </button>
      </div>
    </div>
  );
};
export default UserBio;
