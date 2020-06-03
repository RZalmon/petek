import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input';

export default class ContactFilter extends Component {
    state = { term: '' };

    constructor(props) {
        super(props);
        this.state = { ...props.filterBy };
    }

    onChangeHandler = (ev) => {
        const { value, name } = ev.target;
        console.log(name, ':', value);
        
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
        return (
            <form>
                <DebounceInput
                    minLength={0}
                    debounceTimeout={500}
                    type="text"
                    placeholder="Contact Name"
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
