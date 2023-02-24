import { Paginator } from '../common/Paginator/Paginator';
import { User } from './User';
//import { usersAPI } from '../../api/api';


export const Users = (props) => {
    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}
                curentPage={props.curentPage}
                onPageChanged={props.onPageChanged} />
            {props.users.map(u =>
                <User key={u.id}
                    user={u}
                    folowingInProgress={props.folowingInProgress}
                    followTC={props.followTC}
                    unfollowTC={props.unfollowTC} />
            )}
        </div>
    )
}