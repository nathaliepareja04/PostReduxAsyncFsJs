import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { deletePost, getPosts, savePost, updatePost } from "./redux/PostSlice";

const initialState = {
  title: "",
  description: "",
  imgUrl: "",
};

function App() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.postStore);

  const refInput = useRef();

  const [formulario, setFormulario] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const actions=(e)=>{
    e.preventDefault()
    isEdit?dispatch(updatePost(formulario)):dispatch(savePost(formulario))

    refInput.current.focus()
    cleanState()
  }

  const cleanState=()=>{
    setFormulario(initialState)
    setIsEdit(false)
  }

  const clickUpdate=(post)=>{
    setFormulario(post)
    setIsEdit(true)
  }

  return (
    <div className="container mt-5">
      <Row>
        <Col xs={12} md={4} >
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={actions} >
                <Form.Group className="mb-3 fw-bold">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    ref={refInput}
                    className="rounded-5"
                    type="text"
                    placeholder="Enter title"
                    autoFocus
                    name="title"
                    value={formulario.title}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 fw-bold">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    className="rounded-5"
                    placeholder="Enter description"
                    name="description"
                    value={formulario.description}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 fw-bold">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    className="rounded-5"
                    placeholder="Enter image"
                    name="imgUrl"
                    value={formulario.imgUrl}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Button type="submit" className="rounded-pill" eigth="50" variant={isEdit ? "info" : "success"}>
                  {isEdit ? "update" : "save"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          <Row>
            {posts.map((post) => (
              <Col key={post._id}>
                <Card className="mb-3 rounded-5">
                  <Card.Img variant="top" src={post.imgUrl} />

                  <Card.Body>
                    <h1>{post.title}</h1>
                    <Card.Text>{post.description}</Card.Text>

                    <div className="d-flex.justify-content-between">
                      <Button variant="danger" className="me-3 rounded-pill" onClick={()=>dispatch(deletePost(post._id))} >Delete</Button>
                      <Button variant="info" className="rounded-pill" onClick={()=>clickUpdate(post)} >Update</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
