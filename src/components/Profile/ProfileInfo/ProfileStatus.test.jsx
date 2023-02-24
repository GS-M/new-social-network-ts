import { create } from "react-test-renderer"
import { ProfileStatusHook } from "./ProfileStatusHook"

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatusHook status='Super Eva' />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('Super Eva')
    })
})