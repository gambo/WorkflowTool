<script>
let { value=$bindable({}) } = $props()
</script>

<fieldset>
    <legend>One Form</legend>
    <label for="name">Name</label>
    <input name="name" type="text" bind:value={value.name} />
    <label for="age">age</label>
    <input name="age" type="number" bind:value={value.age} />
</fieldset>