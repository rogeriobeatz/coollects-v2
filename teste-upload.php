<form >
  <input accept="image/*" type='file' id="imgInp" />
  <img id="blah" src="#" alt="your image" />
</form>
<script>
    imgInp.onchange = evt => {
  const [file] = imgInp.files
  if (file) {
    blah.src = URL.createObjectURL(file)
  }
}
</script>