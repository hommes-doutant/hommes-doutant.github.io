document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menu Mobile (Burger)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique sur un lien (sans empêcher le défilement natif)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Année dynamique dans le footer
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${new Date().getFullYear()} Léa Anselin - Psychologue à Lyon. Tous droits réservés.`;
    }

    // 3. ScrollSpy (Mise à jour du fil d'Ariane)
    const sections = document.querySelectorAll('section');
    const breadcrumbLinks = document.querySelectorAll('.floating-breadcrumb a');
    
    // On utilise l'API IntersectionObserver : c'est natif, optimisé par le GPU,
    // et ça ne saccade jamais le défilement car ça ne tourne pas à chaque pixel.
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -50% 0px', // Détecte quand la section traverse le tiers supérieur de l'écran
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                breadcrumbLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});