import React from 'react';
import './Footer.scss'

class TodoListFooter extends React.Component {


    onAllFilterClick = () => {this.props.changeFilter("All")};
    onCompletedFilterClick = () => {this.props.changeFilter("Completed")};
    onActiveFilterClick = () => {this.props.changeFilter("Active")};

    render = () => {

        let classForAll = this.props.filterValue === "All" ? "button-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "button-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "button-active" : "";

        return (
            <>
                {this.props.tasks && this.props.tasks.length >= 1 && <div className="todo__footer">
                     <div>
                        <button  onClick={this.onAllFilterClick} className={`${classForAll} button`}>Все</button>
                        <button onClick={this.onCompletedFilterClick} className={`${classForCompleted} button`}>Выполненные</button>
                        <button onClick={this.onActiveFilterClick} className={`${classForActive} button`}>Активные</button>
                    </div>
                </div> }

            </>

        );
    }
}

export default TodoListFooter;

