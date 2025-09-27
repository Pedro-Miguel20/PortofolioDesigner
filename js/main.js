ScrollReveal().reveal('header, .more-photo, .more-wrapper, control, .img-container, .presentation, .odonto-img, .tab-pane,.carousel', {
  duration: 2000,
  reset: true,// stagger each element by 200ms
});

ScrollReveal().reveal('.animate, .user, .skills, .socials', {
  duration: 1000,
  reset: true,
  origin: 'bottom',   // animation comes from bottom
  distance: '50px',
  interval: 200       // stagger each element by 200ms
});

ScrollReveal().reveal('.title-sobre, .qualifications, .nav-tabs, .work-feedback', {
  duration: 1000,
  reset: true,
  origin: 'left',   // animation comes from bottom
  distance: '100px',
  interval: 200       // stagger each element by 200ms
});

let lastWidth = window.innerWidth;

window.addEventListener('resize', function () {
  "use strict";
  let newWidth = window.innerWidth;

  if (newWidth !== lastWidth) {
    window.location.reload();
    lastWidth = newWidth;
  }
});


function updateHeaderZIndex(){

    var horizontalScroll = window.scrollY;
    console.log(horizontalScroll)
    if(horizontalScroll > 0){
        document.querySelector('header').style.zIndex = '3';
        navegateHeader(2);
    }
    else{
        document.querySelector('header').style.zIndex = '0';
    }

    

    var inicio = document.getElementById('inicio').offsetHeight;
    var sobre = document.getElementById('sobre').offsetHeight;
    var servicos = document.getElementById('servicos').offsetHeight;

    if(horizontalScroll > inicio){
      navegateHeader(25);
      document.querySelector('header').style.boxShadow="none";
    } else {
      document.querySelector('header').style.boxShadow="#909090 0px 5px 10px 0px";
    }
    if(horizontalScroll > inicio + sobre){
      navegateHeader(50);
      document.querySelector('header').style.boxShadow="none";
    }
    
    if(horizontalScroll > inicio + sobre + servicos+100){
      navegateHeader(75);
      document.querySelector('header').style.boxShadow="none";
      document.querySelector('header').style.backgroundColor="#2b2b2b";
      document.querySelector('.focused').style.backgroundColor="#2b2b2b";
      document.getElementById('75').style.color="ghostwhite";
      document.querySelector('header').style.transition=".5s";
    }else{
      document.querySelector('header').style.backgroundColor="#a8c4c3";
      document.querySelector('.focused').style.backgroundColor="#a8c4c3";
      document.getElementById('75').style.color="#2b2b2b";
    }
};

window.addEventListener('load', () => {
  updateHeaderZIndex(); // Aplica logo no reload
});

// Também executa toda vez que houver scroll
window.addEventListener('scroll', () => {
  updateHeaderZIndex();
});


const audioElement = new Audio("assets/audio/audio.mp3");

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
  window.relpad
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

  if (window.innerWidth < 500 && socials && aside) {
    // move o .socials para antes do <aside>
    aside.insertAdjacentElement("beforebegin", socials);
  } else {
    music.insertAdjacentElement("afterend", socials);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const dados = {
    ilustracoes: [
      "assets/images/trabalhos/ilustracao-1.jpg",
      "assets/images/trabalhos/ilustracao-2.jpg",
      "assets/images/trabalhos/ilustracao-3.jpg",
      "assets/images/trabalhos/ilustracao-4.jpg",
      "https://placekitten.com/604/300"
    ],
    camisas: [
      "aassets/images/trabalhos/camisa-1.png",
      "https://picsum.photos/600/300?random=2",
      "https://picsum.photos/600/300?random=3",
      "https://picsum.photos/600/300?random=4"
    ],
    logos: [
      "https://picsum.photos/600/300?random=5",
      "https://picsum.photos/600/300?random=6",
      "https://picsum.photos/600/300?random=7"
    ]
  };

  // percorre as categorias e injeta imagens
  Object.keys(dados).forEach(categoria => {
    const tabPane = document.getElementById(categoria);
    if (!tabPane) return;

    const container = tabPane.querySelector(".content");
    if (!container) return;

    dados[categoria].forEach(src => {
      const img = document.createElement("img");
      img.classList ="bigger-img";
      img.src = src;
      img.alt = categoria;
      img.style.width = "100%";   // provisório, você ajusta no CSS
      img.style.display = "block";
      container.appendChild(img);
    });
  });
});


const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 2; // começa no meio
updateCarousel();

function updateCarousel() {


  const cardWidth = cards[0].offsetWidth + 30; // largura + margin
  const offset =
    -(index * cardWidth) +
    (track.parentElement.offsetWidth / 2 - cards[0].offsetWidth / 2 - 14.5);

  track.style.transform = `translateX(${offset}px)`;

  // ativa/desativa destaque
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

// Navegação por botões
nextBtn.addEventListener("click", () => {
  index = (index + 1) % cards.length; // loop infinito
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  updateCarousel();
});

// --- Swipe no celular ---
let startX = 0;
let endX = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => {
  let diff = endX - startX;

  if (Math.abs(diff) > 50) { // só conta se for um arrasto razoável
    if (diff < 0) {
      // deslizou para a esquerda → próximo
      index = (index + 1) % cards.length;
    } else {
      // deslizou para a direita → anterior
      index = (index - 1 + cards.length) % cards.length;
    }
    updateCarousel();
  }
  startX = 0;
  endX = 0;
});

document.addEventListener('DOMContentLoaded', () => {
  const bigger = document.querySelectorAll('.bigger-img');
  const myDiv = document.querySelector('.container-bigger-img');
  const closeBtn = document.querySelector('.out-container');
  const showImg = document.querySelector('.show-img');

  bigger.forEach(img => {
    img.addEventListener('click', () => {
      showImg.src = img.src;
      myDiv.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    myDiv.style.display = 'none';
    showImg.src = '';
  });

  myDiv.addEventListener('click', (e) => {
    if (e.target === myDiv) {
      myDiv.style.display = 'none';
      showImg.src = '';
    }
  });
});
