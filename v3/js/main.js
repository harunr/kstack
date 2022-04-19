document.addEventListener('DOMContentLoaded', function() {
  // Links to sections of the website
  const websiteLocalLinks = document.querySelectorAll('a[href^="#"]');

  // Nav variables
  const navToggleBtn = document.querySelector('.nav__toggle');
  const navContainer = document.querySelector('.nav__list-container');
  const navBreakpoint = 768;

  // Case study cards
  const caseStudySection = document.querySelector('.home-case-studies');
  const caseStudyCardsContainer = document.querySelector('.cards-expandable__container');
  const caseStudyCards = document.querySelectorAll('.cards-expandable__item');
  const caseStudyPrevBtn = document.querySelector('.cards-expandable .btn--nav-prev');
  const caseStudyNextBtn = document.querySelector('.cards-expandable .btn--nav-next');
  const caseStudyReadMoreBtns = document.querySelectorAll('.cards-expandable .cards-expandable__readmore-btn');
  const caseStudyCardWidth = caseStudyCards[0].clientWidth;
  const caseStudyBreakpoint = 1024;

  // Case study modals
  const modal = document.querySelector('.modal');
  const modalItems = document.querySelectorAll('.modal .modal__item');
  const modalPrevBtn = document.querySelector('.modal .btn--nav-prev');
  const modalNextBtn = document.querySelector('.modal .btn--nav-next');
  const modalCloseBtns = document.querySelectorAll('.modal .modal__close-btn');


  /*
   * FUNCTION DECLARATIONS
   */
  // Check the position of the cards and disable the prev/next buttons if necessary
  const checkCaseStudyPosition = function() {
    const firstCardPosition = caseStudyCards[0].getBoundingClientRect().left;
    const lastCardPosition = caseStudyCards[caseStudyCards.length - 1].getBoundingClientRect().right;
    const offsetLeft = parseInt(getComputedStyle(caseStudySection).paddingLeft);
    const offsetRight = parseInt(caseStudySection.getBoundingClientRect().width);

    // Check if the cards section are in the beginning (first card visible)
    if (firstCardPosition === offsetLeft) {
      // Disable the Prev button
      caseStudyPrevBtn.classList.add('btn--disabled-nav-prev');
    } else {
      caseStudyPrevBtn.classList.remove('btn--disabled-nav-prev');
    }

    // Check if the cards section reached its end (last card visible)
    if (lastCardPosition === offsetRight) {
      // Disable the Next button
      caseStudyNextBtn.classList.add('btn--disabled-nav-next');
    } else {
      caseStudyNextBtn.classList.remove('btn--disabled-nav-next');
    }
  };

  // Check the current item in the modal and disable the prev/next buttons if necessary
  const checkModalPosition = function() {
    const firstModalItem = modalItems[0];
    const lastModalItem = modalItems[modalItems.length - 1];
    const activeModalItem = document.querySelector('.modal__item--active');

    if (firstModalItem === activeModalItem) {
      // Disable the Prev button
      modalPrevBtn.classList.add('btn--disabled-nav-prev');
    } else {
      modalPrevBtn.classList.remove('btn--disabled-nav-prev');
    }

    if (lastModalItem === activeModalItem) {
      // Disable the Next button
      modalNextBtn.classList.add('btn--disabled-nav-next');
    } else {
      modalNextBtn.classList.remove('btn--disabled-nav-next');
    }
  }

  // Scroll to the prev/next card
  const scrollCardsSection = function(cardsContainer, distance) {
    cardsContainer.scrollBy({left: distance, top: 0, behavior: 'smooth'});
  };

  // Activate card
  const activateCard = function(card) {
    const cardWidth = card.getBoundingClientRect().width;
    const cardOffsetLeft = card.getBoundingClientRect().left;
    const cardOffsetRight = card.getBoundingClientRect().right;
    const sectionOffsetLeft = parseInt(getComputedStyle(caseStudySection).paddingLeft);
    const sectionOffsetRight = caseStudySection.getBoundingClientRect().right;

    // Check if card is not fully visible
    if (card.classList.contains('cards-expandable__item--active')) {
      if (cardOffsetLeft < 0 && sectionOffsetLeft - cardOffsetLeft < cardWidth) {
        // If card is too far on the left
        // Scroll to the left
        caseStudyPrevBtn.click();
      } else if (sectionOffsetRight - cardOffsetLeft < cardWidth) {
        caseStudyNextBtn.click();
      }
    }
  }

  // Change active modal item
  const changeActiveModalItem = function(event, direction) {
    event.stopPropagation();
    const activeCard = document.querySelector('.cards-expandable__item--active');
    const activeModalItem = document.querySelector('.modal__item--active');
    const activeModalItemId = activeModalItem.dataset.cardId;

    if (!event.currentTarget.classList.contains(`btn--disabled-nav-${direction}`)) {
      // Select the prev or next element
      const newModalItem = direction == 'prev' ? activeModalItem.previousElementSibling : activeModalItem.nextElementSibling;
      const newActiveCard = direction == 'prev' ? activeCard.previousElementSibling : activeCard.nextElementSibling;

      // Disable the modal while we change the modal item
      modal.classList.remove('modal--open');
      setTimeout(function() {
        activeModalItem.classList.remove('modal__item--active');
        newModalItem.classList.add('modal__item--active');

        // Bring back the modal
        modal.classList.add('modal--open');
        modal.scrollTop = 0;
      }, 500);

      

      // Change the active class of the card too
      // Disable the other active cards
      if (activeCard && activeCard != this){
        activeCard.classList.remove('cards-expandable__item--active');
      }
      
      newActiveCard.classList.add('cards-expandable__item--active');
      newActiveCard.scrollIntoView();
    }
  };
  /*
   * END DECLARATIONS
   */

  /*
   * SMOOTH SCROLL TO LOCAL LINKS
   */
  websiteLocalLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Check if called inside modal
        if (this.closest('.modal')) {
          modal.classList.remove('modal--open');
        }

        // Check if inside mobile nav menu
        if (window.innerWidth < navBreakpoint) {
          navToggleBtn.click();
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
    });
  });

  /*
   * MOBILE MENU
   */
  navToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('nav__toggle--active');
    navContainer.classList.toggle('nav__list-container--active');
  });


  /*
   * CASE STUDY SECTION
   */
  // Case study card activation on click
  caseStudyCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const currentActiveCard = document.querySelector('.cards-expandable__item--active');

      // Disable the other active cards
      if (currentActiveCard && currentActiveCard != this){
        currentActiveCard.classList.remove('cards-expandable__item--active');
      }

      this.classList.toggle('cards-expandable__item--active');
      activateCard(card);
    });
  });

  // Case study read more button
  caseStudyReadMoreBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();

      const itemContainer = this.closest('.cards-expandable__item');
      const itemId = itemContainer.dataset.cardId;
      const currentActiveCard = document.querySelector('.cards-expandable__item--active');
      const currentActiveModal = document.querySelector('.modal__item--active');

      // Disable the other active cards
      if (currentActiveCard && currentActiveCard != this){
        currentActiveCard.classList.remove('cards-expandable__item--active');
      }
      
      itemContainer.classList.add('cards-expandable__item--active');

      // Disable the other active modal item (if any) and activate the correct one
      if (currentActiveModal) {
        document.querySelector('.modal__item--active').classList.remove('modal__item--active');
      }

      document.querySelector(`.modal .modal__item[data-card-id="${itemId}"]`).classList.add('modal__item--active');

      // Make the modal appear
      document.querySelector('.modal').classList.add('modal--open');
    })
  });

  // Make the first card active on desktop
  if (window.innerWidth >= caseStudyBreakpoint) {
    caseStudyCards[0].classList.toggle('cards-expandable__item--active');
    activateCard(caseStudyCards[0]);
  }


  // Disable/enable case study and modal prev/next buttons if needed
  checkCaseStudyPosition();
  checkModalPosition();

  setInterval(function() {
    checkCaseStudyPosition();
    checkModalPosition();
  }, 100);

  // Detect the the user scrolls through the cards
  caseStudyCardsContainer.addEventListener('scroll', function() {
    checkCaseStudyPosition();
  });


  /*
   * CASE STUDY BUTTONS
   */
  caseStudyPrevBtn.addEventListener('click', function(e) {
    // Offset of the cards section
    const offsetRight = parseInt(caseStudySection.getBoundingClientRect().width);
    // Last visible card will be after the offset 
    const lastVisibleCard = [...caseStudyCards].filter(card => card.getBoundingClientRect().right == offsetRight);
    const distance = lastVisibleCard[0] ? lastVisibleCard[0].clientWidth : caseStudyCardWidth;  

    // Scroll to the previous card
    scrollCardsSection(caseStudyCardsContainer, -distance);
  });

  caseStudyNextBtn.addEventListener('click', function(e) {
    // Offset of the cards section
    const offsetLeft = parseInt(getComputedStyle(caseStudySection).paddingLeft);
    // First visible card will be after the offset 
    const firstVisibleCard = [...caseStudyCards].filter(card => card.getBoundingClientRect().left == offsetLeft);
    const distance = firstVisibleCard[0] ? firstVisibleCard[0].clientWidth : caseStudyCardWidth;    

    // Scroll to the next card
    scrollCardsSection(caseStudyCardsContainer, distance);
  });


  /*
   * MODAL BUTTONS
   */
  modalPrevBtn.addEventListener('click', (e) => { changeActiveModalItem(e, 'prev'); });
  modalNextBtn.addEventListener('click', (e) => { changeActiveModalItem(e, 'next'); });
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.remove('modal--open');
    });
  });
});


if (jQuery("select.styled-select").length) {
  jQuery("select.styled-select").selectric();
}

jQuery('.home-methodology-item').each(function(){
  var $$_this = $(this);

  $$_this.click(function(){
    $$_this.addClass('animated')
  })

})


jQuery(".home-methodology-item:first-child").addClass('floated_item');
jQuery(".home-methodology-item").on("click",function(k){
  $p_this=$(this);

 setTimeout(function() { 
  $(".home-methodology-item").not($p_this).toggleClass("shrink");
}, 200);

 setTimeout(function() { 
  $p_this.toggleClass('shrink-parent');
  $('.full-process-btn').toggleClass('process-btn-show');
}, 100);


setTimeout(function() { 
  $('.home-methodology-item-wrap').toggleClass('has_scroll');
}, 2000);

$(".home-methodology-item").not(this).toggleClass("no_line");
setTimeout(function() { 
 $p_this.toggleClass('line_up');
}, 2200);

  // jQuery(".home-methodology").addClass("overflow-normal");
  jQuery(".home-methodology-item-wrap").toggleClass("psedu_none");
  jQuery(".home-methodology-item-wrap").toggleClass("increase_height");
  jQuery(".methodology-sub-title").fadeToggle(800);
  jQuery(".home-methodology-item.active").removeClass("active");
  jQuery(this).toggleClass("active");
  jQuery(this).toggleClass("p_scale");
  jQuery(".home-methodology-item.active").parents('.home-methodology-item-wrap').removeClass("active-all");
  jQuery(this).parents('.home-methodology-item-wrap').toggleClass("active-all");

  gsap.to(".home-methodology-item.active", {
  	onComplete: () => {
      jQuery(this).removeClass("rest-inactive");
    	jQuery(this).toggleClass("active");
    	gsap.to(this, {
		  	
  		});
  	}
	});
  var tb_index = $(this).index();
  var sec_index= tb_index + 1;
  if(sec_index < 5){
    setTimeout(function() { 
      jQuery(".home-methodology-item").removeClass('floated_item');
    jQuery(".home-methodology-item:first-child").removeClass('floated_item');
    jQuery(this).removeClass('floated_item');
    jQuery(".home-methodology-item").eq(sec_index).addClass('floated_item');
     }, 2000);
  }else{
    jQuery(".home-methodology-item").removeClass('floated_item');
    jQuery(".home-methodology-item:first-child").removeClass('floated_item');
  }


  if( tb_index == 0){
    $('#scrollArea').delay(0).animate({
      scrollLeft: $('#scrollArea').scrollLeft()==0
    }, 2000);
    return false;
  }
  else if( tb_index == 1){
    $('#scrollArea').delay(0).animate({
      scrollLeft: $('#scrollArea').scrollLeft()==0
    }, 2000);
    return false;
  }
  
  else if( tb_index == 2){
    $('#scrollArea').delay(280).animate({
      scrollLeft: $('#scrollArea').scrollLeft()==0
    }, 1700);
    return false;
  }
  else if( tb_index == 3){
    $('#scrollArea').delay(200).animate({
      scrollLeft: $('#scrollArea').scrollLeft()==0
    }, 1600);
    return false;
  }
  else if( tb_index == 4){
    $('#scrollArea').delay(0).animate({
      scrollLeft: $('#scrollArea').scrollLeft()==0
    },1800);
    return false;
  }


});

// console.log(tb_index);
jQuery(".full-process-btn").on("click",function(){
  jQuery(".home-methodology-item").removeClass('shrink-parent');
  jQuery(".home-methodology-item").removeClass('shrink');
  jQuery(".home-methodology-item").removeClass('p_scale');
  jQuery(".home-methodology-item").removeClass('line_up');
  jQuery(".home-methodology").removeClass("overflow-normal");
  jQuery(".home-methodology-item-wrap").removeClass("psedu_none");
  jQuery(".home-methodology-item-wrap").removeClass("increase_height");
  jQuery('.home-methodology-item-wrap').addClass('has_scroll');
  jQuery(".methodology-sub-title").fadeIn(800);
  jQuery(this).removeClass('process-btn-show');
});



