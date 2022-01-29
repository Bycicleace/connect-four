import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import "./UserBio.css";

const Profile = (props) => {
  const userId = Auth.getProfile().data._id;

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
          {/* // # of active games?
        // # of games completed?
        //# of completed games?
        // Win percentage? */}
        </div>
      </div>
    </div>
  );
};
export default Profile;
