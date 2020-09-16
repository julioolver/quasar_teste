<template>
  <div>
    <q-table
      title="usuários"
      :data="usuarios"
      :columns="columns"
      row-key="name"
      selection="single"
      :selected.sync="selected"
      no-data-label="Nenhum dado disponível"
      rows-per-page-label="Linhas por página"
      :rows-per-page-options="[5,10,20,25,50]"
      :pagination-label="paginationLabel"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgSrc: '',
      cropImg: '',
      modalCrop: false
    }
  },
  mounted () {
    this.$store.dispatch('blog/edit', this.$route.params.id)
  },
  components: {
  }
}
</script>
