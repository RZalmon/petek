import React, { Component } from 'react'
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

// import SvgIcon from '@material-ui/core/SvgIcon';    //PROBABLY NOT NEEDED
// import styled from 'styled-components' //PROBABLY NOT NEEDED

export default class ButtonMenu extends Component {
    state = {
        isOpen: false,
    }
    render() {
        return (
            <FloatingMenu
                slideSpeed={500}
                direction="right"
                spacing={8}
                isOpen={this.state.isOpen}
            >
                <MainButton
                    iconResting={<MdAdd style={{ fontSize: 20 }} nativecolor="white" />}
                    iconActive={<MdClose style={{ fontSize: 20 }} nativecolor="white" />}
                    backgroundColor="black"
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                    size={56}
                />
                <ChildButton
                    icon={<TextFieldsIcon style={{ fontSize: 20, fill: '#51a255' }} nativecolor="black" />}
                    backgroundColor="white"
                    size={40}
                    onClick={() => console.log('First button clicked')}
                />
                <ChildButton
                    icon={<ImageIcon style={{ fontSize: 20, fill: '#28b5f2' }} nativecolor="black" />}
                    backgroundColor="white"
                    size={40}
                />
                <ChildButton
                    icon={<VideocamIcon style={{ fontSize: 20, fill: '#ff0000'}} nativecolor="black" />}
                    backgroundColor="white"
                    size={40}
                />
                <ChildButton
                    icon={<ListIcon style={{ fontSize: 20, fill: '#ffa350' }} nativecolor="black" />}
                    backgroundColor="white"
                    size={40}
                />
            </FloatingMenu>
        )
    }
}
