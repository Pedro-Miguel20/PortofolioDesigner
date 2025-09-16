ScrollReveal().reveal('header, .more-photo, .more-wrapper, control, .img-container, .presentation, .odonto-img', {
  duration: 2000,
  reset: true,      // stagger each element by 200ms
});

ScrollReveal().reveal('.animate, .user, .skills, .socials', {
  duration: 1000,
  reset: true,
  origin: 'bottom',   // animation comes from bottom
  distance: '50px',
  interval: 200       // stagger each element by 200ms
});

ScrollReveal().reveal('.title-sobre, .qualifications', {
  duration: 1000,
  reset: true,
  origin: 'left',   // animation comes from bottom
  distance: '100px',
  interval: 200       // stagger each element by 200ms
});

function updateHeaderZIndex(){
    var horizontalScroll = window.scrollY;
    if(horizontalScroll > 0){
        document.querySelector('header').style.zIndex = '3';
        navegateHeader(2);
    }
    else{
        document.querySelector('header').style.zIndex = '0';
    }

    if(horizontalScroll > window.innerHeight - 200){
      navegateHeader(25);
      document.querySelector('header').style.boxShadow="none";
    } else {
      document.querySelector('header').style.boxShadow="#909090 0px 5px 10px 0px";
    }
    
};

window.addEventListener('load', () => {
  updateHeaderZIndex(); // Aplica logo no reload
});

// Também executa toda vez que houver scroll
window.addEventListener('scroll', () => {
  updateHeaderZIndex();
});


const audioElement = new Audio("/assets/audio/audio.mp3");

const icon = document.getElementById("icon");
const fillBar = document.querySelector(".fill-bar");

audioElement.addEventListener("play", () => {
  const duration = audioElement.duration;
  fillBar.style.animation = `mymove linear ${duration}s forwards`;
});

audioElement.addEventListener("pause", () => {
  fillBar.style.animationPlayState = "paused";
});

audioElement.addEventListener("playing", () => {
  fillBar.style.animationPlayState = "running";
});

function playSong() {
  if (audioElement.paused || audioElement.ended) {
    audioElement.play();
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
  } else {
    audioElement.pause();
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-play-fill");
  }
}

var navegates = document.querySelectorAll('.navegate');

function navegateHeader(position){
        document.querySelector('.focused').style.left = position + "%";
}

const odontoAside = document.querySelector('.odonto-aside');
const odontoImg = document.querySelector('.odonto-aside img');
const sobreText = document.querySelector('.sobre-text');

function ajustarOdonto() {
  const altura = sobreText.offsetHeight;
  odontoAside.style.height = altura + 'px';
  odontoAside.style.width = altura + 'px'; // mantém 1:1
  odontoImg.style.height = altura + 'px';
  odontoImg.style.width = altura + 'px';
}

// Ajuste inicial e ao redimensionar a tela
window.addEventListener('load', ajustarOdonto);
window.addEventListener('resize', ajustarOdonto);

// Ajusta automaticamente se o texto mudar de altura
const observer = new ResizeObserver(ajustarOdonto);
observer.observe(sobreText);

document.addEventListener("DOMContentLoaded", () => {
  const socials = document.querySelector(".socials");
  const aside = document.querySelector("aside");
  const music = document.querySelector(".music-player");

  if (window.innerWidth < 460 && socials && aside) {
    // move o .socials para antes do <aside>
    aside.insertAdjacentElement("beforebegin", socials);
  } else {
    music.insertAdjacentElement("afterend", socials);
  }
});
