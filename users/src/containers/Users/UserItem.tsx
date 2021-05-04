import Card from "../../components/UI/Card"


const UserItem = (props: any) => {


    return (
        <Card className="card-item" id={props.id} onClick={props.onClickUser}>
         <div className="card-item__username">
             <h2 className=""> {props.username}</h2>
            <div className="card-item__name"> {props.name}</div>
        </div>
    </Card>
    )
}



export default UserItem;