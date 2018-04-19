export const scroll = {
  inserted: function(el, binding) {
   let f = function(evt) {
     if (binding.value(evt, el)) {
       window.removeEventListener('scroll', f);
     }
   };
   window.addEventListener('scroll', f);
 }
}
export const clickOutside = {
    priority: 700,
    bind:  function(el, binding, vnode){
       el.event = (event) => {
        
         // Check that click was outside the el and his children.
         if (!(el === event.target || el.contains(event.target))) {
             // console.log('Clicked outside');

             // Call the method provided as the attribute value.
             vnode.context[binding.expression](event);
         }
     };

     document.body.addEventListener('click', el.event);
   },
   unbind: function(el) {
     // console.log("el in unbind:",el)
     document.body.removeEventListener('click', el.event);
   }
}