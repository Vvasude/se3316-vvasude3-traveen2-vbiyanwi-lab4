import React from "react"
import "./style.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useEffect } from "react";

var allSearchTracks = []; //Variable to hold query track data

export default function TrackSearch() {
    //Setting Input Variables to Update with UseState
    const [inputValue, setInputValue] = useState('')

    //Cannot Search Empty
    const reloadWindow = () => {
        allSearchTracks = window.localStorage.getItem("list_trackIDS")
        if(allSearchTracks.length == 0){
            alert("Must Select Track IDs")
            window.localStorage.setItem("list_trackIDS", '')
        } else {
        window.location.reload()
        }
    }
    //Clear results before rendering next search query
    const clearSearch = () => {
        const ul = document.getElementById('tracklist')
        //Remove All Child Elements from prev. Search before fetching new search 
        while(ul.firstChild){ 
            ul.removeChild(ul.firstChild)
        }

        fetchTracks();
    }
    //Function to fetch search request and display results accordingly
    const fetchTracks = () => {
        let input = inputValue;
        if(input.length == 0){
            alert("Invalid Search Query")
        }
        var trackArr = [];
        const ul = document.getElementById('tracklist');
        ul.innerHtml = "";

        fetch('/tracks/search/' + input)
            .then((res) => res.json())
            .then((data) => {
                trackArr.push(data);
                JSON.stringify(trackArr);
                for (var i = 0; i < trackArr[0].length; i++) {
                    var li = document.createElement("li");
                    ul.appendChild(li);

                    //Array holding track data with respective fields
                    var trackDescription = [
                        "ID: " + trackArr[0][i].track_id,
                        "Track: " + trackArr[0][i].track_title,
                        "By: " + trackArr[0][i].artist_name,
                        "Year: " + trackArr[0][i].track_date_recorded,
                        "Duration: " + trackArr[0][i].track_duration
                    ];

                    //YT Search String parsing and formatting
                    let trackTitle = trackArr[0][i].track_title
                    let ytStringArr = trackTitle.split(' ')
                    let searchURL = ytStringArr.join('+')
                    let str = searchURL.replace(/\s/g, '');

                    for (var j = 0; j < trackDescription.length; j++) {
                        li.appendChild(document.createTextNode(trackDescription[j]));
                        li.style.display = "";
                        li.appendChild(document.createElement("br"));
                    }

                    //Add to Playlist icon with eventlistener and value
                    let checkBox = ul.appendChild(document.createElement("INPUT"))
                    checkBox.type = "image";
                    checkBox.src = 'https://cdn.iconscout.com/icon/free/png-256/add-playlist-1779822-1513987.png'
                    checkBox.style.width = "25px"
                    checkBox.style.height = "25px"
                    checkBox.value = trackArr[0][i].track_id;
                    checkBox.addEventListener("click", (e) => {
                        //Function to push input value to array
                        let addTrack = e.currentTarget.value;                        
                        allSearchTracks.push(addTrack)
                        allSearchTracks = [...new Set(allSearchTracks)]
                        window.localStorage.setItem("list_trackIDS", allSearchTracks)
                    })

                    //Add to Playlist Label
                    let p = ul.appendChild(document.createElement("p"))
                    p.innerHTML = "Add to Playlist: "
                    p.style.paddingBottom = "1px"
                    p.appendChild(checkBox)

                    //Adding Youtube Button to redirect to youtube with image formatting
                    let inpt = li.appendChild(document.
                        createElement("INPUT"));
                    inpt.type = "image"
                    inpt.src = "https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=681&h=383&crop=1"
                    inpt.style.width = '100px';
                    inpt.style.height = '50px';
                    inpt.style.borderRadius = '5px'
                    inpt.style.display = 'inline-block'
                    inpt.stringURL = str //Set btm params to be used in arrow function
                    inpt.addEventListener("click", (e) => { 
                        //Search on Youtube in New Tab
                        let str = e.currentTarget.stringURL;
                        window.open("https://www.youtube.com/results?search_query=" + str, '_blank', 'noopener,noreferrer')
                    });
                }
            });
        }
    
    return (
        <div>
            <TextField 
                id="standard-basic" 
                label="Search Tracks" 
                variant="standard" 
                onChange={(e) => setInputValue(e.target.value)}
                inputProps={{maxLength: 40}}
            />            
            <Button variant="contained" onClick={clearSearch}>Search</Button>
            <Button variant="outlined" onClick={reloadWindow}>Confirm Tracks </Button>

            {/* Button to start dynamic add /}
            {/ Dynamically add list */}
            <ul id="tracklist"></ul>
        </div>
    )
}