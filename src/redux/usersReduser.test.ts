import { actions, InitialStateType, usersReducer } from "./usersReduser"

let state: InitialStateType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Iva 0',
                followed: false,
                status: 'im alive',
                photos: { small: null, large: null }
            },
            {
                id: 1,
                name: 'Iva 1',
                followed: false,
                status: 'im alive',
                photos: { small: null, large: null }
            },
            {
                id: 2,
                name: 'Iva 2',
                followed: true,
                status: 'im alive',
                photos: { small: null, large: null }
            },
            {
                id: 3,
                name: 'Iva 3',
                followed: true,
                status: 'im alive',
                photos: { small: null, large: null }
            }
        ],
        pageSize: 8,
        totalUsersCount: 0,
        curentPage: 1,
        isLoading: false,
        folowingInProgress: [],
        filter: { term: '' }
    }
})

test('follow success', () => {
    const newState = usersReducer(state, actions.followAC(1))
    expect(newState.users[0].followed).toBe(false)
    expect(newState.users[1].followed).toBe(true)
})
test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowAC(3))
    expect(newState.users[3].followed).toBe(false)
    expect(newState.users[2].followed).toBe(true)
})