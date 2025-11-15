(function () {
    const cardsData = [
        {
            'title': '01 - JavaScript Drum Kit',
            'content': 'html "data-*" attr and "transitionend" event'
        },
        {
            'title': '02 - JS + CSS Clock',
            'content': 'css "trasform-origin" and pseduo element drawing'
        },
        {
            'title': '03 - CSS Variables',
            'content': 'css variables'
        },
        {
            'title': '04 - Array Cardio Day 1',
            'content': 'simple JavaScript array API'
        },
        {
            'title': '05 - Flex Panel Gallery',
            'content': 'flex box and use "transitionend" event to delay animation'
        },
        {
            'title': '06 - Type Ahead',
            'content': 'awesome search bar and awesome list css style (with transform and background)'
        },
        {
            'title': '07 - Array Cardio Day 2',
            'content': 'simple JavaScript array API'
        },
        {
            'title': '08 - Fun with HTML5 Canvas',
            'content': 'canvas api, hsl css and "mouse"(move/up/down/out) event'
        },
        {
            'title': '09 - Dev Tools Domination',
            'content': 'nonsense - all you can get on google chrome devtools documentation'
        },
        {
            'title': '10 - Hold Shift and Check Checkboxes',
            'content': '"+" css selector and checkbox input api'
        },
        {
            'title': '11 - Custom Video Player',
            'content': 'Media element api and Media events'
        },
        {
            'title': '12 - Key Sequence Detection',
            'content': 'key input events'
        },
        {
            'title': '13 - Slide in on Scroll',
            'content': 'window scroll events, debouncing function and scroll effect with "opacity" and "translateX" transition'
        },
        {
            'title': '14 - JavaScript References VS Copying',
            'content': 'skip'
        },
        {
            'title': '15 - LocalStorage',
            'content': 'local storage, event delegation and "submit" event'
        },
        {
            'title': '16 - Mouse Move Shadow',
            'content': 'textShadow css style and offsetX/offsetWidth/offsetTop HTML element attributes'
        },
        {
            'title': '17 - Sort Without Articles',
            'content': 'sort, map, join and replace'
        },
        {
            'title': '18 - Adding Up Times with Reduce',
            'content': 'reduce and math api'
        },
        {
            'title': '19 - Webcam Fun',
            'content': 'webcam media api, URL.createObjectURL/canvas.toDataURL and pixels filter'
        },
        {
            'title': '20 - Speech Detection',
            'content': 'SpeechRecognition api'
        },
        {
            'title': '21 - Geolocation',
            'content': 'geolocation api'
        },
        {
            'title': '22 - Follow Along Link Highlighter',
            'content': 'awesome hovering highlight css style with "span.highlight", getBoundingClientRect (with ScrollX/Y fix)'
        },
        {
            'title': '23 - Speech Synthesis',
            'content': 'speech synthesis api and select input element api'
        },
        {
            'title': '24 - Sticky Nav',
            'content': 'sticky nav bar when scrolling down (with padding-top max-width fixed)'
        },
        {
            'title': '25 - Event Capture, Propagation, Bubbling and Once',
            'content': 'event mechnism - capture/once config and event.stopPropagation'
        },
        {
            'title': '26 - Stripe Follow Along Nav',
            'content': 'awesome dropdown nav - seperate dropdown panel resizable (w/h, opacity and translate) (when hovering on different main nav-li'
        },
        {
            'title': '27 - Click and Drag',
            'content': 'click and drag effect with mousedown/mousemove/mouseup/mouseleave events and pageX/offsetLeft/scrollLeft attributes'
        },
        {
            'title': '28 - Video Speed Controller',
            'content': 'playbackRate and mouse events'
        },
        {
            'title': '29 - Countdown Timer',
            'content': 'setInterval/clearInterval and document.name.name.etc'
        },
        {
            'title': '30 - Whack A Mole',
            'content': 'random api and event.isTrusted attribute'
        }
    ]
    const createCardComponent = (day, title, content) => {
        return (`
            <div class="card">
                <div class="front">
                    <h2>Day ${day}</h2>
                    <p>Click for Details</p>
                </div>
                <div class="back">
                    <div class="content">
                        <h3 class="card-title"><a target="_blank" href="https://sabertazimi.github.io/hust-web/js/30/${title}">${title}</a></h3>
                        <p>${content}</p>
                    </div>
                </div>
            </div>
        `);
    };
    let cardsDOM = '';

    cardsData.forEach((card, index) => {
        cardsDOM += createCardComponent(index + 1, card.title, card.content);
    });

    const container = document.querySelector('.card-container');
    container.innerHTML = cardsDOM;

    const cards = document.querySelectorAll('div.card');
    cards.forEach(card => card.addEventListener('click', (event) => {
        card.classList.add('flipped');
        const link = card.querySelector('a');
        link.style.pointerEvents = 'all';
    }));
})();
