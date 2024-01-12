/* eslint-disable no-restricted-globals */
import Sidebar from "../components/Sidebar";
import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const EditNote = () => {
    const [note, setNote] = useState([])


    const [error, setError] = useState([])
    const API = 'https://datavizx.onrender.com'
    const navigate = useNavigate();


    const handleInput = (e) => {
        // setNote({ ...note, [e.target.name]: e.target.value })
        setNote(event.target.value)
        console.log(note)
    }

    const fetchNoteInfo = async () => {
        const retrievedValue = localStorage.getItem("chartId");
        try {
            const response = await axios.get(`${API}/note/getNote/${retrievedValue}`);
            console.log("res note data",response.data)
            setNote(response.data.note)
            return response.data;

        }
        catch (error) {
            console.error("Fetch error:", error);

        };
    }

        const handleVerify = async (e) => {
            const userId = localStorage.getItem("userId");
            let accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            const decoded = jwtDecode(accessToken);
            const refreshDecoded = jwtDecode(refreshToken);
            const refreshExpireTime = refreshDecoded.exp * 1000;
            const expirationTime = decoded.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();
            if (currentTime > expirationTime) {
                if (currentTime < refreshExpireTime) {
                    await axios.post(`${API}/verify/refresh`, { refreshToken: refreshToken, userId: userId })
                        .then(response => {
                            localStorage.setItem('accessToken', response.data.newAccessToken)
                        }).catch(error => {

                        })
                } else {
                    localStorage.clear()
                    navigate("/login")
                }
            }
            if (!accessToken) {

                localStorage.clear()
                navigate("/login")
            } else {
                accessToken = localStorage.getItem("accessToken")
                const verify = await axios.post(`${API}/verify`, { access_token: accessToken })
                if (verify.data.status === "false") {
                    localStorage.clear()
                    navigate("/login")
                }
            }
        }
        useEffect(() => {
            handleVerify()
        }, [])

        const handleSubmit = async (e) => {
            e.preventDefault()
            const chartId = localStorage.getItem('chartId')
            console.log(`chartId: ${chartId}`)
            console.log("note",note)
            try {
                const response = await axios.put(`${API}/note/editNote/${chartId}`, {
                    note: note,
                })
                console.log(`response: ${response}`)
                console.log("res",response.data)
                location.reload();
            } catch (e) {
                setError(e)
            }
        }

        useEffect(() => {
            fetchNoteInfo();
        }, []);

        return (
            <div className="flex">
                <div className="#">
                    <Sidebar />
                </div>

                <div className="pt-12 pr-10 mx-auto" id="mainClass">
                    <h1 className="text-4xl font-bold text-center text-white uppercase pb-11">Note</h1>
                    <div id="inputClass" className="space-y-8">
                        <div id="textInput">
                            <label
                                form="note"
                                className="flex justify-center mb-2 text-lg font-medium tracking-wider text-white"
                            >
                                Note
                            </label>
                            <TextareaAutosize
                                id="note"
                                minRows="8"
                                value= {note}
                                className="flex p-2.5 w-96 shadow-lg rounded-lg text-base bg-slate-900 border-gray-700 text-gray-400 ring-gray-600"
                                placeholder="Write your note here..."
                                name="note"
                                onChange={handleInput}

                            />
                        </div>

                        <div id="buttonInput" className="flex items-center justify-center">
                            <button
                                type="button"
                                className="px-4 py-2 text-base font-medium tracking-wider text-white border-purple-800 rounded-lg focus:z-10 focus:ring-2 dark:bg-purple-600 hover:text-white hover:bg-purple-400 focus:ring-purple-500 focus:text-white"
                                onClick={handleSubmit}
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    };

    export default EditNote;
