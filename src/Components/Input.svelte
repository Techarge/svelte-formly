<script>
    import {afterUpdate, createEventDispatcher} from 'svelte';
    import clsx from 'clsx';

    import {isRequired, scanValue} from '../lib/helpers';

    // Declar variables.
    export let field = {};
    const defaultAttributes = {
        type: 'text',
        id: '',
        classes: 'bg-white',
        min: null,
        max: null,
        step: null,
        autocomplete: 'off',
        placeholder: '',
        disabled: false,
        readonly: false,
         div_class:"bg-light-grey container pt-30px",
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
            value: scanValue(field.attributes.type, event.target.value),
        });
    }

    // Lifecycle.
    afterUpdate(() => {
        field.value = field.value == undefined ? null : field.value;
    });
</script>


{#if field.attributes.type == "range"}
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
            list="tickmarks"
            on:input={onChangerValue}
    />
    <datalist id="tickmarks" class="text-black-500">
        {#each Array(parseInt(field.attributes.max) - parseInt(field.attributes.min) + parseInt(field.attributes.step)) as _, i}
            <option value="{(i*parseInt(field.attributes.step))+parseInt(field.attributes.min)}"
                    label="{(i*parseInt(field.attributes.step))+parseInt(field.attributes.min)}"></option>
        {/each}
    </datalist>
{:else}
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

<style>
    datalist {
        display: flex;
        justify-content: space-between;
        color: grey;
        width: 100%;
    }
</style>