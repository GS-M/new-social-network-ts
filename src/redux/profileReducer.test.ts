import { actions, profileReducer } from "./profileReducer";

let state = {
    postsData: [
        { id: 1, message: 'First post', likesCount: 3 },
        { id: 2, message: 'Second post', likesCount: 28 }
    ],
    profile: null,
    status: ''
}

test('new post shold be added', () => {
    let action = actions.addPostActionCreator('new text for post')
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(3)
});
test('after deleting length of message should be decrement', () => {
    let action = actions.deletePostAC(1)
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(1)
});
test('after deleting length of posts should not be decrement if ID is incorect', () => {
    let action = actions.deletePostAC(1000)
    let newState = profileReducer(state, action)
    expect(newState.postsData.length).toBe(2)
});
test('text in the post should be correct', () => {
    let action = actions.addPostActionCreator('new text for post')
    let newState = profileReducer(state, action)
    expect(newState.postsData[2].message).toBe('new text for post')
});
