
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const overlay = document.querySelector('.nav-overlay');
        const navItems = document.querySelectorAll('.nav-item');
        const body = document.body;

        // Función para abrir/cerrar menú principal
        function toggleMenu(force) {
            const isActive = navLinks.classList.contains('active');
            
            if (force !== undefined) {
                if (force && !isActive) {
                    navLinks.classList.add('active');
                    menuToggle.classList.add('active');
                    overlay.classList.add('active');
                    body.style.overflow = 'hidden';
                } else if (!force && isActive) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    overlay.classList.remove('active');
                    body.style.overflow = 'auto';
                    
                    // También cerrar todos los submenús al cerrar el menú principal
                    navItems.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            } else {
                if (isActive) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    overlay.classList.remove('active');
                    body.style.overflow = 'auto';
                    
                    // Cerrar todos los submenús
                    navItems.forEach(item => {
                        item.classList.remove('active');
                    });
                } else {
                    navLinks.classList.add('active');
                    menuToggle.classList.add('active');
                    overlay.classList.add('active');
                    body.style.overflow = 'hidden';
                }
            }
        }

        // Toggle del menú principal
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        overlay.addEventListener('click', function() {
            toggleMenu(false);
        });

        // Manejo de submenús en móvil
        if (window.innerWidth <= 768) {
            navItems.forEach(item => {
                const link = item.querySelector('a');
                const dropdown = item.querySelector('.dropdown');
                
                if (dropdown) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Cerrar otros submenús abiertos
                        navItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Toggle del submenú actual
                        item.classList.toggle('active');
                    });
                }
            });
        }

        // Manejo de clics en enlaces del dropdown
        const dropdownLinks = document.querySelectorAll('.dropdown a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // No prevenir el default para que navegue
                // Cerrar el menú después de la navegación
                setTimeout(() => {
                    toggleMenu(false);
                }, 100);
            });
        });

        // Cerrar menú al hacer click en cualquier enlace que no tenga dropdown
        const simpleLinks = document.querySelectorAll('.nav-item > a:not(:has(~ .dropdown))');
        simpleLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    toggleMenu(false);
                }, 100);
            });
        });

        // Prevenir que clics dentro del menú lo cierren
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Manejar cambio de tamaño de ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // En desktop, asegurar que el menú está visible
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = 'auto';
                
                // Resetear submenús
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    });

    fetch("/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });