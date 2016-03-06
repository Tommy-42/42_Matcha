$( document ).ready(function() {
});
// Extend jQuery.fn with our new method
jQuery.extend( jQuery.fn, {
    // Name of our method & one argument (the parent selector)
    hasParent: function( pSelector ) {
        // Return truthy/falsey based on presence in parent
        return !!$(pSelector).find(this).length;;
    }
});