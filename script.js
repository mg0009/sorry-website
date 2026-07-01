const memories = [
  {
    title: "The First Little Spark",
    date: "Date · April 15",
    location: "Location · Hotel Room",
    image: "assets/photos/photo-1.jpg",
  },
  {
    title: "That Long Walk",
    date: "Date · April 15",
    location: "Location · Dwarka street",
    image: "assets/photos/photo-2.jpg",
  },
  {
    title: "A Soft Evening",
    date: "Date · April 15",
    location: "Location · Hotel Room",
    image: "assets/photos/photo-3.jpg",
  },
  {
    title: "Favorite Laugh",
    date: "Date · April 15",
    location: "Location · Hotel Lobby",
    image: "assets/photos/photo-4.jpg",
  },
  {
    title: "The Quiet Photo",
    date: "Date · April 16",
    location: "Location · Hotel Bed",
    image: "assets/photos/photo-5.jpg",
  },
  {
    title: "Still My Favorite",
    date: "Date · Jun 30",
    location: "Location · My Heart",
    image: "assets/photos/photo-6.jpg",
  },
];

const letterText =
  "I know a simple sorry cannot undo the way I made you feel. I have replayed it enough to understand that what matters now is not defending myself, but listening better, choosing softer words, and showing you through my actions that your heart is safe with me. You mean so much to me. I miss your warmth, your laugh, and the peace I feel when we are okay. I am sorry for hurting you, and I hope this little page feels like the beginning of a better effort from me.";

const $ = (selector) => document.querySelector(selector);
const music = $("#backgroundMusic");
const musicModal = $("#musicModal");
const musicToggle = $("#musicToggle");
const musicIcon = $("#musicIcon");
const openHeart = $("#openHeart");
const envelope = $("#envelope");
const letterCard = $("#letterCard");
const typedLetter = $("#typedLetter");
const noButton = $("#noButton");
const yesButton = $("#yesButton");
const finale = $("#finale");
let typed = false;
let musicPlaying = false;

function buildAtmosphere() {
  const particles = $(".particle-field");
  const hearts = $(".heart-field");

  for (let index = 0; index < 70; index += 1) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${10 + Math.random() * 16}s`;
    dot.style.animationDelay = `${Math.random() * -20}s`;
    particles.appendChild(dot);
  }

  for (let index = 0; index < 24; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${12 + Math.random() * 18}s`;
    heart.style.animationDelay = `${Math.random() * -24}s`;
    hearts.appendChild(heart);
  }
}

function observeReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function typeLetter() {
  if (typed) return;
  typed = true;
  typedLetter.textContent = "";
  let index = 0;
  const timer = window.setInterval(() => {
    typedLetter.textContent += letterText.charAt(index);
    index += 1;
    if (index >= letterText.length) window.clearInterval(timer);
  }, 34);
}

function setMusicState(play) {
  musicPlaying = play;
  musicIcon.textContent = play ? "Ⅱ" : "♪";
  if (play) {
    music.volume = 0.42;
    music.play().catch(() => {
      musicPlaying = false;
      musicIcon.textContent = "♪";
    });
  } else {
    music.pause();
  }
}

function buildGallery() {
  const grid = $("#galleryGrid");
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxTitle = $("#lightboxTitle");
  const lightboxMeta = $("#lightboxMeta");

  memories.forEach((memory) => {
    const card = document.createElement("button");
    card.className = "memory-card reveal";
    card.type = "button";
    card.innerHTML = `
      <img src="${memory.image}" alt="${memory.title}" loading="lazy">
      <span class="memory-copy">
        <strong>${memory.title}</strong>
        <span>${memory.date}</span>
        <p>${memory.location}</p>
      </span>
    `;
    card.addEventListener("click", () => {
      lightboxImage.src = memory.image;
      lightboxImage.alt = memory.title;
      lightboxTitle.textContent = memory.title;
      lightboxMeta.textContent = `${memory.date} · ${memory.location}`;
      lightbox.classList.remove("hidden");
    });
    grid.appendChild(card);
  });
}

function moveNoButton() {
  const panel = noButton.closest(".question-panel");
  const panelRect = panel.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const maxX = Math.max(0, panelRect.width - buttonRect.width - 28);
  const maxY = Math.max(0, panelRect.height - buttonRect.height - 28);
  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;
  noButton.style.transform = `translate(${x}px, ${y}px)`;
}

function launchConfetti() {
  finale.classList.remove("hidden");
  const canvas = $("#confettiCanvas");
  const context = canvas.getContext("2d");
  const pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: 4 + Math.random() * 7,
    speed: 2 + Math.random() * 5,
    drift: -2 + Math.random() * 4,
    color: ["#d8a175", "#ff8fbd", "#ffffff", "#8f2f61"][Math.floor(Math.random() * 4)],
  }));

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((piece) => {
      piece.y += piece.speed;
      piece.x += piece.drift;
      if (piece.y > canvas.height) piece.y = -20;
      context.fillStyle = piece.color;
      context.fillRect(piece.x, piece.y, piece.size, piece.size * 1.8);
    });
    window.requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

buildAtmosphere();
buildGallery();
observeReveals();

openHeart.addEventListener("click", () => {
  musicModal.classList.remove("hidden");
});

$("#musicYes").addEventListener("click", () => {
  musicModal.classList.add("hidden");
  musicToggle.classList.remove("hidden");
  setMusicState(true);
  $("#letter").scrollIntoView({ behavior: "smooth" });
});

$("#musicNo").addEventListener("click", () => {
  musicModal.classList.add("hidden");
  musicToggle.classList.remove("hidden");
  $("#letter").scrollIntoView({ behavior: "smooth" });
});

musicToggle.addEventListener("click", () => setMusicState(!musicPlaying));

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  window.setTimeout(() => {
    letterCard.classList.remove("hidden");
    typeLetter();
  }, 820);
});

$("#closeLightbox").addEventListener("click", () => $("#lightbox").classList.add("hidden"));
$("#lightbox").addEventListener("click", (event) => {
  if (event.target.id === "lightbox") event.currentTarget.classList.add("hidden");
});

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

yesButton.addEventListener("click", launchConfetti);
