import React from 'react';
import { Card } from 'react-bootstrap';

const UserStory = ({title, role, aim, benefit, dod}) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <p>{role} {aim}, {benefit}.</p>
                </Card.Text>
                <Card.Footer>Definition of Done: {dod}</Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default UserStory;