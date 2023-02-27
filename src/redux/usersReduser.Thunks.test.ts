import { DefaultResponceType, ResultCodeEnum } from "../api/api"
import { usersAPI } from "../api/users-api"
import { followTC, actions } from "./usersReduser"
jest.mock("../api/users-api")
const usersAPIMock = usersAPI
const result: DefaultResponceType = {
    data: {},
    resultCode: ResultCodeEnum.Success,
    messages: []
}
//@ts-ignore
usersAPIMock.followUser.mockReturnValue(Promise.resolve(result))

test('', async () => {
    const thunk = followTC(1)
    const dispatchMock = jest.fn()
    //@ts-ignore
    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenLastCalledWith(1, actions.toggleIsFolowingProgressAC(true, 3))
    expect(dispatchMock).toHaveBeenLastCalledWith(1, actions.followAC(3))
    expect(dispatchMock).toHaveBeenLastCalledWith(1, actions.toggleIsFolowingProgressAC(false, 3))
})