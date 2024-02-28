import "./App.css";
import SearchComp from "./components/SearchComp";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Container className="mt-3">
        <Row>
          <SearchComp/>
        </Row>
      </Container>
    </div>
  );
}

export default App;
