import { connect } from 'react-redux';
import { compose } from 'redux';
import { dialogsDataType, messagesDataType } from '../../common-types/common-types';
import { withAuthRedirectHOC } from '../../hoc/authRedirect';
import { sendMessageAC } from '../../redux/dialogsReducer';
import { globalStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

type mapStatePropsType = {
    dialogsData: Array<dialogsDataType>
    messagesData: Array<messagesDataType>
}
type mapDispatchPropsType = {
    sendMessageAC: (message: string) => void
}
type ownPropsType = {
}
let mapStateToProps = (state: globalStateType): mapStatePropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: (newMessageBody) => { dispatch(sendMessageCreator(newMessageBody)) }
//     }
// }

export const DialogsContainer = compose(
    connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, globalStateType>
        // @ts-ignore
        (mapStateToProps, { sendMessageAC }), withAuthRedirectHOC)(Dialogs)
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

