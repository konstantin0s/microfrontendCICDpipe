import React from 'react';
import Card from "./Card";


const UserItem = (props: any) => {

console.log(props);

    return (
        <Card className="card-item" id={props.oneUser.id}>
         <div className="card-item__username">
             <h2 className=""> {props.oneUser.username}</h2>
            <div className="card-item__name"> {props.oneUser.name}</div>
        </div>
    </Card>
    )
}



export default UserItem;