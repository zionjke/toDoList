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
                            className={`field ${classForInput}`}
                            onChange={this.onTitleChanged}
                            onKeyPress={this.onKeyPress}
                            value={this.state.title}
                            type="text"
                        />
                        <button className='button' onClick={this.onAddItemClick}>{this.props.btnname}</button>
                    </>
        );
    }
}

export default AddNewItemForm;

