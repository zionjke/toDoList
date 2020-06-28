import React from 'react';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title: ""
    };

    onAddItemClick = () => {
        let newTitle = this.state.title.trim();
        if (newTitle === "") {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false,
                title: ""
            });
            this.props.addItem(newTitle)
            {this.props.closePopup && this.props.closePopup()}
            {this.props.toggleFormVisible && this.props.toggleFormVisible()}
        }

    };

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };

    render = () => {

        let classForInput = this.state.error ? "error" : "";

        return (
                    <>
                        <input
                            placeholder={this.props.placeholder}
                            className={`field ${classForInput}`}
                            onChange={this.onTitleChanged}
                            onKeyPress={this.onKeyPress}
                            value={this.state.title}
                            type="text"
                        />
                        <button className='button' onClick={this.onAddItemClick}>{this.props.btnname}</button>
                        {this.props.cancelButton &&
                        <button onClick={this.props.toggleFormVisible} className='button button--grey'>Отмена</button>
                        }
                    </>
        );
    }
}

export default AddNewItemForm;

