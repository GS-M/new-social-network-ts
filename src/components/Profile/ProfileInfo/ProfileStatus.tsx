// Просто как пример что можно и на классовой

import React from "react"

type propsType = {
    status: string
    updateUserStatusTC: (newStatus: string) => void
}
type stateType = {
    editMode: boolean
    status: string
}
export class ProfileStatus extends React.Component<propsType, stateType> {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMod = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMod = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatusTC(this.state.status)
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ status: e.currentTarget.value })
    }

    componentDidUpdate = (prevProps: propsType, prevState: stateType) => {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMod}>{this.props.status ? this.props.status : 'No status'}</span>
                    </div>
                    :
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMod} value={this.state.status}
                            onChange={this.onStatusChange}></input>
                    </div>
                }
            </div >
        )
    }
}