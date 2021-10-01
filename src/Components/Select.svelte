<script>
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import clsx from 'clsx';

  import { isRequired } from '../lib/helpers';

  // Declar variables.
  export let field = {};
  const defaultAttributes = {
    id: '',
    classes: 'bg-white py-10px',
    disabled: false,
        div_class:"bg-light-grey md:container md:py-4 md:px-8",
  };
  const fieldAttributes = field.attributes ? field.attributes : {};
  field.attributes = { ...defaultAttributes, ...fieldAttributes };

    let classe = null;
  let defaulClasses = null;

  // Dispatch.
  const dispatch = createEventDispatcher();

  // Change value.
  function onChangeValue(event) {
    dispatch('changeValue', {
      name: field.name,
      value: event.target.value,
    });
  }

  // Lifecycle.
  afterUpdate(() => {
    field.value = field.value == undefined ? null : field.value;
    classe = clsx(field.attributes.classes, defaulClasses);
  });
</script>

<select
  name={field.name}
  value={field.value}
  id={field.attributes.id}
  class={defaultAttributes.classes}
  required={isRequired(field)}
  disabled={field.attributes.disabled}
  on:input={onChangeValue}
>
  {#if field.extra}
    {#if field.extra.options}
      {#each field.extra.options as option}
        <option value={option.value} selected={option.value === field.value}
          >{option.title}</option
        >
      {/each}
    {/if}
  {/if}
</select>
