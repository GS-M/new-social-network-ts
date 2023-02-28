
import { UserType } from '../../common-types/common-types';
import { FilterType } from '../../redux/usersReduser';
import { Paginator } from '../common/Paginator/Paginator';
import { User } from './User';
import { UsersSearchForm } from './UsersSearchForm';
//import { usersAPI } from '../../api/api';

type propsType = {
    totalUsersCount: number
    pageSize: number
    curentPage: number
    users: Array<UserType>
    folowingInProgress: Array<number>

    onFilterChanged: (filter: FilterType) => void
    onPageChanged: (pageNumber: number) => void
    followTC: (userId: number) => void   ///
    unfollowTC: (userId: number) => void  ///
}

export const Users: React.FC<propsType> = (props) => {
    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged} />
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
