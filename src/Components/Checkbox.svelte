<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';

  // Declar variables.
  export let field = {};
  let values = [];
  const defaultAttributes = {
    class: 'bg-white py-10px px-5px md:px-15px customised-checkbox grid gap-4',
        div_class:"bg-light-grey m-auto md:py-4 md:px-8",
  };
  let classe = null;
  let defaulClasses = null;

    // Dispatch.
    const dispatch = createEventDispatcher();

    // Change value.
    function onChangeValue(event) {
        if (values.length > 0) {
            values.map((item, index) => {
                if (item.name === event.target.name) {
                    values[index].checked = event.target.checked;
                }
            });
            dispatch('changeValue', {
                name: field.name,
                value: values,
            });
        }
    }

    // Insert default
    onMount(() => {
        if (field.extra.items.length > 0) {
            field.extra.items.map((i) => {
                values = [
                    ...values,
                    {
                        name: i.name,
                        checked: i.checked ? i.checked : false,
                    },
                ];
            });
        }
    });

    // Lifecycle.
    afterUpdate(() => {
        classe = clsx(field.attributes.classes, defaulClasses);
        field.attributes = {...defaultAttributes, ...field.attributes};
    });
</script>
<div class="{field.attributes.class}">
{#each field.extra.items as item, i}
  <div
    class={field.extra.aligne === 'inline' ? 'form-check-inline ' : 'form-check '}
  >
     <label class="checkbox p-none">
  <span class="checkbox__input">
    <input
      type="checkbox"
      class={defaultAttributes.classes}
      value={item.checked ? item.checked : false}
      name={item.name}
      checked={item.checked ? item.checked : false}
      on:input={onChangeValue}
    />
     <span class="checkbox__control">
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
        <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
    </span>
  </span>
    <label class="p-none">{item.name}</label>
       </label>
  </div>
{/each}
  </div>
<style>

    .customised-checkbox .checkbox {
        display: grid;
        grid-template-columns: min-content auto;
        grid-gap: 0.5em;
        font-size: 2rem;
        color: black;
    }

    .customised-checkbox .checkbox__control {
        display: inline-grid;
        width: 1em;
        height: 1em;
        border: 1px solid #4a5568;
    }

    .customised-checkbox .checkbox__control svg {
        transition: transform 0.1s ease-in 25ms;
        transform: scale(0);
        transform-origin: bottom left;
        color: black;
    }

    .customised-checkbox .checkbox__input {
        display: grid;
        grid-template-areas: "checkbox";
    }

    .customised-checkbox .checkbox__input > * {
        grid-area: checkbox;
    }

    .customised-checkbox .checkbox__input input {
        opacity: 0;
        width: 1em;
        height: 1em;
    }

    .customised-checkbox .checkbox__input input:checked + .checkbox__control svg {
        transform: scale(1);
    }

</style>