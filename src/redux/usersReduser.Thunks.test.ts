import { DefaultResponceType, ResultCodeEnum } from "../api/api"
import { usersAPI } from "../api/users-api"
import { followTC, actions, unfollowTC } from "./usersReduser"

jest.mock("../api/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: DefaultResponceType = {
    data: {},
    resultCode: ResultCodeEnum.Success,
    messages: []
}

usersAPIMock.followUser.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))

test('follow thunk', async () => {
    const thunk = followTC(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenLastCalledWith(1, actions.toggleIsFolowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenLastCalledWith(2, actions.followAC(1))
    expect(dispatchMock).toHaveBeenLastCalledWith(3, actions.toggleIsFolowingProgressAC(false, 1))
})

test('follow thunk', async () => {
    const thunk = unfollowTC(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenLastCalledWith(1, actions.toggleIsFolowingProgressAC(true, 1))
    expect(dispatchMock).toHaveBeenLastCalledWith(2, actions.unfollowAC(1))
    expect(dispatchMock).toHaveBeenLastCalledWith(3, actions.toggleIsFolowingProgressAC(false, 1))
})