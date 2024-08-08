document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.getElementById('menuToggle');
    var menu = document.getElementById('dropdownMenu');

    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        menu.classList.toggle('hiddenMenu');
    });

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && event.target !== menuToggle) {
            menu.classList.add('hiddenMenu');
        }
    });

    menu.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            menu.classList.add('hiddenMenu');
        }
    });
});
