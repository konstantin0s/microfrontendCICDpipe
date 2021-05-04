import UserItem from './UserItem';


const UserList = (props: any) => {
    if (props.users.length === 0) {
        return <h2 className="users-list__fallback">
            Found no user
        </h2>
    }

    return (
        <ul className="users-list" style={userStyle}>
            {props.users.map((item: any) => (
                <UserItem key={item.id} onClickUser={props.onClickUser} username={item.username} 
                name={item.name}
                id={item.id} />
  ))}
        </ul>
    )
}

const userStyle = {
    borderRadius: "12px",
    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.25)",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    minWidth: "100%",
    gridGap: "40px 10px",
    alignItems: "center",
    padding: "0.5rem",
    margin: "1rem 0",
    backgroundColor: "#4b4b4b",
    color: "#fff"
}


export default UserList;