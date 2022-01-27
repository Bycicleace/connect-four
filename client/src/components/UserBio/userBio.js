import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../utils/query';

 const Profile = (props) => {
     const{ loading, data } =useQuery(useParams ? QUERY_USER:id ) //where do we get the id for after Query user?
 

 return(
     <div>
<div>
    {/* <h2 className='userNameHeader'>{userParam ? ${user.username}}</h2> */}
    <div>
        <h3>Statistics</h3>
        {/* <p>Wins: {userParam ? ${user.wins}}</p> */}
        // # of active games?
        // # of games completed?
        //# of completed games?
        // Win percentage?
    </div>
</div>

     </div>
 )
    }