import React, { useState } from 'react';
import userStories from '../data/userStories.json';
import backTasks from '../data/backlogTasks.json';
import BacklogTable from './BacklogTable.jsx';

const ProductBacklog = () => {
    const [stories, setStories] = useState(userStories); 
    const [tasks, setTasks] = useState(backTasks); 
    let blTask= []; 

    // Zusammenführen von stories und tasks
    for (let i = 0; i < stories.length; i++) {
        if (stories[i].usId === tasks[i].blId)
            blTask.push({...stories[i], ...tasks[i]});
    };
    console.log(blTask);
    
    return (
        <div>
            <h1>Product Backlog</h1>
            <BacklogTable blEntry={blTask}/>
        </div>
    );
};

export default ProductBacklog;