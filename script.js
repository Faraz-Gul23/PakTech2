document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Filter team members by role
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamCards = document.querySelectorAll('.team-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter cards
            teamCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Modal functionality for team members
    const modal = document.getElementById('teamModal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const viewProfileButtons = document.querySelectorAll('.view-profile');
    
    // Team member details data
    const teamDetails = {
        ahmed: {
            name: "Ahmed Khan",
            role: "Senior Software Engineer",
            location: "Karachi, Pakistan",
            bio: "Ahmed specializes in building scalable backend systems with 8 years of experience working with Pakistani fintech startups. He graduated from NED University and has contributed to open source projects used by developers across Pakistan.",
            expertise: ["Node.js", "Python", "Django", "Database Architecture"],
            education: "BS Computer Science - NED University (2015)",
            projects: "Led development of Pakistan's first blockchain-based remittance system"
        },
        fatima: {
            name: "Fatima Ali",
            role: "UI/UX Designer",
            location: "Lahore, Pakistan",
            bio: "Fatima combines traditional Pakistani design aesthetics with modern UX principles. She has designed interfaces for major Pakistani brands and specializes in creating culturally appropriate user experiences.",
            expertise: ["User Research", "Figma", "Adobe XD", "Design Systems"],
            education: "BFA Design - Punjab University (2017)",
            projects: "Designed the award-winning JazzCash mobile app interface"
        },
        usman: {
            name: "Usman Malik",
            role: "Project Manager",
            location: "Islamabad, Pakistan",
            bio: "Usman brings 10 years of experience managing IT projects across Pakistan. Fluent in both agile and traditional methodologies, he specializes in bridging communication between international clients and Pakistani development teams.",
            expertise: ["Agile", "Scrum", "Client Relations", "Risk Management"],
            education: "MBA - Quaid-i-Azam University (2012)",
            projects: "Managed the digital transformation of a major Pakistani bank"
        },
        ayesha: {
            name: "Ayesha Raza",
            role: "Frontend Developer",
            location: "Peshawar, Pakistan",
            bio: "Ayesha is passionate about building accessible web applications for Pakistani users. She specializes in performance optimization for low-bandwidth areas and RTL language support.",
            expertise: ["React", "Vue.js", "Accessibility", "Performance Optimization"],
            education: "BS Software Engineering - UET Peshawar (2019)",
            projects: "Developed the frontend for Pakistan's COVID-19 vaccination portal"
        },
        bilal: {
            name: "Bilal Ahmed",
            role: "Graphic Designer",
            location: "Faisalabad, Pakistan",
            bio: "Bilal's work blends traditional Pakistani art forms with modern graphic design. He has created visual identities for numerous Pakistani startups and cultural organizations.",
            expertise: ["Brand Identity", "Illustration", "Print Design", "Motion Graphics"],
            education: "BFA - National College of Arts (2016)",
            projects: "Created the visual identity for Pakistan's first design festival"
        },
        kamran: {
            name: "Kamran Siddiqui",
            role: "Backend Developer",
            location: "Quetta, Pakistan",
            bio: "Kamran builds robust backend systems optimized for Pakistan's infrastructure challenges. He specializes in creating solutions that work reliably despite intermittent connectivity.",
            expertise: ["Java", "Spring Boot", "Microservices", "DevOps"],
            education: "BS Computer Science - BUITEMS (2018)",
            projects: "Developed offline-first solutions for Balochistan's education department"
        }
    };
    
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const memberKey = this.getAttribute('data-member');
            const member = teamDetails[memberKey];
            
            if (member) {
                document.querySelector('.modal-body').innerHTML = `
                    <div class="modal-grid">
                        <div class="modal-image">
                            <img src="${this.parentElement.querySelector('img').src}" alt="${member.name}">
                            <div class="modal-location">
                                <i class="fas fa-map-marker-alt"></i> ${member.location}
                            </div>
                        </div>
                        <div class="modal-text">
                            <h2>${member.name}</h2>
                            <p class="modal-role">${member.role}</p>
                            <p class="modal-bio">${member.bio}</p>
                            
                            <div class="modal-details">
                                <div class="detail-section">
                                    <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                                    <p>${member.education}</p>
                                </div>
                                
                                <div class="detail-section">
                                    <h3><i class="fas fa-star"></i> Expertise</h3>
                                    <div class="expertise-tags">
                                        ${member.expertise.map(skill => `<span class="tag">${skill}</span>`).join('')}
                                    </div>
                                </div>
                                
                                <div class="detail-section">
                                    <h3><i class="fas fa-trophy"></i> Notable Project</h3>
                                    <p>${member.projects}</p>
                                </div>
                            </div>
                            
                            <div class="modal-social">
                                <a href="#" class="social-btn"><i class="fab fa-linkedin"></i></a>
                                <a href="#" class="social-btn"><i class="fas fa-envelope"></i></a>
                                <a href="#" class="social-btn"><i class="fab fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                `;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});