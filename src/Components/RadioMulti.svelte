<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';
    import {isRequired} from "../lib/helpers";

    // Declare variables.
    export let field = {};
    const defaultAttributes = {
        classes: 'bg-white p-4',
            div_class:"bg-light-grey m-auto md:py-4 md:px-8",
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
                value: null,
                onmount: true,  // prevent this control as registering as touched by a user
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
    <div class="grid grid-flow-row gap-4 grid-cols-{items.length+1} grid-rows-{topics.length+1} justify-items-center bg-white text-black items-end py-4">
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
                    <label class="radio radio-before" for="{topic.id}-{item.id}">
                         <span class="radio__input">
                    <input
                            type="radio"
                            class="{defaultAttributes.classes} ml-0 "
                            id={topic.id}-{item.id}
                            name={topic.id}
                            value={item.value}
                            required={isRequired(field)}
                            checked={topic.value === field.value}
                            on:input={onChangeValue}
                    /><span class="radio__control"></span>
                         </span>
                    <label for={topic.id}-{item.id} class="hidden">{item.title}</label>
                    </label>
                </div>
            {/each}
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

