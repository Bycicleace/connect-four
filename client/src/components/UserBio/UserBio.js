import { QUERY_USER, QUERY_GAMES } from '../../utils/queries';
import Auth from "../../utils/auth";
import "./UserBio.css";
import { ADD_GAME } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

const Profile = (props) => {
  const userId = Auth.getProfile().data._id;
  const [createGame] = useMutation(ADD_GAME);
const { gameData } = useQuery(QUERY_GAMES);
const game = gameData?.games;

const handleCreateGame = (event, username) => {
  event.preventDefault();
console.log('test')
  try {
    createGame({
      variables: {
        player1:username,
      },
    });
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { id: userId },
  }); //where do we get the id for after Query user?

  if (loading) {
    return <div>Loading...</div>;
  };

  return (
    <div>
      <div>
        <h2 className="userNameHeader">{`${data.user.username}`}</h2>
        <div>
          <h3>Statistics </h3>
          <p>Wins: {`${data.user.wins}`}</p>
          {/* 
        // # of games completed?
        //# of completed games?
        // Win percentage? */}
        </div>
        <button
              onClick={(e) => handleCreateGame(e,data.user.username)}
              className="activeGames__card-title"
            >
             Create a Game!
            </button>
      </div>
    </div>
  );
};
export default Profile;
