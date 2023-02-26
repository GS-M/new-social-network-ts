import { useEffect, useState } from "react"

type Propstype = {
    status: string
    updateUserStatusTC: (status: string) => void
}
export const ProfileStatusHook: React.FC<Propstype> = (props) => {

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
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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