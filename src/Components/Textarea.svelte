<script>
  import { afterUpdate, createEventDispatcher } from 'svelte';
  import clsx from 'clsx';

  import { isRequired } from '../lib/helpers';

  // Declar variables.
  export let field = {};
  const defaultAttributes = {
    id: '',
    classes: 'bg-white p-4',
    min: null,
    max: null,
    step: null,
    autocomplete: 'off',
    placeholder: '',
    required: false,
    disabled: false,
    readonly: false,
      div_class:"bg-light-grey container py-10px",
  };
  const fieldAttributes = field.attributes ? field.attributes : {};
  field.attributes = { ...defaultAttributes, ...fieldAttributes };

    let classe = null;
  let defaulClasses = null;

  // Dispatch.
  const dispatch = createEventDispatcher();

  // Change value.
  function onChangerValue(event) {
    dispatch('changeValue', {
      name: field.name,
      value: event.target.value,
    });
  }

  // Insert default value.
  afterUpdate(() => {
    field.value = field.value == undefined ? null : field.value;
    classe = clsx(field.attributes.classes, defaulClasses);
  });
</script>

<textarea
  name={field.name}
  class={defaultAttributes.classes}
  value={field.value}
  placeholder={field.attributes.placeholder}
  required={isRequired(field)}
  disabled={field.attributes.disabled}
  readonly={field.attributes.readonly}
  rows={field.attributes.rows}
  cols={field.attributes.cols}
  on:input={onChangerValue}
/>
