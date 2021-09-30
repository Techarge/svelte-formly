<script>
    import {afterUpdate, createEventDispatcher} from 'svelte';
    import clsx from 'clsx';

    import {scanValue} from '../lib/helpers';

    // Declare variables.
    export let field = {};
    const defaultAttributes = {
        id: '',
        classes: 'bg-black',
        disabled: false,
        readonly: false,
        description: '',
        div_class: 'bg-darkgrey container',
        label_class: 'font-semibold py-12px text-black',
    };
    const fieldAttributes = field.attributes ? field.attributes : {};
    field.attributes = {...defaultAttributes, ...fieldAttributes};
    field.description = ''; // don't update description as the header should just take the value of the field
    let classes = null;
    let defaultClasses = null;

    // Dispatch
    const dispatch = createEventDispatcher();

    // Lifecycle.
    afterUpdate(() => {
        field.value = field.value == undefined ? null : field.value;
    });
</script>

<div
        disabled={field.attributes.disabled}
        readonly={field.attributes.readonly}
        name={field.name}
        id={field.attributes.id}
        class={clsx(field.attributes.classes)}
>
    {#if field.value}
        {field.value}
    {/if}
</div>
