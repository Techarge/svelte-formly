<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';
    import {isRequired} from "../lib/helpers";

    // Declar variables.
    export let field = {};
    const defaultAttributes = {
        classes: '',
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

    export let topics = getTopics(field);

    let topic_answers = {};

    function getTopics(field) {
        let list = [];
        if (field.extra.topics) {
            if (field.extra.topics) {
                list = field.extra.topics;
            }
        }
        return list;
    }

    // Dispatch.
    const dispatch = createEventDispatcher();

    // Change value.
    function onChangeValue(event) {
        topic_answers[event.target.name] = event.target.value;
        dispatch('changeValue', {
            name: field.name,
            value: topic_answers,
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


{#if topics.length == 0}
    Missing topics in this question!
{:else}
    <div class="grid grid-flow-row gap-4 grid-cols-{items.length+1} grid-rows-{topics.length+1} justify-items-center">
        {#if field.error}
            <div class="grid grid-flow-row grid-cols-1">
                <div class="italic text-red-400">{field.error}</div>
            </div>
        {:else}
            <div></div>
        {/if}
        {#each items as item, i}
            <div>
                {item.title}
            </div>
        {/each}
        {#each topics as topic, t}
            <div>
                {topic.title}
            </div>
            {#each items as item, i}
                <div
                        id={topic.id}
                        class="{field.extra.aligne === 'inline'
      ? 'form-check form-check-inline'
      : 'form-check'}"
                >
                    <input
                            type="radio"
                            class="{classe} ml-0 "
                            id={topic.id}-{item.id}
                            name={topic.id}
                            value={item.value}
                            required={isRequired(field)}
                            checked={topic.value === field.value}
                            on:input={onChangeValue}
                    />
                    <label for={topic.id}-{item.id} class="ml-0 mr-5">{item.title}</label>
                </div>
            {/each}
        {/each}
    </div>
{/if}

