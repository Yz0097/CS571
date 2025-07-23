import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

export default function FeaturedItem(props) {
  const [showNutrition, setShowNutrition] = useState(false);
  function handleShowNutrition() {
    setShowNutrition(true);
  }

  function handleHideNutrition() {
    setShowNutrition(false);
  }

  return (
    <Card style={{maxWidth: "40rem", margin: "auto", textWrap: "pretty"}}>
      {/* <p>I should display the feature that was passed to me...</p> */}
      <img
        src={props.img}
        alt={props.description}
        style={{width: "30rem", height: "auto", margin: "0 auto"}}
      />
      <h2>{props.name}</h2>
      <h3 style={{fontSize: "1.5rem"}}>{`${props.price} per unit`}</h3>
      <p
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          width: "30rem",
          height: "auto",
          margin: "0 auto"
        }}
      >
        {props.description}
      </p>
      {showNutrition && (
        <div>
          <Table>
            <thead>
              <tr>
                {Object.keys(props.nutrition).map((n) => (
                  <th>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.keys(props.nutrition).map((n) => (
                  <td>{props.nutrition[n]}</td>
                ))}
              </tr>
            </tbody>
          </Table>
          <Button onClick={handleHideNutrition} style={{width: "15rem", margin: "1rem auto 2rem auto"}}>Hide Nutrition Facts</Button>
        </div>
      )}
      {!showNutrition && (
        <Button onClick={handleShowNutrition} style={{width: "15rem", margin: "1rem auto 2rem auto"}}>Show Nutrition Facts</Button>
      )}
    </Card>
  );
}
