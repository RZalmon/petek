import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input';

export default class Filter extends Component {
    state = { term: '' };

    constructor(props) {
        super(props);
        this.state = { ...props.filterBy };
    }

    onChangeHandler = (ev) => {
        
        const { value, name } = ev.target;
        
        this.setState({ [name]: value }, () => {
            this.props.onFilter({ ...this.state });
        });
    };
    onKeyHandler = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault()
            this.props.moveToContact()
        }
    }

    render() {

        const {placeHolder} = this.props
        
        return (
            <form>
                <DebounceInput
                    minLength={0}
                    debounceTimeout={300}
                    type="text"
                    placeholder={placeHolder ? placeHolder: 'Search Contacts'}
                    onChange={this.onChangeHandler}
                    name="term"
                    value={this.state.term}
                    onKeyDown={this.onKeyHandler}
                     />
                {/* <input
                    type="text"
                    placeholder="Contact Name"
                    onChange={this.onChangeHandler}
                    name="term"
                    value={this.state.term}
                    onKeyDown={this.onKeyHandler}
                /> */}
            </form>
        )
    }
}
