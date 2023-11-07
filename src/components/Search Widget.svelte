<script>
  import Fuse from "fuse.js";
  import data from "../data/data.json";
  import Item from "./Item.svelte";
  let searchTerm = "";

  const fuse = new Fuse(data, {
    includeScore: true,
    threshold: 0.4,
    keys: [
      {
        name: "name",
        weight: 1,
      },
      {
        name: "tags",
        weight: 0.8,
      },
      {
        name: "location",
        weight: 0.7,
      },
    ],
  });

  $: results = fuse.search(searchTerm);
</script>

<form
  class="border-slate-600
  bg-slate-800
  border-4
  text-center
  min-w-max
  max-w-3xl
  m-auto
  rounded-lg"
>
  <label for="search" class="font-bold">Search</label>
  <input
    bind:value={searchTerm}
    type="search"
    required
    name="search"
    id="search"
    placeholder="Enter a search term..."
    autocomplete="off"
    class="bg-slate-700 w-full h-10"
  />
</form>

<div id="itemContainer" class="bg-slate-500 rounded-xl p-0.5 my-5 shadow-inner">
  {#each results as r}
    <Item name={r.item.name} location={r.item.location} tags={r.item.tags} />
  {/each}
</div>
