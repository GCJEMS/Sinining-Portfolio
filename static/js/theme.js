// Theme Manager
class ThemeManager {
    constructor() {
        this.themeKey = 'portfolio-theme';
        this.darkMode = 'dark';
        this.lightMode = 'light';
        this.init();
    }

    init() {
        // Check for saved preference or system preference
        const savedTheme = localStorage.getItem(this.themeKey);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = savedTheme || (systemPrefersDark ? this.darkMode : this.lightMode);
        this.setTheme(theme);
        
        // Add event listener for theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.themeKey)) {
                this.setTheme(e.matches ? this.darkMode : this.lightMode);
            }
        });
    }

    setTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        localStorage.setItem(this.themeKey, theme);
        this.updateToggleIcon(theme);
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') || this.lightMode;
        const newTheme = currentTheme === this.lightMode ? this.darkMode : this.lightMode;
        this.setTheme(newTheme);
    }

    updateToggleIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (theme === this.darkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }
}

// Initialize theme manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeManager());
} else {
    new ThemeManager();
}
