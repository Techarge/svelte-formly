<script>
    import {onMount} from 'svelte';
    import {validate} from '../Validation/index';
    import {valuesForm} from '../lib/stores.js';
    import {isRequired, preprocessField} from '../lib/helpers.js';

    // Import components.
    import Tag from './Tag.svelte';
    import Input from './Input.svelte';
    import Textarea from './Textarea.svelte';
    import Select from './Select.svelte';
    import AutoComplete from './AutoComplete.svelte';
    import Radio from './Radio.svelte';
    import Checkbox from './Checkbox.svelte';
    import File from './File.svelte';
    import Message from './Message.svelte';
    import Header from "./Header.svelte";
    import RadioMulti from "./RadioMulti.svelte";
    import Footer from "./Footer.svelte";
    import Star from "./Star.svelte";
    import SectionHeader from "./SectionHeader.svelte";
    import Hidden from "./Hidden.svelte";

    // Declare variables;
    export let fields = [];
    let isValidForm = true;
    let values = {};
    let itemsField = [];
    $: listFields = itemsField;

    // Change values.
    const changeValueHander = async (event) => {
        values = {
            ...values,
            [event.detail.name]: event.detail.value,
        };

        let mylist = await Promise.all(
            listFields.map(async (field) => {
                if (field.name === event.detail.name) {
                    field.value = event.detail.value;
                    if (event.detail.onmount !== true) {
                        field.touched = true;
                    }
                }
                if (field.preprocess) {
                    const fnc = field.preprocess;
                    field = await preprocessField(field, listFields, values);
                    values[`${field.name}`] = field.value;
                }
                field = await validate(field);
                return field;
            })
        );
        const dirty = mylist.find((item) => {
            if (item.validation) {
                return item.validation.dirty === true;
            }
        });
        // const alltouched = mylist.find((item) => item.touched === false)
        // if (alltouched === undefined) {
        //     isValidForm = dirty ? false : true;
        //     valuesForm.set({values, valid: isValidForm});
        // } else {
        //     valuesForm.set({values, valid: valuesForm["valid"]});
        // }
        isValidForm = dirty ? false : true;
        valuesForm.set({values, valid: isValidForm});
        itemsField = mylist;
    };

    // Lifecycle.
    onMount(async () => {
        const mylist = await Promise.all(
            fields.map(async (field) => {
                values = {...values, [field.name]: field.value};
                if (field.preprocess) {
                    const fnc = field.preprocess;
                    field = await preprocessField(field, fields, values);
                }
                if (field.touched === undefined) {
                    field.touched = false;  // default: don't display error message initially
                }
                //field = await validate(field);  // should not validate onload ...
                values[`${field.name}`] = field.value;
                return field;
            })
        );
        const dirty = mylist.find((item) => {
            if (item.validation) {
                return item.validation.dirty === true;
            }
        });
        isValidForm = dirty ? false : true;
        valuesForm.set({values, valid: isValidForm});
        itemsField = mylist;
    });
</script>

{#each listFields as field (field.attributes.id)}
    {#if field.attributes.type === 'hidden'}
        <Hidden {field}/>
    {:else }

        <Tag
                tag={field.prefix ? (field.prefix.tag ? field.prefix.tag : 'div') : 'div'}
                classes={field.attributes.div_class ? field.attributes.div_class : "bg-light-grey m-auto md:py-4 md:px-8 "   }
        >
            <!-- Label -->
            {#if field.attributes}
                {#if field.attributes.label}
                    <label for={field.id}
                           class={field.attributes.label_class ? field.attributes.label_class : "label"}>{field.attributes.label}
                        {#if isRequired(field)}*{/if}
                    </label>
                {/if}
            {/if}
            <!-- Field -->

            {#if field.type === 'input'}
                <Input {field} on:changeValue={changeValueHander}/>
            {:else if field.type === 'textarea'}
                <Textarea {field} on:changeValue={changeValueHander}/>
            {:else if field.type === 'select'}
                <Select {field} on:changeValue={changeValueHander}/>
            {:else if field.type === 'autocomplete'}
                <AutoComplete
                        {field}
                        on:changeValue={changeValueHander}
                        on:onSelectItem
                />
            {:else if field.type === 'radio'}
                <Radio {field} on:changeValue={changeValueHander}/>
            {:else if field.type === 'radio-multi'}
                <RadioMulti {field} on:changeValue={changeValueHander}/>
            {:else if field.type == 'checkbox'}
                <Checkbox {field} on:changeValue={changeValueHander}/>
            {:else if field.type === 'file'}
                <File {field} on:changeValue={changeValueHander}/>
            {:else if field.type === 'header'}
                <Header {field}/>
            {:else if field.type === 'sectionheader'}
                <SectionHeader {field}/>
            {:else if field.type === 'star'}
                <Star {field} on:changeValue={changeValueHander}/>
            {:else if field.type === 'footer'}
                <Footer {field}/>
            {/if}

            <!-- Description -->
            {#if field.description}
                {#if field.description.text}
                    <Tag
                            tag={field.description.tag}
                            classes={field.description.classes ? field.description.classes : ''}
                    >
                        {field.description.text} {#if isRequired(field)}*{/if}
                    </Tag>
                {/if}
            {/if}

            <!-- Error messages -->
            {#if (!isValidForm && field.touched) && field.validation.errors.length > 0}
                {#each field.validation.errors as error}
                    <Message {error} messages={field.messages ? field.messages : []}/>
                {/each}
            {/if}
        </Tag>
    {/if}
{/each}
