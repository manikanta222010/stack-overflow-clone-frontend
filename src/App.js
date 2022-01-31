import './App.css';
import { Switch, Route, useHistory, useParams } from 'react-router-dom';
import logo from "./logo.svg";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useState, useEffect } from "react";
import { Companies } from './Companies';


export default function App() {
  //Routes to all locations
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <Switch>
          <Route path="/question/:id">
            <TopQuestion />
          </Route>
          <Route path="/questions">
            <AllQuestions />
          </Route>
          <Route path="/ask-question">
            <AskQuestion />
          </Route>
          <Route path="/companies">
            <Companies />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Navbar() {
  const history = useHistory();
  return (
    <header className="navbar">
      <div className="container">
        <div className="logo" onClick={() => history.push("/")}>
          <img src={logo} alt="logo" width="150px" />
        </div>
        <div className="search">
          <input className="search" type="text" placeholder="Search.." />
        </div>
        <div className="nav-tags" onClick={() => history.push("/questions")}>Questions</div>
        <div className="nav-tags" onClick={() => history.push("/companies")}>Companies</div>
        <div className="nav-tags" onClick={() => history.push("/login")}>Login</div>
      </div>
    </header>
  )
}

//Home function displays top questions and its details and user can provide answer to it by click
function Home() {
  const history = useHistory();

  const [questionsdata, setQuestionsdata] = useState([])
  const getQuestionsdata = () => {
    fetch("https://backend-stack-overflow-clone.herokuapp.com//questionsdata")
      .then((data) => data.json())
      .then((qdata) => setQuestionsdata(qdata))
  }
  useEffect(getQuestionsdata, [])

  return (
    <div className="container">
      <div className="askQuestion">
        <h1>Top Questions</h1>
        <button onClick={() => history.push("/ask-question")}>Ask Question</button>
      </div>

      {questionsdata.map((qdata) => (
        <QuestionRow qdata={qdata} />
      ))}
    </div>

  )
}

function QuestionRow({ qdata }) {
  const { q_id, byUserId, question, tags, votes, answers, views, comments } = qdata
  const history = useHistory();

  return (
    <div className="questionRow" onClick={() => history.push("/question/" + q_id)}>
      <div className="vav">
        <div className="votes">
          <div>{votes}</div>
          <div className="sub-text">votes</div>
        </div>
        <div className="answers">
          <div>{answers}</div>
          <div className="sub-text">answers</div>
        </div>
        <div className="views">
          <div>{views}</div>
          <div className="sub-text">views</div>
        </div>
      </div>
      <div className="questionCreatedAt">
        <div className="question">
          <h3>{question}</h3>
        </div>
        <div className="alltags">
          {tags ? tags.map((tag) => (
            <div className="tag">{tag}</div>
          )) : ""}
          <div className="createdAt">asked on 06-12-2021</div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}


//Displays all questions in the database
function AllQuestions({ qdata }) {
  const history = useHistory();

  const [questionsdata, setQuestionsdata] = useState([])
  const getQuestionsdata = () => {
    fetch("https://backend-stack-overflow-clone.herokuapp.com//questionsdata")
      .then((data) => data.json())
      .then((qdata) => setQuestionsdata(qdata))
  }
  useEffect(getQuestionsdata, [])

  return (
    <div className="container">

      {questionsdata.map((qdata) => (
        <div className="questionRow" onClick={() => history.push("/question/" + qdata.q_id)}>
          <div className="vavAll">
            <div className="votes">
              <div>{qdata.votes}</div>
              <div>votes</div>
            </div>
            <div className="answers">
              <div>{qdata.answers}</div>
              <div>answers</div>
            </div>
            <div className="views">
              <div>{qdata.views} views</div>
            </div>
          </div>
          <div className="questionCreatedAt">
            <div className="question">
              <h3>{qdata.question}</h3>
              <p>{qdata.body}</p>
            </div>
            <div className="alltags">
              {qdata.tags ? qdata.tags.map((tag) => (
                <div className="tag">{tag}</div>
              )) : ""}
              <div className="createdAt">asked on 06-12-2021</div>
            </div>
          </div>
          <div>
          </div>
        </div>
      ))}
    </div>

  )
}

// TopQuestion gives the complete info of the question
function TopQuestion() {
  const history = useHistory();
  const { id } = useParams()
  const [questionsdata, setQuestionsdata] = useState([])
  const getQuestionsdata = () => {
    fetch("https://backend-stack-overflow-clone.herokuapp.com//questionsdata")
      .then((data) => data.json())
      .then((qdata) => setQuestionsdata(qdata))
  }
  useEffect(getQuestionsdata, [id])

  console.log(questionsdata, "asdasdas")

  const qus = questionsdata.find(q => q.q_id === id)
  const [question, setQuestion] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState("")
  const [votes, setVotes] = useState("")
  const [answers, setAnswers] = useState("")
  const [views, setViews] = useState("")
  const [comment, setComment] = useState("")

  const addComment = () => {
    const newComment = {
      question: qus.question,
      body: qus.body,
      tags: qus.tags,
      votes: qus.votes,
      answers: qus.answers,
      views: qus.views,
      comment
    }

    const getQuestionsdata = () => {
      console.log("comment", newComment)
      fetch("https://backend-stack-overflow-clone.herokuapp.com//questionsdata",
        {
          method: "PUT",
          body: JSON.stringify(newComment),
          headers: { 'Content-Type': 'application/json' }
        }).then(() => history.push("/"))
    }
    getQuestionsdata()

  }

  return (
    <div className="container ctop">
      {qus ? <>
        <h1>{qus.question}</h1>
        <p>{qus.body}</p>
        <div className="extra-tags">
          {qus.tags.map((tag) => (
            <div className="tag">{tag}</div>
          ))}
        </div>
        <TextareaAutosize
          aria-label="textarea for body"
          minRows={9}
          placeholder=""
          style={{ width: 1000, display: "block", marginBottom: "20px" }}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" variant="contained"
          style={{ background: "#0a95ff", height: "40px", width: "180px" }}
          onClick={addComment}
        >
          Post Your Answer
        </Button>
      </> : ""}

    </div>
  )
}


// This fuunction used to post the question which user want
function AskQuestion() {
  const history = useHistory();

  const [question, setQuestion] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [votes, setVotes] = useState(0)
  const [answers, setAnswers] = useState(0)
  const [views, setViews] = useState(0)
  const [comment, setComment] = useState("")
  const addQuestion = () => {
    const newQuestion = {
      question,
      body,
      tags,
      votes,
      answers,
      views,
      comment
    }

    const getQuestionsdata = () => {
      fetch("https://backend-stack-overflow-clone.herokuapp.com//questionsdata",
        {
          method: "POST",
          body: JSON.stringify(newQuestion),
          headers: { 'Content-Type': 'application/json' }
        }).then(() => history.push("/"))
    }
    getQuestionsdata()

  }

  return (
    <div className="form-container" >
      <Typography gutterBottom variant="h5" component="div" color="#000" sx={{ textAlign: 'center' }}>
        Ask a public question
      </Typography>
      <div className="ask-question-form">

        <TextField
          id="name" name="title" type="text"
          onChange={(event) => {
            setQuestion(event.target.value)
          }}
          label="Title" variant="outlined"
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
        />
        <Typography gutterBottom variant="p" component="div" color="#000" >
          Body
        </Typography>
        <TextareaAutosize
          aria-label="textarea for body"
          minRows={9}
          placeholder="Include all the information someone would need to answer your question"
          style={{ width: 595 }}
          onChange={(event) => {
            setBody(event.target.value)
          }}
        />
        <TextField
          id="name" name="tags" type="text"
          onChange={(event) => {
            setTags((event.target.value).split(" "))
          }}
          label="Body" variant="outlined"
          placeholder="e.g. (excel ios python)"
        />
        <Button type="submit" variant="contained" style={{ background: "#0a95ff", height: "40px", width: "150px" }}
          onClick={addQuestion}
        >Post Question</Button>
      </div>
    </div>
  )
}


// Autentication which need to be connect to backend API(incomplete)
function Login() {
  const history = useHistory();
  const { username } = useParams()
  const handleSubmit = () => {
    console.log(username)

  }
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Email</label>
      <input type="text" name="username" />
      <div>
        <label htmlFor="password">Password</label>
        <span className="nav-tags" onClick={() => history.push("/forgot-password")}>Forgot Password?</span>
      </div>
      <input type="password" name="password" />
      <button type="submit">Log in</button>
    </form>
  )
}

// Autentication which need to be connect to backend API(incomplete)
function ForgotPassword() {
  const history = useHistory();
  const { username } = useParams()
  const handleSubmit = () => {
    console.log(username)

  }
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="username">Email</label>
      <input type="text" name="username" className="f-input" />
      <span className="nav-tags" onClick={() => history.push("/login")}>Login</span>
      <button type="submit">Send recovery mail</button>
    </form>
  )
}