import { userType } from '../../common-types/common-types';
import { Paginator } from '../common/Paginator/Paginator';
import { User } from './User';
//import { usersAPI } from '../../api/api';

type propsType = {
    totalUsersCount: number
    pageSize: number
    curentPage: number
    users: Array<userType>
    folowingInProgress: Array<number>

    onPageChanged: (pageNumber: number) => void
    followTC: (userId: number) => void   ///
    unfollowTC: (userId: number) => void  ///
}

export const Users: React.FC<propsType> = (props) => {
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