import React from 'react'

import removeSvg from '../../assets/img/remove.svg'
import starSvg from '../../assets/img/star.svg'
import './List.scss'


class List extends React.Component {

    removeList = list => {
        if(window.confirm('Вы действительно хотите удалить список?')) {

        }
    }

    render() {
        return (
                <ul className="list">
                    {this.props.lists.map((list) => (
                        <li key={list.id}
                            className={this.props.activeList
                            && this.props.activeList.id === list.id
                            && 'active'}
                            onClick={() => this.props.onClickList(list)}>
                            <img
                                className='list__star-icon'
                                src={starSvg}
                                alt="Star icon"
                            />
                            <span>
                                {list.title}
                                {list.tasks && ` (${list.tasks.length}) `}
                            </span>
                            <img
                                className="list__remove-icon"
                                src={removeSvg}
                                alt="Remove icon"
                                onClick
                                />
                        </li>
                    ))}
                </ul>
        );
    }
}

export default List