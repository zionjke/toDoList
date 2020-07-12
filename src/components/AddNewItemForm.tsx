import React, {ChangeEvent} from 'react';

type StateType = {
    error:boolean,
    title:string
}

type OwnPropsType = {
    addItem:(title:string)=>void
    closePopup?:()=>void
    toggleFormVisible?:()=>void
    placeholder:string
    btnname:string
    cancelButton?:any
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {

    state:StateType = {
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
            this.props.addItem(newTitle);
            this.props.closePopup && this.props.closePopup();
            this.props.toggleFormVisible && this.props.toggleFormVisible();
        }

    };

    onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
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

