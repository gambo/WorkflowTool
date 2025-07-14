<script>
let { value=$bindable({}) } = $props()
</script>

<fieldset>
    <legend>Two Form</legend>
    <label for="description">Description</label>
    <input name="description" type="text" bind:value={value.description} />
    <label for="val">Value</label>
    <input name="val" type="number" bind:value={value.val} />
</fieldset>