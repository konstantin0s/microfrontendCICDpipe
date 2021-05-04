// import './Card.css';

const Card = (props: any) => {

    const getUserHandler = () => {
        props.onClick(props.id)
    }
    // console.log(props);
    
    return (
        <div className="card" onClick={getUserHandler}
        style={cardStyle}>
            {props.children}
        </div>
    )
}

const cardStyle = {
    fontSize: "16px",
    display: "flex",
    FlexGrow: "1",
    flex:   "1",
	height: "auto",
    width: "100%",
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "12px",
    cursor: "pointer",
    padding: "10px 5px",
}

export default Card;