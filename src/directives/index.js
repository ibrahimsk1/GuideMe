import Vue from 'vue'

Vue.directive('iconScaleOnHover', {
    bind: function (el, binding, vnode) {

        el.style.transition = "0.3s ease-in";

        el.onmouseover = function () {

            if (binding.value.color == "white") {
                el.style.color = '#fff';
            }
            else if (binding.value.color == "black") {
                el.style.color = '#000';
            } else if (binding.value.color == "blue") {
                el.style.color = '#008ecc'
            }

            el.style.transform = "scale(1.3)";
        }
        el.onmouseout = function () {
            el.style.color = "inherit";
            el.style.transform = "scale(1)";
        }

    }
})