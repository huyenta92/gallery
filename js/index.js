(function() {
  const scrollEl = '.smooth-scroll';
  const scroll = new LocomotiveScroll({
    el: document.querySelector(scrollEl),
    smooth: true,
    lerp: 0.05
  });
  gsap.registerPlugin(ScrollTrigger);
  scroll.on('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(scrollEl, {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  });

  const img = document.querySelectorAll('.thumbnail');
  const gsapImg = gsap.utils.toArray(img);
  gsapImg.forEach(element => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        scroller: scrollEl,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.7,
        ease: Elastic.easeOut.config(3, 0.3)
      }
    });

    timeline.fromTo(element,
      {
        scaleX: 1.2,
        scaleY: 1.2
      },
      {
        scaleX: 1,
        scaleY: 1
      } 
    )
  });

  ScrollTrigger.addEventListener('refresh', () => scroll.update());
  ScrollTrigger.refresh();
})()


















