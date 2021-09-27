<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
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
        div_class: "bg-light-grey container py-10px",
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
    var rangeslider;
    function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  }
  const min = target.min
  const max = target.max
  const val = target.value

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
	onMount(async () => {
  rangeslider.addEventListener('input', handleInputChange)
	});

</script>


{#if field.attributes.type == "range"}
    <div class="bg-white">
        <div class="rangeslider p-4">
        <input
                type={field.attributes.type}
                name={field.name}
                value={field.value}
                id={field.attributes.id}
                class={"slider"}
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
        bind:this={rangeslider}/>
        <datalist id="tickmarks" class="text-black">
            {#each Array(parseInt(field.attributes.max) - parseInt(field.attributes.min) + parseInt(field.attributes.step)) as _, i}
                <option value="{(i*parseInt(field.attributes.step))+parseInt(field.attributes.min)}"
                        label="{(i*parseInt(field.attributes.step))+parseInt(field.attributes.min)}"></option>
            {/each}
        </datalist>
    </div>
    </div>
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
        width: 100%;
    }
    :global(.feedback-form input[type=range]:hover) {
          background-image: linear-gradient(#5AB4F280, #00FFE080)!important;
        -webkit-appearance: none;
    }

    :global(.feedback-form input[type=range]:focus) {
        -webkit-appearance: none;
        background-color: #C4C4C480!important;
    }
    input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #C4C4C480;
  border-radius: 20px;
  background-image: linear-gradient(#5AB4F280, #00FFE080);
  background-size: 50% 100%;
  background-repeat: no-repeat;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #000000;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #000000;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #000000;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
    background: #000000;
}

input[type="range"]::-moz-range-thumb:hover {
    background: #000000;
}

input[type="range"]::-ms-thumb:hover {
  background: #000000;
}

/* Input Track */
input[type=range]::-webkit-slider-runnable-track  {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type=range]::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

</style>