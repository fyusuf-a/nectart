import { preloadFonts } from '../utils.js';

// Splitting.js
// Calling the Splitting function to split the text into individual words/characters, 
const splittingOutput = Splitting();

// .content__text elements
const texts = [...document.querySelectorAll('.content__text')];

// Cache all .char elements at the beginning. Each text contains multiple words, each word contains multiple chars.
const chars = texts.map(text => {
    // Get the words for each text
    const words = text.querySelectorAll('.word');
    // For each word, get the chars
    return [...words].map(word => word.querySelectorAll('.char'));
});

// Let's define the position of the current text
let currentTextPos = 0;

// Check if there's an animation in progress
let isAnimating = false;

// Add class current to the "current" one
texts[currentTextPos].classList.add('content__text--current');

// switch between texts
const switchTexts = () => {

    if ( isAnimating ) return false;
    isAnimating = true;
    
    const upcomingTextPos = currentTextPos ? 0 : 1;

    // All current text words
    const currentWords = splittingOutput[currentTextPos].words;
    
    // All upcoming text words
    const upcomingtWords = splittingOutput[upcomingTextPos].words;

    const tl = gsap.timeline({
        onComplete: () => {
            // Update currentTextPos
            currentTextPos = upcomingTextPos;
            isAnimating = false;
        }
    });
    currentWords.forEach((_, wordIndex) => {
        const wordTimeline = gsap.timeline()
        .fromTo(chars[currentTextPos][wordIndex], {
            willChange: 'transform',
            transformOrigin: '50% 0%',
            opacity: 1,
            xPercent: 0,
            yPercent: 0
        }, {
            duration: .3,
            ease: 'power4',
            opacity: 0,
            xPercent: () => gsap.utils.random(-50,50),
            yPercent: () => gsap.utils.random(-50,50),
            stagger: {
                each: 0.03,
                from: 'random'
            },
        });
        tl.add(wordTimeline, Math.random()*.3);
    });
    
    tl.add(() => {
        texts[currentTextPos].classList.remove('content__text--current');
    })
    tl.add(() => {
        texts[upcomingTextPos].classList.add('content__text--current');
    }, '>-=0.6')
    .addLabel('previous', '>');

    upcomingtWords.forEach((_, wordIndex) => {
        const wordTimeline = gsap.timeline()
        .fromTo(chars[upcomingTextPos][wordIndex], {
            willChange: 'transform',
            transformOrigin: '50% 100%',
            opacity: 0,
            xPercent: () => gsap.utils.random(-50,50),
            yPercent: () => gsap.utils.random(-50,50),
        }, {
            duration: .4,
            ease: 'power4',
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            stagger: {
                each: 0.02,
                from: 'random'
            },
        });
        tl.add(wordTimeline, `previous+=${Math.random()*.3}`);
    });

};

document.querySelector('.trigger').addEventListener('click', switchTexts);

// Start preloading fonts
preloadFonts('wah6sge').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
});