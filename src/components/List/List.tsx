import React from 'react'
import removeSvg from '../../assets/img/remove.svg'
import starSvg from '../../assets/img/star.svg'
import './List.scss'
import {TodoType} from "../../types/entities";

type OwnPropsType = {
    deleteTodolist:(todoId:string) => void
    lists:Array<TodoType>
    activeList: any
    onClickList:(list:any) => void
}

class List extends React.Component<OwnPropsType> {

    deleteList = (list:any) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            this.props.deleteTodolist(list.id)
        }
    };

    render() {

        return (
                <ul className="list">
                    {this.props.lists.map((list) => (
                        <li key={list.id}
                            // className={ (this.props.activeList.id === list.id) && 'active'}
                            onClick={() => this.props.onClickList(list)}>
                            <img
                                className='list__star-icon'
                                src={starSvg}
                                alt="Star icon"
                            />

                                <span>
                                    {list.title}
                                </span>

                            <img
                                className="list__remove-icon"
                                src={removeSvg}
                                alt="Remove icon"
                                onClick={() => this.deleteList(list)}
                                />
                        </li>
                    ))}
                </ul>
        );
    }
}

export default List