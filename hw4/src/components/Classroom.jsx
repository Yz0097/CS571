import { useEffect, useState, useSyncExternalStore } from "react";
import { Button, Container, Form, Row, Pagination } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
  const [searchName, setSearchName] = useState("");
  const [searchMajor, setSearchMajor] = useState("");
  const [searchInterest, setSearchInterest] = useState("");
  const [studs, setStuds] = useState([]);
  const [curPage, setCurPage] = useState(1);
  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw2/students", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStuds(
          data.map((stud, index) => {
            return { ...stud, id: index };
          })
        );
      });
  }, []);
  let selectedStuds = studs;
  if (searchName) {
    selectedStuds = selectedStuds.filter((stud) => {
      let studName = `${stud.name.first} ${stud.name.last}`.toLowerCase();
      return studName.toLowerCase().includes(searchName.toLowerCase());
    });
  }

  if (searchMajor) {
    selectedStuds = selectedStuds.filter((stud) => {
      return stud.major.toLowerCase().includes(searchMajor.toLowerCase());
    });
  }

  if (searchInterest) {
    selectedStuds = selectedStuds.filter((stud) => {
      let studInterest = JSON.stringify(stud.interests);
      return studInterest.toLowerCase().includes(searchInterest.toLowerCase());
    });
  }
  const studsPerPage = 8;
  const total_page = Math.floor(selectedStuds.length / studsPerPage) + 1;
  const shownStuds = selectedStuds.slice(
    (curPage - 1) * studsPerPage,
    (curPage - 1) * studsPerPage + studsPerPage > selectedStuds.length
      ? selectedStuds.length
      : (curPage - 1) * studsPerPage + studsPerPage
  );
  const pageList = Array.from({ length: total_page }, (_, i) => i + 1);
  console.log(selectedStuds);
  return (
    <div>
      <h1>Badger Book</h1>
      <p>Search for students below!</p>
      <hr />
      <Form>
        <Form.Label htmlFor="searchName">Name</Form.Label>
        <Form.Control
          id="searchName"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurPage(1);
          }}
        />
        <Form.Label htmlFor="searchMajor">Major</Form.Label>
        <Form.Control
          id="searchMajor"
          value={searchMajor}
          onChange={(e) => {
            setSearchMajor(e.target.value);
            setCurPage(1);
          }}
        />
        <Form.Label htmlFor="searchInterest">Interest</Form.Label>
        <Form.Control
          id="searchInterest"
          value={searchInterest}
          onChange={(e) => {
            setSearchInterest(e.target.value);
            setCurPage(1);
          }}
        />
        <br />
        <Button
          variant="neutral"
          onClick={() => {
            document.getElementById("searchName").value = "";
            document.getElementById("searchMajor").value = "";
            document.getElementById("searchInterest").value = "";
            setSearchName("");
            setSearchMajor("");
            setSearchInterest("");
            setCurPage(1);
          }}
        >
          Reset Search
        </Button>
      </Form>
      <p>{`there are ${selectedStuds.length} students`}</p>
      <Container fluid>
        <Row>
          {
            /* TODO Students go here! */
            shownStuds.map((stud) => {
              return <Student {...stud} key={stud.id} />;
            })
          }
        </Row>
      </Container>
      <Pagination>
        <Pagination.Item
          disabled={curPage === 1}
          onClick={() => setCurPage(curPage - 1)}
        >
          Previous
        </Pagination.Item>
        {pageList.map((pageNum) => {
          return (
            <Pagination.Item
              active={curPage === pageNum}
              onClick={() => setCurPage(pageNum)}
              key={pageNum}
            >{`${pageNum}`}</Pagination.Item>
          );
        })}
        <Pagination.Item
          disabled={curPage === total_page}
          onClick={() => setCurPage(curPage + 1)}
        >
          Next
        </Pagination.Item>
      </Pagination>
    </div>
  );
};

export default Classroom;
