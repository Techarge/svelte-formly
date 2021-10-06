<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';
    import {isRequired} from "../lib/helpers";

    // Declar variables.
    export let field = {};
    const defaultAttributes = {
        classes: 'bg-white p-4',
        div_class: "bg-light-grey m-auto md:py-4 md:px-8",
        background_class: "bg-white",
    };
    let classe = null;
    let defaulClasses = null;
    export let items = getItems(field);

    function getItems(field) {
        let list = [];
        if (field.extra) {
            if (field.extra.items) {
                list = field.extra.items;
            }
        }
        return list;
    }

    // Dispatch.
    const dispatch = createEventDispatcher();

    // Change value.
    function onChangeValue(event) {
        dispatch('changeValue', {
            name: field.name,
            value: event.target.value,
        });
    }

    // Insert default value.
    onMount(() => {
        if (items.length > 0) {
            dispatch('changeValue', {
                name: field.name,
                value: null,
            });
        }
        if (field.attributes) {
            if (field.attributes.classes) {
                classe = field.attributes.classes;
            }
        }
    });

    // Lifecycle.
    afterUpdate(() => {
        field.value = field.value == undefined ? null : field.value;
        classe = clsx(classe, defaulClasses);
        field.attributes = {...defaultAttributes, ...field.attributes};
    });
</script>

{#if field.horizontal_layout }
    <div class="{field.attributes.background_class}">
        <div class="grid md:grid-flow-col auto-cols-max justify-around text-black p-4 gap-2 md:gap-0">
            {#each items as item, i}
                <div
                        class="{field.extra.aligne === 'inline'
      ? 'form-check form-check-inline'
      : 'form-check'}"
                >
                    <label class="radio radio-before p-none">
                         <span class="radio__input">
                    <input
                            type="radio"
                            class="{defaultAttributes.classes} ml-0 "
                            id={item.id}
                            name={field.name}
                            value={item.value}
                            required={isRequired(field)}
                            checked={item.value === field.value}
                            on:input={onChangeValue}
                    /><span class="radio__control"></span>
                         </span>
                    <label class="p-none" for={item.id}>{item.title}</label>
                    </label>
                </div>
            {/each}
        </div>
    </div>
{:else}
    <div class="{field.attributes.background_class} grid grid-cols-1 gap-4 py-10px">
    {#each items as item, i}
        <div
                class={field.extra.aligne === 'inline'
      ? 'form-check form-check-inline'
      : 'form-check'}
        >
            <label class="radio radio-before p-none" for="{item.id}">
                         <span class="radio__input">
                                <input
                                        type="radio"
                                        class={defaultAttributes.classes}
                                        id={item.id}
                                        name={field.name}
                                        value={item.value}
                                        checked={item.value === field.value}
                                        on:input={onChangeValue}
                                /><span class="radio__control"></span>
                         </span>
                    <label class="p-none" for={item.id}>{item.title}</label>
                    </label>
        </div>
    {/each}
    </div>
{/if}
<style>
    .radio {
        display: grid;
        grid-template-columns: min-content auto;
        grid-gap: 0.5em;
        font-size: 2.25rem;
        color: black;
    }

    .radio:focus-within .radio__label {
        transform: scale(1.05);
        opacity: 1;
    }

    .radio__label {
        line-height: 1;
        transition: 180ms all ease-in-out;
        opacity: 0.8;
    }

    .radio__input {
        display: flex;
    }

    .radio__input input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .radio-before .radio__control {
        display: grid;
        place-items: center;
    }

    .radio-before input + .radio__control::before {
        content: "";
        width: 0.5em;
        height: 0.5em;
        box-shadow: inset 0.5em 0.5em currentColor;
        border-radius: 50%;
        transition: 180ms transform ease-in-out;
        transform: scale(0);
    }

    .radio-before input:checked + .radio__control::before {
        transform: scale(1);
    }

    .radio__control {
        display: block;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        border: 0.1em solid currentColor;
        transform: translateY(-0.05em);
    }

</style>
