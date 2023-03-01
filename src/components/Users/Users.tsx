import { useSelector, useDispatch } from 'react-redux';
import { FilterType, getUsersThunkCreator, followTC, unfollowTC } from '../../redux/usersReduser';
import {
    getCurentPage, getFolowingInProgress, getPageSize,
    getTotalUsersCount, getUsersFilter, getUsersSelector
} from '../../utils/resecelectors/users-selectors';
import { Paginator } from '../common/Paginator/Paginator';
import { User } from './User';
import { UsersSearchForm } from './UsersSearchForm';
import React, { useEffect } from 'react'
import { AppDispatch } from '../../redux/redux-store';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
//import { URLSearchParams } from 'url';
//import { usersAPI } from '../../api/api';

type propsType = {}

export const Users: React.FC<propsType> = (props) => {

    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const curentPage = useSelector(getCurentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const folowingInProgress = useSelector(getFolowingInProgress)

    const dispatch: AppDispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId))
    }

    const location = useLocation()

    const useNavigateSearch = () => {
        const navigate = useNavigate();
        return (pathname: string, params: any) =>
            navigate(`${pathname}?${createSearchParams(params)}`)
    }
    const navigateSearch = useNavigateSearch();

    useEffect(() => {
        navigateSearch('/users', {
            page: `${curentPage}`,
            count: `${pageSize}`,
            term: `${filter.term}`,
            friend: `${filter.friend}`,
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${curentPage}`
        })
    }, [filter, curentPage, pageSize])

    useEffect(() => {
        const query = new URLSearchParams(location.search)

        let actualPage = curentPage;
        let actualFilter = filter;

        const queryFriend = query.get("friend");
        const queryPage = query.get("page");
        const queryTerm = query.get("term");

        if (queryPage) { actualPage = +queryPage; }
        if (queryTerm) { actualFilter = { ...actualFilter, term: queryTerm } }

        switch (queryFriend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false };
                break;
            default:
                break;
        }

        if (users.length === 0) {
            dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
        }
    }, [location.search])

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                curentPage={curentPage}
                onPageChanged={onPageChanged} />
            {users.map(u =>
                <User key={u.id}
                    user={u}
                    folowingInProgress={folowingInProgress}
                    followTC={follow}
                    unfollowTC={unfollow} />
            )}
        </div>
    )
}
