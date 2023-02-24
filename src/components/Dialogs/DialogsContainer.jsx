import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirectHOC } from '../../hoc/authRedirect';
import { sendMessageAC } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: (newMessageBody) => { dispatch(sendMessageCreator(newMessageBody)) }
//     }
// }

const DialogsContainer = compose(connect(mapStateToProps, { sendMessageAC }), withAuthRedirectHOC)(Dialogs)
export default DialogsContainer
// let AuthRedirectComponent = withAuthRedirectHOC(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

// const DialogsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let messageBodyChange = (body) => {
//                         store.dispatch(newMessageBodyCreator(body));
//                     }
//                     let addMessage = () => {
//                         store.dispatch(sendMessageCreator());
//                     }

//                     return (
//                         <Dialogs dialogsPage={store.getState().dialogsPage}
//                             messageBodyChange={messageBodyChange} addMessage={addMessage} />
//                     )
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }

