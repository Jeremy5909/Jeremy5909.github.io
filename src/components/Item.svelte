<!-- ---
const {name,location,tags} = Astro.props;
--- -->

<script lang="ts">
  import { onMount } from "svelte";

  export let name = "Item";
  export let location = "Location";
  export let tags = ["Tag1", "Tag2"];

  onMount(() => {
    let elements = document.querySelectorAll(".element");

    function getTransform(x, y, el) {
      const box = el.getBoundingClientRect();
      const screenDiagonal = Math.sqrt(
        window.innerWidth ** 2 + window.innerHeight ** 2
      );

      // Adjust the constrain value relative to screen size.
      const constrain = screenDiagonal / 10;

      const calcX = -(y - box.y - box.height / 2) / constrain;
      const calcY = (x - box.x - box.width / 2) / constrain;

      // Adjust the angles to make the rotation more balanced.
      const rotateXValue = calcX * 5;
      const rotateYValue = calcY;

      // Adjust the perspective value to make the text closer or farther in 3D space.

      return `perspective(100px) rotateX(${rotateXValue}deg) rotateY(${rotateYValue}deg)`;
    }

    function transformElement(el, xy) {
      const [x, y] = xy;
      el.style.transition = "transform 0.3s";
      el.style.transform = getTransform(x, y, el);
    }

    elements.forEach((element) => {
      const elementElement = element as HTMLElement;
      elementElement.onmousemove = function (e) {
        const xy = [e.clientX, e.clientY];
        window.requestAnimationFrame(function () {
          transformElement(elementElement, xy);
        });
      };

      elementElement.onmouseout = function () {
        elementElement.style.transform = "translate(0,0)";
      };
    });
  });
</script>

<div
  class="element transform-style-3d transition-all duration-100 bg-slate-800 m-4 rounded-md first-letter:capitalize border-4 border-slate-700 shadow-md"
>
  <h1 class="text-3xl font-bold">{name}</h1>
  <h2>Location: {location}</h2>
  <h2 class="capitalize">Tags: {tags.join(", ")}</h2>
</div>
