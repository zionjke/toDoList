import React from 'react'
import addSvg from '../../assets/img/add.svg'
import closeSvg from '../../assets/img/close.svg'
import './AddList.scss'
import AddNewItemForm from "../AddNewItemForm";

type StateType = {
    visiblePopup:boolean
}

type OwnPropsType = {
    addTodoList:(title:string) => void
}

class AddList extends React.Component<OwnPropsType,StateType> {

    state:StateType = {
        visiblePopup: false
    };

    setVisiblePopup = () => {
        this.setState({
            visiblePopup: true
        })
    };

    closePopup = () => {
        this.setState({
            visiblePopup: false
        })
    };

    render() {
        return(
            <div className='add-list'>
                <ul onClick={this.setVisiblePopup}>
                    <li className='add-list__add-button'>
                        <img src={addSvg} alt="Add icon"/>
                        <span>Добавить список</span>
                    </li>
                </ul>
                {this.state.visiblePopup &&
                <div className="add-list__popup">
                    <img
                        onClick={this.closePopup}
                        src={closeSvg}
                        alt="Close button"
                        className="add-list__popup-close-btn"
                    />
                    <AddNewItemForm btnname='Добавить список'
                                    addItem={this.props.addTodoList}
                                    closePopup={this.closePopup}
                                    placeholder='Название списка'/>
                </div> }
            </div>
        )
    }
}

export default AddList