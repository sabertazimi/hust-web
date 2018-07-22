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
            'content': ''
        },
        {
            'title': '12 - Key Sequence Detection',
            'content': ''
        },
        {
            'title': '13 - Slide in on Scroll',
            'content': ''
        },
        {
            'title': '14 - JavaScript References VS Copying',
            'content': ''
        },
        {
            'title': '15 - LocalStorage',
            'content': ''
        },
        {
            'title': '16 - Mouse Move Shadow',
            'content': ''
        },
        {
            'title': '17 - Sort Without Articles',
            'content': ''
        },
        {
            'title': '18 - Adding Up Times with Reduce',
            'content': ''
        },
        {
            'title': '19 - Webcam Fun',
            'content': ''
        },
        {
            'title': '20 - Speech Detection',
            'content': ''
        },
        {
            'title': '21 - Geolocation',
            'content': ''
        },
        {
            'title': '22 - Follow Along Link Highlighter',
            'content': ''
        },
        {
            'title': '23 - Speech Synthesis',
            'content': ''
        },
        {
            'title': '24 - Sticky Nav',
            'content': ''
        },
        {
            'title': '25 - Event Capture, Propagation, Bubbling and Once',
            'content': ''
        },
        {
            'title': '26 - Stripe Follow Along Nav',
            'content': ''
        },
        {
            'title': '27 - Click and Drag',
            'content': ''
        },
        {
            'title': '28 - Video Speed Controller',
            'content': ''
        },
        {
            'title': '29 - Countdown Timer',
            'content': ''
        },
        {
            'title': '30 - Whack A Mole',
            'content': ''
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
                        <h3 class="card-title"><a target="_blank" href="https://sabertazimi.github.io/hust-web/javascript30/${title}">${title}</a></h3>
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
