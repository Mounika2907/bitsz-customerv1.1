// $(window).on('scroll', function () {
// 	if ($(window).scrollTop()) {
// 		$('.navbar').addClass('blackto');
// 	} else {
// 		$('.navbar').removeClass('blackto');
// 	}
// })
$(document).ready(function () {
	$('.navbar-nav>li>a').on('click', function () {
		$('.navbar-collapse').collapse('hide');
	});
});

// $(document).ready(function () {
// 	$('#feature').owlCarousel({
// 		loop: false,
// 		margin: 10,
// 		nav: true,
// 		// rewind: true,
// 		dots: false,
// 		navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
// 		autoplay: false,
// 		// autoplaySpeed: 100,
// 		// autoPlay: 20000,
// 		// center:true,
// 		responsive: {

// 			0: {
// 				items: 1
// 			},
// 			600: {
// 				items: 2
// 			},
// 			1000: {
// 				items: 4
// 			}
// 		}
// 	});
// });



// $(document).ready(function () {
//     $('#menuIcon').click(function () {
//         $('#mainMenu').css('right', '0px');
//         function showMenu() {
//             $('#mainMenu').css('-webkit-clip-path', 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0% 50%);');
//             $('#menuIcon').animate({ right: '0' }, 300);
//         }
//         setTimeout(showMenu, 100);
//     });

//     $('#close').click(function () {
//         $('#mainMenu').css('-webkit-clip-path', 'polygon(25% 0%, 100% 1%, 100% 100%, 25% 100%, 0% 50%);');
//         function closeMenu() {
//             $('#mainMenu').css('right', '-200px');
//             $('#menuIcon').animate({ right: '0' }, 300);
//         }
//         setTimeout(closeMenu, 100);

//         function originalLayout() {
//             $('#mainMenu').css('-webkit-clip-path', 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0% 50%);');
//         }
//         setTimeout(originalLayout, 600);
//     });
// });

// $(document).ready((function () {
//     $('#sidenav-btn').click(function () {
//         $('#sidenav-btn').toggleClass('active-btn');
//         $('#menu').toggleClass('active-menu');
//         $('#menudiplsay').toggleClass('active-body');

//     });
// }));


// $(document).ready((function () {
//     $('.pan-edit').click(function () {
//         $('.pan-inp').focus();
//     });
// }));

// function edit(id){
// 	// let btn = document.getElementsByClassName('pan-edit');
// 	let inp = document.getElementsByClassName('pan-inp');
// 	// if (id) {
// 		inp.focus();
// 	// }
// }

// $('.pan-edit').click(function() {
//     $(this).find('input[type="text"]').focus();
// });


// var container = $('.table-height1'),
//     scrollTo = $('#center-tr');

// container.animate({
//     // scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
//     scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - (container.height()/2)
// });




window.sr = ScrollReveal();

sr.reveal('.sr1', {
	duration: 2000,
	origin: 'bottom',
	distance: '30px',
	opacity: 0.3,
	delay: 0,
	// easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
	// rotate: { x: 0, y: 10, z: 0 },
});

// sr.reveal('.home-subtitle', {
// 	duration: 2000,
// 	origin: 'bottom',
// 	distance: '100px',
// 	delay: 100,
// 	opacity: 0,
// });

// sr.reveal('.home-btn', {
// 	duration: 2000,
// 	origin: 'bottom',
// 	distance: '100px',
// 	delay: 200,
// 	opacity: 0,
// });


// sr.reveal('.choose-title', {
// 	duration: 1500,
// 	origin: 'bottom',
// 	distance: '70px',
// 	viewFactor: 0.01,
// 	delay: 0,
// 	opacity: 0.1,
// 	easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
// });


// sr.reveal('.choose-content', {
// 	duration: 1900,
// 	origin: 'bottom',
// 	distance: '40px',
// 	viewFactor: 0.01,
// 	delay: 100,
// 	opacity: 0.6,
// 	easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
// });


// sr.reveal('.service-subtitle', {
// 	duration: 2500,
// 	origin: 'right',
// 	distance: '210px',
// 	viewFactor: 0.3,
//     delay: 0,
//     opacity: 0.7,
// 	easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
// });
