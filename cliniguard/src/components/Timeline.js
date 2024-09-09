// import { gsap } from 'gsap';

// export const createMasterTimeline = () => {
//   const tl = gsap.timeline();

//   tl.add(createNavbarTimeline(), 'start')
//     .add(createPageTimeline(), '+=0.5'); 

//   return tl;
// };

// const createNavbarTimeline = () => {
//   return gsap.timeline()
//     .fromTo('.navbar-item', 
//       { opacity: 0, y: -50 },
//       { opacity: 1, y: 0, duration: 0.5, delay: 0.2, stagger: 0.3 }
//     )
//     .fromTo('.navbar-logo', 
//       { opacity: 0, x: -50 },
//       { opacity: 1, x: 0, duration: 0.5 }, '<');
// };

// const createPageTimeline = () => {
//   return gsap.timeline()
//     .fromTo('.health-assessment-form', 
//       { opacity: 0 },
//       { opacity: 1, duration: 0.5 }
//     );
// };
