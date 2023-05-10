import React, { useEffect, useState } from 'react'
import Header from '../Header';
import CreateArea from '../CreateArea';
import Note from '../Note';
import Footer from '../Footer';
import { useNavigate } from "react-router-dom"
import {useCookies} from "react-cookie"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


export default function MainPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [cookies, removeCookie] = useCookies([])

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        try {
          const {data} = await axios.post("http://localhost:8080/", {}, {withCredentials:true})
          if (!data.status) {
            removeCookie("jwt")
            navigate("/login")
          } else {
            toast(`Hi ${data.firstName}`, {theme: "light"})
            setNotes(data.notes)
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const addNote = async (newNote) => {
    // setNotes((prevNotes) => {
    //   return [...prevNotes, newNote];
    // });
    setNotes(newNote)
  }

  const deleteNote = async (id) => {
    try {
      const {data} = await axios.delete(`http://localhost:8080/${id}`, {withCredentials:true})
      if (data) {
        setNotes(data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  }

   const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  }

  return (
    <div>
        <Header onLogOut={logOut} />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                _id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        <Footer />
        <ToastContainer/>
    </div>
  )
}
