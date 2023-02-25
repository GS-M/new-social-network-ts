import cs from './Users.module.css'
import usersDefaultAvatar from '../../accets/images/usersDefaultAvatar.jpg'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../common-types/common-types';
//import { usersAPI } from '../../api/api';

type propsType = {
    user: UserType
    folowingInProgress: Array<number>
    unfollowTC: (userId: number) => void
    followTC: (userId: number) => void
}

export const User: React.FC<propsType> = (props) => {
    let u = props.user
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img alt="avatar" className={cs.avatar}
                            src={props.user.photos.small != null ? props.user.photos.small : usersDefaultAvatar} />
                    </NavLink>
                </div>
                <div>
                    {props.user.followed
                        ? <button disabled={props.folowingInProgress.some(id => id === props.user.id)}
                            onClick={() => {
                                props.unfollowTC(props.user.id)

                                //axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, { withCredentials: true })

                                // props.toggleIsFolowingProgressAC(true, u.id)
                                // usersAPI.unfollowUser(u.id)
                                //     .then(data => {
                                //         if (data.resultCode === 0) {
                                //             props.unfollowUser(u.id)
                                //         }
                                //         props.toggleIsFolowingProgressAC(false, u.id)
                                //     })
                            }}>Unfollow</button>
                        : <button disabled={props.folowingInProgress.some(id => id === props.user.id)}
                            onClick={() => {
                                props.followTC(props.user.id)

                                // было
                                // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, { withCredentials: true })

                                //стало
                                // props.toggleIsFolowingProgressAC(true, u.id)
                                // usersAPI.followUser(u.id)
                                //     .then(data => {
                                //         if (data.resultCode === 0) {
                                //             props.followUser(u.id)
                                //         }
                                //         props.toggleIsFolowingProgressAC(false, u.id)
                                //     });
                            }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>

    )
}