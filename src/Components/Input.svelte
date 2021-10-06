<script>
    import {afterUpdate, createEventDispatcher, onMount} from 'svelte';
    import clsx from 'clsx';

    import {isRequired, scanValue} from '../lib/helpers';

    // Declare variables.
    export let field = {};
    const defaultAttributes = {
        type: 'text',
        id: '',
        classes: 'bg-white py-10px px-5px md:px-15px',
        min: null,
        max: null,
        step: null,
        autocomplete: 'off',
        placeholder: '',
        disabled: false,
        readonly: false,
        div_class: "bg-light-grey m-auto md:py-4 md:px-8",
        background_class: "bg-white",
        range_output: "flex m-auto"
    };
    const fieldAttributes = field.attributes ? field.attributes : {};
    field.attributes = {...defaultAttributes, ...fieldAttributes};

    let classe = null;
    let defaulClasses = null;

    // Dispatch.
    const dispatch = createEventDispatcher();
    let output;
    let positioning
    // Change value field.
    function onChangerValue(event) {
        dispatch('changeValue', {
            name: field.name,
            value: scanValue(field.attributes.type, event.target.value),
        });

  output =  field.value;
    }

    // Lifecycle.
    afterUpdate(() => {
        field.value = field.value == undefined ? null : field.value;
    });
    let rangeslider;

</script>


{#if field.attributes.type == "range"}
    <div class="{field.attributes.background_class} flex" style="">
        <div class="rangeslider p-4 w-10/12 md:w-9/12 block">
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
                bind:this={rangeslider}
                style="background-size: {(parseInt(field.value) - parseInt(field.attributes.min)) * 100 / (parseInt(field.attributes.max) - parseInt(field.attributes.min)) + '% 100%'}  "/>
        <datalist id="tickmarks" class="text-black">
            <!-- Show different option values depending if the length is even or odd*/ -->
            {#if Array(parseInt(field.attributes.max) - parseInt(field.attributes.min) + parseInt(field.attributes.step)).length % 2}
                 <option class="option-{parseInt(field.attributes.min)}"
                        value="{parseInt(field.attributes.min)}"
                        label="{parseInt(field.attributes.min)}"></option>
                <option class="option-{(parseInt(field.attributes.max)+parseInt(field.attributes.min))/2}"
                        value="{(parseInt(field.attributes.max)+parseInt(field.attributes.min))/2}"
                        label="{(parseInt(field.attributes.max)+parseInt(field.attributes.min))/2}"></option>
                <option class="option-{parseInt(field.attributes.max)}"
                        value="{parseInt(field.attributes.max)}"
                        label="{parseInt(field.attributes.max)}"></option>
            {:else }
                 <option class="option-{parseInt(field.attributes.min)}"
                        value="{parseInt(field.attributes.min)}"
                        label="{parseInt(field.attributes.min)}"></option>
                <option class="option-{parseInt(field.attributes.max)}"
                        value="{parseInt(field.attributes.max)}"
                        label="{parseInt(field.attributes.max)}"></option>
            {/if}
        </datalist>

    </div>
        <p class="{field.attributes.range_output}">{field.value}</p>
    </div>
    {:else if field.attributes.type === 'checkbox'}
     <div class="{defaultAttributes.classes}">
      <div
    class="customised-checkbox">
     <label class="checkbox">
  <span class="checkbox__input">
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
     <span class="checkbox__control">
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
        <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
    </span>
  </span>
    <label class="p-none" for="{field.attributes.id}">{field.name}</label>
       </label>
  </div>
     </div>
{:else if field.attributes.type !== "hidden"}
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
        background-image: linear-gradient(#5AB4F280, #00FFE080) !important;
        -webkit-appearance: none;
    }

    :global(.feedback-form input[type=range]:focus) {
        -webkit-appearance: none;
        background-color: #C4C4C480 !important;
    }

    input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 25px;
        background: #C4C4C480;
        border-radius: 20px;
        background-image: linear-gradient(#5AB4F280, #00FFE080);
        background-repeat: no-repeat;
    }

    /* Input Thumb */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: black;
        cursor: ew-resize;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        transition: background .3s ease-in-out;
    }

    input[type="range"]::-moz-range-thumb {
        -webkit-appearance: none;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: #000000;
        cursor: ew-resize;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        transition: background .3s ease-in-out;
    }

    input[type="range"]::-ms-thumb {
        -webkit-appearance: none;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: #000000;
        cursor: ew-resize;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
    input[type=range]::-webkit-slider-runnable-track {
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
    /*Styling single checkbox */
.customised-checkbox .checkbox {
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 0.5em;
    font-size: 2rem;
    color: black;
    padding-bottom: 0;
  }
  .customised-checkbox .checkbox__control {
    display: inline-grid;
    width: 1em;
    height: 1em;
    border: 1px solid #4a5568;
  }
  .customised-checkbox .checkbox__control svg {
    transition: transform 0.1s ease-in 25ms;
    transform: scale(0);
    transform-origin: bottom left;
    color: black;
  }
  .customised-checkbox .checkbox__input {
    display: grid;
    grid-template-areas: "checkbox";
  }
  :global(.p-none) {
      padding-bottom: 0px!important;
  }
  .customised-checkbox .checkbox__input > * {
    grid-area: checkbox;
  }
  .customised-checkbox .checkbox__input input {
    opacity: 0;
    width: 1em;
    height: 1em;
  }
  .customised-checkbox .checkbox__input input:checked + .checkbox__control svg {
    transform: scale(1);
  }

</style>