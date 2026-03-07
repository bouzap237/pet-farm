
const pets = [
    { id: 1, name: 'Bella', type: 'dog', breed: 'Labrador Retriever', age: '2 yrs', img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80', desc: 'Friendly and energetic. Loves to play fetch.' },
    { id: 2, name: 'Luna', type: 'cat', breed: 'Domestic Shorthair', age: '1 yr', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80', desc: 'Sweet, cuddly, and loves a good sunny window.' },
    { id: 3, name: 'Max', type: 'dog', breed: 'German Shepherd Mix', age: '4 yrs', img: 'https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?auto=format&fit=crop&w=500&q=80', desc: 'Loyal and protective. Great with older kids.' },
    { id: 4, name: 'Thumper', type: 'small', breed: 'Holland Lop Rabbit', age: '6 mos', img: 'https://images.unsplash.com/photo-1585110396000-c9faf4e48181?auto=format&fit=crop&w=500&q=80', desc: 'Curious and loves fresh veggies.' },
    { id: 5, name: 'Charlie', type: 'dog', breed: 'Golden Retriever', age: '3 yrs', img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=500&q=80', desc: 'A total goofball. Will steal your heart.' },
    { id: 6, name: 'Oliver', type: 'cat', breed: 'Maine Coon Mix', age: '5 yrs', img: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=500&q=80', desc: 'Gentle giant who purrs loudly.' }
];

document.addEventListener('DOMContentLoaded', () => {
   
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Dynamic Pet Cards & Filtering ---
    const petsGrid = document.getElementById('pets-grid');
    const petSelect = document.getElementById('pet-select');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderPets(filterType = 'all') {
        petsGrid.innerHTML = '';
        const filteredPets = filterType === 'all' ? pets : pets.filter(pet => pet.type === filterType);
       
        filteredPets.forEach(pet => {
            const card = document.createElement('div');
            card.classList.add('pet-card', 'animate-on-scroll', 'slide-up');
            card.innerHTML = `
                <div class="pet-img-container">
                    <img src="${pet.img}" alt="${pet.name}">
                </div>
                <div class="pet-info">
                    <h3>${pet.name}</h3>
                    <div class="pet-meta">
                        <span><i class="fa-solid fa-paw"></i> ${pet.breed}</span>
                        <span><i class="fa-solid fa-clock"></i> ${pet.age}</span>
                    </div>
                    <p>${pet.desc}</p>
                    <a href="#adoption" class="btn btn-primary" onclick="selectPetInForm('${pet.name}')">Adopt Me</a>
                </div>
            `;
            petsGrid.appendChild(card);
           
            // Re-trigger observer for new elements
            setTimeout(() => { card.classList.add('show'); }, 100);
        });
    }

    // Populate Form Select Options
    pets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.name;
        option.textContent = `${pet.name} (${pet.breed})`;
        petSelect.appendChild(option);
    });

    // Filter Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderPets(e.target.getAttribute('data-filter'));
        });
    });

    renderPets(); // Initial render

    // Make select choice from button click
    window.selectPetInForm = (petName) => {
        petSelect.value = petName;
    };

    // --- Carousel Logic ---
    const track = document.getElementById('carousel-track');
    // Using pet images for the gallery
    pets.forEach(pet => {
        const li = document.createElement('li');
        li.classList.add('carousel-slide');
        li.innerHTML = `<img src="${pet.img}" alt="Gallery image of ${pet.name}">`;
        track.appendChild(li);
    });

    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    // Auto Slide
    setInterval(() => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }, 4000);

    window.addEventListener('resize', updateCarousel);


    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const speed = 200; // Lower = faster
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    });
    counterObserver.observe(document.querySelector('.stats'));


    // --- Form Validation & Submission ---
    const adoptionForm = document.getElementById('adoption-form');
    const successMsg = document.getElementById('success-message');

    adoptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simple HTML5 validation handles required fields
        successMsg.style.display = 'block';
        adoptionForm.reset();
       
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    });
});