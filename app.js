let contentname= document.querySelector("#cntname");
let contentimg= document.querySelector("#contentimg");
let rectname= document.querySelector("#rectname");
let backwardbtn= document.querySelector("#backwardbtn");
let forwardbtn= document.querySelector("#forwardbtn");
let audio= document.querySelector("#audio");
let playbtan= document.querySelector("#playbtn");
let start_time= document.querySelector(".starttime");
let end_time= document.querySelector(".endtime");
let body_clr=document.querySelector("body");
let track_no=0;
let tracklist=[
    {
        contntname: "Surah Fatiha",
        contntimg: "surah-fatihaimage.jpg",
        rectername: "Qari Mishary Rashid Alafasy",
        audio: "Surah-Fatiha-AudioMishary.mp3"
    },
    {   
        contntname: "Ayat-ul-Kursi",
        contntimg: "ayatulkursi.webp",
        rectername: "Qari Abdul Basit",
        audio:  "ayatulkursi.mp3"
    },
    {
        contntname: "Surah Ikhlas",
        contntimg: "surah-ikhlasimage.jpg",
        rectername: "Qari Abdul Basit",
        audio: "surah-ikhlas.mp3"
    }
];
function curr_track(tracknum){
    contentname.innerText=tracklist[tracknum].contntname;
    contentimg.src=tracklist[tracknum].contntimg;
    rectname.innerText=tracklist[tracknum].rectername;
    audio.src=tracklist[tracknum].audio;
    // Load the audio file and set the current time to 0 by default
    audio.load();
}
curr_track(track_no);
function playpause(){
    if(playbtan.classList.contains("fa-pause-circle")){
        playbtan.classList.remove("fa-pause-circle");
        playbtan.classList.add("fa-play-circle");
        audio.pause();
    }
    else{
        playbtan.classList.remove("fa-play-circle");
        playbtan.classList.add("fa-pause-circle");
        audio.play();
    }
}  

    playbtan.addEventListener("click",()=>{
    playpause();    
});    
function set_time() {
    // Get the timer input slider
    const timerSlider = document.querySelector("#timerSlider");
    // Update current time and duration display
    audio.addEventListener("timeupdate", () => {
        // Update slider position
        if (timerSlider) {
            timerSlider.max = audio.duration ;
            timerSlider.value = audio.currentTime;
        }
        // Format time as mm:ss
        const formatTime = (time) => {
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);
            return `${min}:${sec.toString().padStart(2, '0')}`;
        };
        start_time.innerText = formatTime(audio.currentTime);
        end_time.innerText = isNaN(audio.duration) ? "0:00" : formatTime(audio.duration);
    });

    // Allow user to seek using the slider
    if (timerSlider) {
        timerSlider.addEventListener("input", () => {
            audio.currentTime = timerSlider.value;
        });
    }
    // Reset slider when audio ends
    audio.addEventListener("ended", () => {
        if (timerSlider) {
            timerSlider.value = 0; // Reset slider to 0
        }
        start_time.innerText = "0:00"; // Reset start time display
        playbtan.classList.remove("fa-pause-circle");
        playbtan.classList.add("fa-play-circle");
    });
    }
set_time();
function set_volume() {
    // Get the volume input slider
    const volumeSlider = document.querySelector("#vlm");
    // Update volume display
    audio.addEventListener("volumechange", () => {
        if (volumeSlider) {
            volumeSlider.value = audio.volume * 100; // Convert to percentage
        }
    });

    // Allow user to change volume using the slider
    if (volumeSlider) {
        volumeSlider.addEventListener("input", () => {
            audio.volume = volumeSlider.value / 100; // Convert back to decimal
        });
    }
}
set_volume();
function bg_color() {
    let red = Math.floor(Math.random() * 256) + 50;
  let green = Math.floor(Math.random() * 256) + 50;
  let blue = Math.floor(Math.random() * 256) + 50;

  // Construct a color with the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  // Set the background to the new color
  document.body.style.background = bgColor;
 }
bg_color();
function next_track() {
    track_no++;
    if(track_no >=tracklist.length)
    {
        track_no=0;
    }
        curr_track(track_no);

}
forwardbtn.addEventListener("click",()=>{
    next_track();
    playbtan.classList.remove("fa-pause-circle");
        playbtan.classList.add("fa-play-circle");
    bg_color();
    });
function previous_track() {
    track_no--;
    if(track_no < 0)
    {
        track_no = tracklist.length - 1;
    }
    curr_track(track_no);
}
backwardbtn.addEventListener("click",()=>{
    previous_track();
    playbtan.classList.remove("fa-pause-circle");
        playbtan.classList.add("fa-play-circle");
    bg_color();
    });