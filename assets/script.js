// Component Loader with Debug
class ComponentLoader {
    constructor() {
        // Only load components that exist
        this.components = [
            { name: 'header', container: 'header-container' },
            { name: 'hero', container: 'hero-container' },
            { name: 'experience', container: 'experience-container' },
            { name: 'projects', container: 'projects-container' },
            { name: 'certifications', container: 'certifications-container' },
            { name: 'contact', container: 'contact-container' },
            { name: 'footer', container: 'footer-container' }
        ];
    }

    async loadComponent(componentName, containerId) {
        try {
            console.log(`🔄 Loading component: ${componentName}`);
            const container = document.getElementById(containerId);
            if (!container) {
                console.warn(`Container not found for component: ${componentName}`);
                return;
            }
            console.log(`📦 Container found:`, container);
            
            const response = await fetch(`components/${componentName}.html`);
            console.log(`📡 Response status for ${componentName}:`, response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            console.log(`📄 HTML length for ${componentName}:`, html.length);
            
            container.innerHTML = html;
            console.log(`✅ Component ${componentName} loaded successfully`);
        } catch (error) {
            console.error(`❌ Error loading ${componentName}:`, error);
        }
    }

    async loadAll() {
        for (const component of this.components) {
            await this.loadComponent(component.name, component.container);
        }
        this.initializeInteractions();
    }

    initializeInteractions() {
        this.initProgressBar();
        this.initFloatingNav();
        this.initSmoothScroll();
        this.initAnimations();
    }

    initProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }
    }

    initFloatingNav() {
        const floatingNav = document.getElementById('floating-nav');
        if (floatingNav) {
            floatingNav.innerHTML = `
                <div class="bg-slate-700/50 backdrop-blur-sm border border-indigo-500/20 p-3 space-y-2 rounded-xl shadow-lg">
                    <a href="#home" class="block w-10 h-10 rounded-full bg-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center text-xs font-bold text-indigo-400" title="Home">H</a>
                    <a href="#experience" class="block w-10 h-10 rounded-full bg-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center text-xs font-bold text-indigo-400" title="Experience">E</a>
                    <a href="#projects" class="block w-10 h-10 rounded-full bg-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center text-xs font-bold text-indigo-400" title="Projects">P</a>
                    <a href="#certifications" class="block w-10 h-10 rounded-full bg-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center text-xs font-bold text-indigo-400" title="Certifications">C</a>
                    <a href="#contact" class="block w-10 h-10 rounded-full bg-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center text-xs font-bold text-indigo-400" title="Contact">C</a>
                </div>
            `;
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    floatingNav.classList.add('visible');
                } else {
                    floatingNav.classList.remove('visible');
                }
            });
        }
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.loadAll();
});

// Utility Functions
function toggleExpand(button) {
    // This function is now more robust.
    // It finds the parent card and then finds the content within that card.
    // This avoids errors if the HTML structure isn't perfect.
    const parentCard = button.closest('.bg-slate-700\\/50');
    if (!parentCard) {
        console.error("Could not find the parent container for the expand button.");
        return;
    }

    const content = parentCard.querySelector('.expandable-content');
    const expandText = button.querySelector('.expand-text');
    const icon = button.querySelector('svg');

    // Ensure all required elements are found before proceeding.
    if (!content || !expandText || !icon) {
        console.error("One or more elements required for the expand function were not found.");
        return;
    }
    
    if (content.classList.contains('expanded')) {
        // Collapse
        content.classList.remove('expanded');
        content.style.maxHeight = '0';
        expandText.textContent = 'Show More Accomplishments';
        icon.style.transform = 'rotate(0deg)';
        button.classList.remove('bg-indigo-500/20');
        button.classList.add('bg-indigo-500/10');
    } else {
        // Expand
        content.classList.add('expanded');
        content.style.maxHeight = content.scrollHeight + 'px';
        expandText.textContent = 'Show Less Accomplishments';
        icon.style.transform = 'rotate(180deg)';
        button.classList.remove('bg-indigo-500/10');
        button.classList.add('bg-indigo-500/20');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}
