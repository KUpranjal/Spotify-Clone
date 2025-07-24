const imageTag = document.getElementById("displayImg")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const nameTag = document.getElementById("displayName")
const slider = document.getElementById("slider")
const volumeSlider = document.getElementById("volume-slider")
const songsList = document.getElementById("right")


const playlist = [
   
    {
        displayName: "2-Khatole",
        trackName: "audio-1",
        img: "pic-1.jpg"
    },
    {
        displayName: "Nasha",
        trackName: "audio-2",
        img: "pic-4.jpg"
    },
    {
        displayName: "Dhun",
        trackName: "audio-3",
        img: "pic-2.jpg"
    },
     {
        displayName: "Saiyaraa",
        trackName: "saiyara-0",
        img: "pic-3.jpg"
    },
     {
        displayName: "Nagan-si lugai",
        trackName: "audio-4",
        img: "pic-5.jpg"
    },
     {
        displayName: "love me like u do",
        trackName: "audio-5",
        img: "pic-6.jpg"
    }
]


let currIdx = 0
let currObj = playlist[currIdx]
let currSong = new Audio(`./media/${currObj.trackName}.mp3`)
currSong.volume = 0.2

playBtn.addEventListener("click", () => {
    if(playBtn.classList.contains("fa-circle-play"))
    {
        playBtn.classList.remove("fa-circle-play")
        playBtn.classList.add("fa-circle-pause")
        currSong.play()
        imageTag.src = "./media/" + currObj.img
        nameTag.innerText = currObj.displayName
    }
    else
    {
        currSong.pause()
        playBtn.classList.remove("fa-circle-pause")
        playBtn.classList.add("fa-circle-play")
    }



    currSong.addEventListener("timeupdate", () => {
        slider.value = (currSong.currentTime / currSong.duration) * 100
    })
})

for(let item of playlist)
{
        let pTag = document.createElement("p")
        pTag.innerText = item.displayName
        songsList.appendChild(pTag)

        pTag.addEventListener("click", () => {
            let clickedSong = playlist.find((item) => {
                return item.displayName == pTag.innerText
            })

            currSong.pause()
            currSong = new Audio(`./media/${clickedSong.trackName}.mp3`)
            currSong.play()
            imageTag.src = "./media/" + clickedSong.img
            nameTag.innerText = clickedSong.displayName
            playBtn.classList.remove("fa-circle-play")      
            playBtn.classList.add("fa-circle-pause")

    currSong.addEventListener("timeupdate", () => {
        slider.value = (currSong.currentTime / currSong.duration) * 100
    })
    })
}


volumeSlider.addEventListener("change", () => {
    currSong.volume = volumeSlider.value / 100
})


nextBtn.addEventListener("click", () => {
    currSong.pause()
    currIdx++
    if(currIdx == playlist.length)
    {
        currIdx = 0
    }
    playBtn.classList.remove("fa-circle-play")
    playBtn.classList.add("fa-circle-pause")
    currObj = playlist[currIdx]
    currSong = new Audio(`./media/${currObj.trackName}.mp3`)
    currSong.play()
    imageTag.src = "./media/" + currObj.img
    nameTag.innerText = currObj.displayName


    currSong.addEventListener("timeupdate", () => {
        slider.value = (currSong.currentTime / currSong.duration) * 100
    })
})

prevBtn.addEventListener("click", () => {
    currSong.pause()
    currIdx--
    if(currIdx == -1)
    {
        currIdx = playlist.length - 1
    }
    playBtn.classList.remove("fa-circle-play")
    playBtn.classList.add("fa-circle-pause")
    currObj = playlist[currIdx]
    currSong = new Audio(`./media/${currObj.trackName}.mp3`)
    currSong.play()
    imageTag.src = "./media/" + currObj.img
    nameTag.innerText = currObj.displayName


    currSong.addEventListener("timeupdate", () => {
        slider.value = (currSong.currentTime / currSong.duration) * 100
    })
})


slider.addEventListener("input", () => {
    const seekTime = (slider.value * currSong.duration) / 100;
    currSong.currentTime = seekTime;
});