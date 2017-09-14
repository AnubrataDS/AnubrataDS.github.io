(function($) {
    'use strict';
    var $body = $('html, body'), // Define jQuery collection 
        content = $('#content').smoothState({
            onStart: {
                duration: 250,
                render: function() {
                    content.toggleAnimationClass('is-exiting');
                    console.log('HERE');
                    // Scroll user to the top
                    $body.animate({ 'scrollTop': 0 }, "slow");

                }
            }
        }).data('smoothState');
})(jQuery);