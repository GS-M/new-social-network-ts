import { NavLink } from 'react-router-dom';
import cs from './DialogItem.module.css'

const DialogItem = (props) => {
    return (
        <div className={cs.dialog}>
            <img className={cs.avatar} alt="" src='https://zoolegenda.ru/common/htdocs/upload/thumbs/breed_medium/mops_59f0a3.png' />
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;