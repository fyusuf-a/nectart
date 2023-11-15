import { gsap } from 'gsap';

/** Direction constants */
const NEXT = 1;
const PREV = -1;

/**
 * Slideshow Class
 * Manages slideshow functionality including navigation and animations.
 * @export
 */
export class Slideshow {

  /**
* Holds references to relevant DOM elements.
* @type {Object}
*/
  DOM = {
    el: null,            // Main slideshow container
    slides: null,        // Individual slides
    slidesInner: null    // Inner content of slides (usually images)
  };

  /**
  * Index of the current slide being displayed.
  * @type {number}
  */
  current = 0;
  /**
  * Total number of slides.
  * @type {number}
  */
  slidesTotal = 0;

  /**
  * Slideshow constructor.
  * Initializes the slideshow and sets up the DOM elements.
  * @param {HTMLElement} DOM_el - The main element holding all the slides.
  */
  constructor(DOM_el) {
    // Initialize DOM elements
    this.DOM.el = DOM_el;
    this.DOM.slides = [...this.DOM.el.querySelectorAll('.slide')];
    this.DOM.slidesInner = this.DOM.slides.map(item => item.querySelector('.slide__img__container'));
    
    // Set initial slide as current
    this.DOM.slides[this.current].classList.add('slide--current');
    
    // Count total slides
    this.slidesTotal = this.DOM.slides.length;
    this.current = this.slidesTotal - 1;
  }

  /**
  * Navigate to the next slide.
  * @returns {void}
  */
  next() {
    this.navigate(NEXT);
  }

  /**
  * Navigate to the previous slide.
  * @returns {void}
  */
  prev() {
    this.navigate(PREV);
  }

  /**
  * Navigate through slides.
  * @param {number} direction - The direction to navigate. 1 for next and -1 for previous.
  * @returns {Promise<any>} - Return false if the animation is currently running.
  */
  navigate(direction, makeDisappear = false) {  
    // Update the current slide index based on direction
    const previous = this.current;
    this.current = direction === 1 ? 
      this.current < this.slidesTotal - 1 ? ++this.current : 0 :
      this.current > 0 ? --this.current : this.slidesTotal - 1

    // Get the current and upcoming slides and their inner elements
    const currentSlide = this.DOM.slides[previous];
    const currentInner = this.DOM.slidesInner[previous];
    const upcomingSlide = this.DOM.slides[this.current];
    const upcomingInner = this.DOM.slidesInner[this.current];
    
    // Animation sequence using GSAP
    const timeline = gsap
      .timeline({
        defaults: {
          duration: 1.2, 
          ease: 'expo'
        },
        onStart: () => {
          // Add class to the upcoming slide to mark it as current
          this.DOM.slides[this.current].classList.add('slide--current');
          gsap.set(upcomingSlide, {zIndex: 99});
        },
        onComplete: () => {
          // Remove class from the previous slide to unmark it as current
this.DOM.slides[previous].classList.remove('slide--current');
          gsap.set(upcomingSlide, {zIndex: 1})
        }
      })
      // Defining animation steps
      .addLabel('start', 0)
      .to(currentSlide, {
        ease: 'power2',
        autoAlpha: 0
      }, 'start')
    if (!makeDisappear) {
      timeline.fromTo(upcomingSlide, {
        autoAlpha: 1,
        scale: 0,
        yPercent: direction*100,
      }, {
        scale: 1,
        yPercent: 0
      }, 'start')
        .fromTo(upcomingInner, {
          scale: 2,
          filter: 'brightness(200%)'
        }, {
          scale: 1,
          filter: 'brightness(100%)'
        }, 'start')
    }
    return timeline;
  }
}
