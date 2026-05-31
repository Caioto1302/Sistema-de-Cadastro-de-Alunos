function initTogglePassword() {
    const toggleIcons = document.querySelectorAll('.toggle-password');
    console.log(`[Toggle Password] Encontrados ${toggleIcons.length} ícones de toggle nas páginas.`);
    
    toggleIcons.forEach(icon => {
        // Remover listener anterior caso a função seja chamada múltiplas vezes
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        newIcon.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            const container = newIcon.closest('.form-group');
            if (!container) return;

            const input = container.querySelector('input');
            if (!input) return;
            
            if (input.type === 'password') {
                input.type = 'text';
                newIcon.classList.remove('bx-hide');
                newIcon.classList.add('bx-show');
            } else if (input.type === 'text') {
                input.type = 'password';
                newIcon.classList.remove('bx-show');
                newIcon.classList.add('bx-hide');
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTogglePassword);
} else {
    initTogglePassword();
}
