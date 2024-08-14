import React from 'react';
import { Table } from 'react-bootstrap';

const BacklogTable = ({ blEntry }) => {

    return (
        <Table striped bordered hover> 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>UserStory</th>
                    <th>Priorität</th>
                    <th>StoryPoints</th>
                    <th>Sprint</th>
                    <th>Definition of Done</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {blEntry.map(entry => (
                   <tr key={entry.blId}>
                        <td>{entry.blId}</td>
                        <td>{entry.role} {entry.aim}, {entry.benefit}</td>
                        <td>{entry.priority}</td>
                        <td>{entry.storyPoints}</td>
                        <td>{entry.sprint}</td>
                        <td>{entry.dod}</td>
                        <td>{entry.status}</td>
                   </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default BacklogTable;
