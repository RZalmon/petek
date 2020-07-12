import React, { useState } from 'react';
import {
    FloatingMenu,
    MainButton,
    ChildButton,
} from 'react-floating-button-menu';
import MdAdd from '@material-ui/icons/Add';
import MdClose from '@material-ui/icons/Clear';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import ListIcon from '@material-ui/icons/List';
import MicIcon from '@material-ui/icons/Mic';

// import SvgIcon from '@material-ui/core/SvgIcon';    //PROBABLY NOT NEEDED
// import styled from 'styled-components' //PROBABLY NOT NEEDED

export default ({ setNoteType, setNoteInputType, setNoteData }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <FloatingMenu
            slideSpeed={500}
            direction="up"
            spacing={8}
            isOpen={isOpen}
            className="button-menu"
        >
            <MainButton
                iconResting={<MdAdd style={{ fontSize: 20 }} nativecolor="white" />}
                iconActive={<MdClose style={{ fontSize: 20 }} nativecolor="white" />}
                backgroundColor="black"
                onClick={() => setIsOpen(!isOpen)}
                size={56}
            />
            <ChildButton
                icon={<TextFieldsIcon style={{ fontSize: 20, fill: '#51a255' }} nativecolor="black" />}
                backgroundColor="white"
                size={40}
                className={!isOpen && 'hidden'}
                onClick={() => { setNoteType('NoteText'); setIsOpen(!isOpen); setNoteInputType('InputText') }}
            />
            <ChildButton
                icon={<ImageIcon style={{ fontSize: 20, fill: '#28b5f2' }} nativecolor="black" />}
                backgroundColor="white"
                size={40}
                className={!isOpen && 'hidden'}
                onClick={() => { setNoteType('NoteImg'); setIsOpen(!isOpen); setNoteInputType('InputImg') }}
            />
            <ChildButton
                icon={<VideocamIcon style={{ fontSize: 20, fill: '#ff0000' }} nativecolor="black" />}
                backgroundColor="white"
                size={40}
                className={!isOpen && 'hidden'}
                onClick={() => { setNoteType('NoteVideo'); setIsOpen(!isOpen); setNoteInputType('InputVideo') }}
            />
            <ChildButton
                icon={<ListIcon style={{ fontSize: 20, fill: '#ffa350' }} nativecolor="black" />}
                backgroundColor="white"
                size={40}
                className={!isOpen && 'hidden'}
                onClick={() => { setNoteType('NoteTodo'); setIsOpen(!isOpen); setNoteInputType('InputTodo'); setNoteData([]) }}
            />
            <ChildButton
                icon={<MicIcon style={{ fontSize: 20, fill: '#7027c3' }} nativecolor="black" />}
                backgroundColor="white"
                size={40}
                className={!isOpen && 'hidden'}
                onClick={() => { setNoteType('NoteSound'); setIsOpen(!isOpen); setNoteInputType('InputSound'); setNoteData('') }}
            />
        </FloatingMenu>
    )
}


// export default class ButtonMenu extends Component {
//     state = {
//         isOpen: false,
//     }
//     render() {
//         return (
//             <FloatingMenu
//                 slideSpeed={500}
//                 direction="down"
//                 spacing={8}
//                 isOpen={this.state.isOpen}
//             >
//                 <MainButton
//                     iconResting={<MdAdd style={{ fontSize: 20 }} nativecolor="white" />}
//                     iconActive={<MdClose style={{ fontSize: 20 }} nativecolor="white" />}
//                     backgroundColor="black"
//                     onClick={() => this.setState({ isOpen: !this.state.isOpen })}
//                     size={56}
//                 />
//                 <ChildButton
//                     icon={<TextFieldsIcon style={{ fontSize: 20, fill: '#51a255' }} nativecolor="black" />}
//                     backgroundColor="white"
//                     size={40}
//                     onClick={() => console.log('First button clicked')}
//                 />
//                 <ChildButton
//                     icon={<ImageIcon style={{ fontSize: 20, fill: '#28b5f2' }} nativecolor="black" />}
//                     backgroundColor="white"
//                     size={40}
//                 />
//                 <ChildButton
//                     icon={<VideocamIcon style={{ fontSize: 20, fill: '#ff0000'}} nativecolor="black" />}
//                     backgroundColor="white"
//                     size={40}
//                 />
//                 <ChildButton
//                     icon={<ListIcon style={{ fontSize: 20, fill: '#ffa350' }} nativecolor="black" />}
//                     backgroundColor="white"
//                     size={40}
//                 />
//             </FloatingMenu>
//         )
//     }
// }
