<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';
    import StarIcon from "./StarIcon.svelte";

    // Declar variables.
    export let field = {};
    let rating = 0;
    let hoverRating = 0;
    const star_map = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

    const handleHover = (id) => () => {
        hoverRating = id;
    }
    const handleRate = (id) => (event) => {
        if (rating && rating.toString() === event.srcElement.dataset.starid) {
            return
        }
        rating = id;
        dispatch('changeValue', {
            name: field.name,
            value: id,
        });
    }

    const defaultAttributes = {
        classes: '',
    };
    let classe = null;
    let defaulClasses = null;
    let stars = getStars(field);

    function getStars(field) {
        let list = [];
        if (field.stars) {
            for (let i = 0; i < field.stars; i++) {
                let suffix = "Star";
                if (i > 1)
                    suffix = "Stars";
                list[i] = {id: i + 1, title: `${star_map[i + 1]} ${suffix}`};
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
            value: rating,
        });
    }

    // Insert default value.
    onMount(() => {
        if (stars.length > 0) {
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

<div class="bg-white px-4 py-12">
    <span class="grid grid-flow-col grid-cols-{stars.length} justify-around content-center items-center gap-4">
    {#each stars as star(star.id)}
        <StarIcon
                filled={hoverRating ? (hoverRating >= star.id) : (rating >= star.id)}
                starId={star.id}
                name={field.name}
                value={star.id}
                on:mouseover={handleHover(star.id)}
                on:mouseleave={() => hoverRating = null}
                on:click={handleRate(star.id)}
        />
    {/each}
    </span>
</div>

<style>
</style>


