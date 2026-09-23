const testimonials = [
  {
    quote: "SoftPolli has been an invaluable partner in our digital transformation journey. Their expertise in web and mobile development, coupled with their commitment to delivering high-quality solutions, has helped us achieve our business goals efficiently.",
    name: "Tanvir Rahman",
    designation: "Managing Director",
    company: "Trust Winner Resturant",
    category: "Hotel & Restaurant Management",
    src: "images/t1.jpg"
  },
  {
    quote: "The team at SoftPolli exceeded our expectations in every way. Their innovative approach to software development and their ability to understand our unique requirements resulted in a product that has significantly improved our operational efficiency.",
    name: "Sajal Ahmed",
    designation: "Chief Executive Officer",
    company: "IB Educational Institute",
    category: "Education & Learning Management",
    src: "images/t2.png"
  },
  // {
  //   quote: "The cross-platform mobile application they engineered achieved 500,000+ active downloads within 3 months. The UI/UX design and offline sync performance are simply world-class.",
  //   name: "Marcus Vance",
  //   designation: "Head of Product",
  //   company: "SaaSify Mobility",
  //   category: "Mobile Engineering",
  //   src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
  // },
  // {
  //   quote: "Integrating custom AI LLM models into our customer support system reduced ticket response times by 75%. Their AI engineering solutions gave us a massive competitive moat.",
  //   name: "Elena Rostova",
  //   designation: "Director of Artificial Intelligence",
  //   company: "DataCore Analytics",
  //   category: "AI & Machine Learning",
  //   src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop"
  // }
];

let activeIndex = 0;
let autoplayTimer = null;

// DOM Element References
const imageContainer = document.getElementById('image-container');
const avatarBar = document.getElementById('avatar-bar');
const dotsContainer = document.getElementById('dots-container');
const nameEl = document.getElementById('client-name');
const designationEl = document.getElementById('client-designation');
const companyEl = document.getElementById('client-company');
const categoryEl = document.getElementById('project-category');
const quoteEl = document.getElementById('quote-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateTestimonial(direction = 1) {
  // 1. Update 3D Stacked Image Cards
  testimonials.forEach((testimonial, index) => {
    let img = imageContainer.querySelector(`[data-index="${index}"]`);
    if (!img) {
      img = document.createElement('img');
      img.src = testimonial.src;
      img.alt = testimonial.name;
      img.classList.add('testimonial-card-img');
      img.dataset.index = index;

      // Click image card to select
      img.addEventListener('click', () => {
        if (activeIndex !== index) {
          activeIndex = index;
          updateTestimonial(1);
          resetAutoplay();
        }
      });

      imageContainer.appendChild(img);
    }

    // Calculate 3D Offset & Transform Properties
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);
    const zIndex = testimonials.length - absOffset;
    const opacity = index === activeIndex ? 1 : 0.45;
    const scale = 1 - (absOffset * 0.12);
    const translateY = offset === -1 ? '-18%' : offset === 1 ? '18%' : '0%';
    const rotateY = offset === -1 ? '14deg' : offset === 1 ? '-14deg' : '0deg';

    img.style.zIndex = zIndex;
    img.style.opacity = opacity;
    img.style.transform = `translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`;
  });

  // 2. Update Details & Metadata
  const current = testimonials[activeIndex];
  nameEl.textContent = current.name;
  designationEl.textContent = current.designation;
  companyEl.textContent = current.company;
  categoryEl.textContent = current.category;

  // 3. Render Word-by-Word Quote Animation
  quoteEl.innerHTML = current.quote
    .split(' ')
    .map(word => `<span class="quote-word">${word}</span>`)
    .join(' ');

  animateWords();

  // 4. Update Thumbnails and Dots Indicator
  renderThumbnails();
}

function animateWords() {
  const words = quoteEl.querySelectorAll('.quote-word');
  words.forEach((word, index) => {
    word.style.opacity = '0';
    word.style.transform = 'translateY(12px)';
    word.style.filter = 'blur(10px)';

    setTimeout(() => {
      word.style.transition = 'opacity 0.25s ease-out, transform 0.25s ease-out, filter 0.25s ease-out';
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
      word.style.filter = 'blur(0)';
    }, index * 22);
  });
}

function renderThumbnails() {
  // Clear container contents
  avatarBar.innerHTML = '';
  dotsContainer.innerHTML = '';

  testimonials.forEach((testimonial, index) => {
    // Thumbnail Avatars
    const thumb = document.createElement('img');
    thumb.src = testimonial.src;
    thumb.alt = testimonial.name;
    thumb.className = `w-10 h-10 rounded-full object-cover cursor-pointer ring-2 transition-all duration-300 ${index === activeIndex
      ? 'ring-blue-500 scale-110 shadow-lg shadow-blue-500/50'
      : 'ring-slate-700 opacity-50 hover:opacity-100 hover:ring-slate-500'
      }`;

    thumb.addEventListener('click', () => {
      if (activeIndex !== index) {
        activeIndex = index;
        updateTestimonial(1);
        resetAutoplay();
      }
    });
    avatarBar.appendChild(thumb);

    // Dot indicators
    const dot = document.createElement('button');
    dot.className = `h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-blue-500' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
      }`;
    dot.addEventListener('click', () => {
      if (activeIndex !== index) {
        activeIndex = index;
        updateTestimonial(1);
        resetAutoplay();
      }
    });
    dotsContainer.appendChild(dot);
  });
}

function handleNext() {
  activeIndex = (activeIndex + 1) % testimonials.length;
  updateTestimonial(1);
}

function handlePrev() {
  activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial(-1);
}

function startAutoplay() {
  autoplayTimer = setInterval(handleNext, 3000);
}

function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  handleNext();
  resetAutoplay();
});

prevBtn.addEventListener('click', () => {
  handlePrev();
  resetAutoplay();
});

// Keyboard Arrow Navigation Support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    handleNext();
    resetAutoplay();
  } else if (e.key === 'ArrowLeft') {
    handlePrev();
    resetAutoplay();
  }
});

// Initialize Component on Load
window.addEventListener('DOMContentLoaded', () => {
  updateTestimonial(0);
  startAutoplay();
});