import React, { useEffect, useState } from "react"

export const ProfileStatusHook = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const acivateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMod = () => {
        setEditMode(false)
        props.updateUserStatusTC(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status: </b>
                    <span onDoubleClick={acivateEditMode}>{props.status ? props.status : 'No status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMod} value={status}
                        onChange={onStatusChange}></input>
                </div>
            }
        </div >
    )
}