import { Card } from "react-bootstrap";
import { Col } from "react-bootstrap";
const Student = (props) => {
  console.log(props.myKey);
  return (
    <Col xs={12} md={6} lg={4} xl={3}>
      <Card className="p-3 h-100 shadow-sm">
        <Card.Body className="d-flex flex-column">
          <h2>
            {props.name.first} {props.name.last}
          </h2>
          {/* TODO Student data goes here! */}
            <p>
              <strong>{props.major}</strong>
            </p>
            <p>
              {`${props.name.first} is taking ${props.numCredits} credits and ` +
                (props.fromWisconsin ? "is" : "is not") +
                " from Wisconsin."}
            </p>
            <p>{`He(She) has ${props.interests.length} interests including...`}</p>
            <ul>
              {props.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Student;