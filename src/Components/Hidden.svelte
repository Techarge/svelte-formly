<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';

    import {isRequired, scanValue} from '../lib/helpers';

    // Declare variables.
    export let field = {};
    const defaultAttributes = {
        type: 'text',
        id: '',
        classes: 'hidden',
        min: null,
        max: null,
        step: null,
        autocomplete: 'off',
        placeholder: '',
        disabled: false,
        readonly: false,
        div_class: "hidden",
    };
    const fieldAttributes = field.attributes ? field.attributes : {};
    field.attributes = {...defaultAttributes, ...fieldAttributes};

    let classe = null;
    let defaulClasses = null;

    // Dispatch.
    const dispatch = createEventDispatcher();

    // Change value field.
    function onChangerValue(event) {
        dispatch('changeValue', {
            name: field.name,
            value: scanValue(field.attributes.type, event.target.value, event),
        });
    }

    // Lifecycle.
    afterUpdate(() => {
        field.value = field.value == undefined ? null : field.value;
    });
    let rangeslider;

</script>

{#if field.attributes.type == "hidden"}
    <input
            type={field.attributes.type}
            name={field.name}
            value={field.value}
            id={field.attributes.id}
            class={defaultAttributes.classes}
            placeholder={field.attributes.placeholder}
            required={isRequired(field)}
            disabled={field.attributes.disabled}
            readonly={field.attributes.readonly}
            min={field.attributes.min}
            max={field.attributes.max}
            step={field.attributes.step}
            autocomplete={field.attributes.autocomplete}
            on:input={onChangerValue}
    />
{/if}