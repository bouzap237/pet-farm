
const pets = [
    { id: 1, name: 'luna', type: 'bangal cats', breed: 'Labrador Retriever', age: '2 yrs', img: 'img/luna.jpg', desc: 'Friendly and energetic. Loves to play fetch.',price:'$350' },
    { id: 2, name: 'bella', type: 'maincoon cats', breed: 'Domestic Shorthair', age: '1 yr', img: 'img/bella.jpg', desc: 'Sweet, cuddly, and loves a good sunny window.',price:'$500' },
    { id: 3, name: 'daniel', type: 'bangal cats', breed: 'German Shepherd Mix', age: '4 yrs', img: 'img/daniel.jpg', desc: 'Loyal and protective. Great with older kids.',price:'$400' },
    { id: 4, name: 'stella', type: 'maincoon cat', breed: 'Holland Lop Rabbit', age: '6 mos', img: 'img/stella.jpg', desc: 'Curious and loves fresh veggies.',price:'$600' },
    { id: 5, name: 'gips', type: 'bangal cat', breed: 'Golden Retriever', age: '3 yrs', img: 'img/milla (1).jpeg', desc: 'A total goofball. Will steal your heart.',price:'$450' },
    { id: 6, name: 'nina', type: 'maincoon cats', breed: 'Maine Coon Mix', age: '5 yrs', img: 'img/gips.jpeg', desc: 'Gentle giant who purrs loudly.',price:'$350'},

     { id: 7, name: 'storm', type: 'bangal cats', breed: 'German Shepherd Mix', age: '4 yrs', img: 'img/gag3.jpeg', desc: 'Loyal and protective. Great with older kids.',price:'$400' },
    { id: 8, name: 'Tcyrus', type: 'maincoon cat', breed: 'Holland Lop Rabbit', age: '6 mos', img: 'img/gag1.jpeg', desc: 'Curious and loves fresh veggies.',price:'$600' },
    { id: 9, name: 'boris', type: 'bangal cat', breed: 'Golden Retriever', age: '3 yrs', img: 'img/boris.jpeg', desc: 'A total goofball. Will steal your heart.',price:'$450' },
    { id: 10, name: 'boomber', type: 'maincoon cats', breed: 'Maine Coon Mix', age: '5 yrs', img: 'img/boomber.jpeg', desc: 'Gentle giant who purrs loudly.',price:'$350'},
     { id: 11, name: 'boris', type: 'bangal cat', breed: 'Golden Retriever', age: '3 yrs', img: 'img/boris.jpeg', desc: 'A total goofball. Will steal your heart.',price:'$450' },
    { id: 12, name: 'boomber', type: 'maincoon cats', breed: 'Maine Coon Mix', age: '5 yrs', img: 'img/acidfern-7NcdSLcRTq8-unsplash - Copy.jpg', desc: 'Gentle giant who purrs loudly.',price:'$550'}
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
                    <p>${pet.price}</p>
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
