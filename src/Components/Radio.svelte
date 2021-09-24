<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';
    import {isRequired} from "../lib/helpers";

    // Declar variables.
    export let field = {};
    const defaultAttributes = {
        classes: 'bg-white p-4',
            div_class:"bg-light-grey container pt-30px",
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
                value: items[0].value,
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
    <div>
        <div class="grid grid-flow-col auto-cols-max justify-around">
            {#each items as item, i}
                <div
                        class="{field.extra.aligne === 'inline'
      ? 'form-check form-check-inline'
      : 'form-check'}"
                >
                    <input
                            type="radio"
                            class="{defaultAttributes.classes} ml-0 "
                            id={item.id}
                            name={field.name}
                            value={item.value}
                            required={isRequired(field)}
                            checked={item.value === field.value}
                            on:input={onChangeValue}
                    />
                    <label for={item.id} class="ml-0 mr-5">{item.title}</label>
                </div>
            {/each}
        </div>
    </div>
{:else}
    {#each items as item, i}
        <div
                class={field.extra.aligne === 'inline'
      ? 'form-check form-check-inline'
      : 'form-check'}
        >
            <input
                    type="radio"
                    class={defaultAttributes.classes}
                    id={item.id}
                    name={field.name}
                    value={item.value}
                    checked={item.value === field.value}
                    on:input={onChangeValue}
            />
            <label for={item.id}>{item.title}</label>
        </div>
    {/each}
{/if}
