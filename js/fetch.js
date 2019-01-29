let biographyLink = document.querySelector('#biography-link');
let anAutohagiographyLink = document.querySelector('#anAutohagiography-link');
let theBookOfTheLawLink = document.querySelector('#theBookOfTheLaw-link');
let moonchildLink = document.querySelector('#moonchild-link');
let theBookOfTheLiesLink = document.querySelector('#theBookOfTheLies-link');

let linkArray = [biographyLink, anAutohagiographyLink, theBookOfTheLawLink, moonchildLink, theBookOfTheLiesLink];

linkArray.forEach((eachLink) => {
    eachLink.addEventListener('click', (e) => {
        switch (eachLink) {
            case biographyLink:
                fetchPage(eachLink, 'biography.html');
                break;

            case anAutohagiographyLink:
                fetchPage(eachLink, 'anAutohagiography.html');
                break;

            case theBookOfTheLawLink:
                fetchPage(eachLink, 'theBookOfTheLaw.html');
                break;

            case moonchildLink:
                fetchPage(eachLink, 'moonchild.html');
                break;

            case theBookOfTheLiesLink:
                fetchPage(eachLink, 'theBookOfTheLies.html');
                break;
        }
    })
})

function fetchPage(link, page) {
    let baseURL = `${window.location.protocol}//${window.location.hostname}`;

    if (window.location.port) {
        baseURL += `:${window.location.port}`;
    }

    fetch(`${baseURL}/${page}`)
        .then(function (response) {
            return response.text()
        })
        .then(function (html) {
            let doc = new DOMParser().parseFromString(html, "text/html");

            anime({
                targets: '.text-section h1, .text-section p, .text-section div',
                translateX: 700,
                opacity: 0,
                easing: 'easeInExpo',
                duration: 700,
                complete: (anim) => {
                    document.querySelector('.column-wrappers').remove();
                }
            })

            anime({
                targets: '.image-section',
                translateY: 2200,
                opacity: 0,
                easing: 'easeInExpo',
                duration: 700,
            })
            anime({
                targets: '.gallery-counter',
                translateX: 5200,
                opacity: 0,
                easing: 'easeInExpo',
                duration: 700,
            })
           

            setTimeout(function () {
                document.querySelector('body').insertBefore(doc.querySelector('.new-contents'), document.querySelector('.gallery-nav'));

                anime({
                    targets: '.new-contents .text-section h1, .new-contents .text-section p, .new-contents .text-section div',
                    translateX: [-600, 0],
                    delay: (el, i) => 100 * i,
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                })
                anime({
                    targets: '.image-section',
                    translateY: [-600, 0],
                    delay: (el, i) => 100 * i,
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                })
                anime({
                    targets: '.gallery-counter',
                    translateX: [0, 350],
                    delay: (el, i) => 100 * i,
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                })
            }, 800);
        })
}
