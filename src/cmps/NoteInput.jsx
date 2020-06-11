import React from 'react';

export default (props) => {

    // onChangeHandler = (ev) => {
    //     const { value, name } = ev.target;
    //     console.log(name, ':', value);
        
    //     this.setState({ [name]: value }, () => {
    //         this.props.onFilter({ ...this.state });
    //     });
    // };

    return (
        <form className="note-input">
            <input type="text" />
        </form>
    )
}