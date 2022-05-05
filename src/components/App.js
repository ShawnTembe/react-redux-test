import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import { requestUsers } from "../store/action";
import { ITEMS } from './data';

import "./App.css";

import { CircleFill, ThreeDotsVertical, Kanban } from 'react-bootstrap-icons';

const headings = ['Worker ID', 'Worker Name', 'Overtime', 'Manual Hours', 'Hours', 'Total Hours']

const DragHandle = SortableHandle(() => (
    <ThreeDotsVertical size={24} color="darkgray" />
));

const SortableItem = SortableElement(({ value }) => (
    <tr>
        <td scope="row" data-label={headings[0]} className="td-id">{value.id}</td>
        <td data-label={headings[1]} className="td-worker-name"><CircleFill color={`${value.status ?? 'red'}`} size={10} />&nbsp;&nbsp;{value.workerName}</td>
        <td data-label={headings[2]}>{value.extraHours}</td>
        <td data-label={headings[3]}>{value.manualHours}</td>
        <td data-label={headings[4]}>{value.hours}</td>
        <td data-label={headings[5]}>{value.totalHours}</td>
        <td data-label="View employee related statistics"><a href=""><Kanban size={24} color="darkgray" style={{ transform: 'rotate(180deg)' }} /></a></td>
        <td className="drag"><DragHandle /></td>
    </tr>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <table>
            <thead>
                <tr>
                    {headings.map((heading, i) => (
                        <th key={`th-${i}`} scope="col">{heading}</th>
                    ))}
                    <th className="" colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((value, index) => (
                    <SortableItem
                        key={`worker_${Math.random()}`}
                        index={index}
                        value={value}
                    />
                ))}
            </tbody>
        </table>
    );
});

const SortableComponent = () => {
    const { usersData, isLoading } = useSelector((state) => state);
    const [data, setData] = useState(ITEMS);

    const dispatch = useDispatch();

    let onSortEnd = ({ oldIndex, newIndex }) => {
        setData(() => arrayMove(data, oldIndex, newIndex));
    };

    useEffect(() => {
        dispatch(requestUsers(data));
    }, []);

    {console.log('ITEMS', data)}

    return (
        <>
            {isLoading && <div className="loading">Users loading...</div>}
            
            <div className="table-container">
                <SortableList items={data} onSortEnd={onSortEnd} useDragHandle={true} />
            </div>
        </>
    );
};

export default SortableComponent;