var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onLeave'
    }
});


//pin the navigation
var pin = new ScrollMagic.Scene({
    triggerElement: '#exportPDF'
}).setPin('#exportPDF', {pushFollowers: false}).addTo(controller);
