import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function Recipe(props) {
    const [like, setLike] = useState(0);

    function handleLike(){
      setLike(like+1);
    }
    return <Card>
      <h2>{props.name}</h2>
      <p>by {props.author}</p>
      <p>{like} people liked this recipe!</p>
      <Button onClick={handleLike}>Like this Recipe!</Button>
    </Card>
}