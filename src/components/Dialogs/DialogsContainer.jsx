import { connect } from 'react-redux';
import { compose } from 'redux';
import { dialogsDataType, messagesDataType } from '../../common-types/common-types';
import { withAuthRedirectHOC } from '../../hoc/authRedirect';
import { actions } from '../../redux/dialogsReducer';

import { globalStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData
    }
}
const DialogsContainer = compose(
    connect(mapStateToProps, { sendMessageAC: actions.sendMessageAC }), withAuthRedirectHOC)(Dialogs)
export default DialogsContainer


// type mapStatePropsType = {
//     dialogsData: Array<dialogsDataType>
//     messagesData: Array<messagesDataType>
// }
// type mapDispatchPropsType = {
//     sendMessageAC: (message: string) => void
// }
// type ownPropsType = {
// }
// let mapStateToProps = (state: globalStateType): mapStatePropsType => {
//     return {
//         dialogsData: state.dialogsPage.dialogsData,
//         messagesData: state.dialogsPage.messagesData
//     }
// }
// // let mapDispatchToProps = (dispatch) => {
// //     return {
// //         addMessage: (newMessageBody) => { dispatch(sendMessageCreator(newMessageBody)) }
// //     }
// // }

//  const DialogsContainer = compose(
//     connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, globalStateType>
//         // @ts-ignore
//         (mapStateToProps, { sendMessageAC }), withAuthRedirectHOC)(Dialogs)
// // let AuthRedirectComponent = withAuthRedirectHOC(Dialogs)
// // const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
// export default DialogsContainer
// // const DialogsContainer = () => {
// //     return (
// //         <StoreContext.Consumer>
// //             {
// //                 (store) => {
// //                     let messageBodyChange = (body) => {
// //                         store.dispatch(newMessageBodyCreator(body));
// //                     }
// //                     let addMessage = () => {
// //                         store.dispatch(sendMessageCreator());
// //                     }

// //                     return (
// //                         <Dialogs dialogsPage={store.getState().dialogsPage}
// //                             messageBodyChange={messageBodyChange} addMessage={addMessage} />
// //                     )
// //                 }
// //             }
// //         </StoreContext.Consumer>
// //     )
// // }

