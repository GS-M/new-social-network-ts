import classes from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.item}>
            <img alt='miniAvatar' src='https://zoolegenda.ru/common/htdocs/upload/thumbs/breed_medium/mops_59f0a3.png' />
            {props.message}
            <div>
                <span>like </span>{props.likesCount}
            </div>
        </div>
    )
}
export default Post