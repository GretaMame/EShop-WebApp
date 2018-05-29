<template>
  <el-card class="main-card">
    <h4 class="title-text">Pictures</h4>
    <admin-picture-upload-dialog
      v-if="uploadPictureDialogVisible"
      v-on:close="uploadPictureDialogVisible = false"
      v-on:picture-selected="addSelectedPicture"/>
    <div>
      <img v-if="pictures.length == 0" src="@/../static/image-not-found.jpg" class="main-image">
      <img v-else :src="pictures[selectedPictureIndex].url" class="main-image">
    </div>
    <span v-if="pictures.length >= 5" class="warning-text">Maximum number of pictures allowed has been reached</span>
    <div height="20%" width="100%">
      <el-row :gutter="25">
        <el-col v-for="(picture, index) in pictures" :key="picture.url" :span="5" v-bind:class="{'el-card-selected': index === selectedPictureIndex}">
          <div @click="changeSelectedPicture(index)">
            <el-card :body-style="{'padding': '0px'}">
              <img :src="picture.url" class="mini-image">
              <i class="el-icon-close delete-button" @click="deletePicture(picture)"></i>
            </el-card>
          </div>
        </el-col>
        <el-col v-if="pictures.length < 5" :span="5">
          <el-card :body-style="{'padding': '0px', 'align-items': 'center'}">
            <div @click="uploadPictureDialogVisible = true">
              <i class="el-icon-plus add-image"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import AdminPictureUploadDialog from '@/components/admin/AdminPictureUploadDialog'
export default {
  components: {
    AdminPictureUploadDialog
  },
  props: {
    itemId: {type: Number}
  },
  data () {
    return {
      pictures: [],
      selectedPictureIndex: 0,
      uploadPictureDialogVisible: false
    }
  },
  watch: {
    pictures: {
      handler () {
        this.$emit('pictures-changed', this.pictures)
      },
      deep: true
    }
  },
  mounted () {
    if (this.itemId) {
      // implement load on item id
    }
  },
  methods: {
    reset () {
      this.pictures = []
      this.selectedPictureIndex = 0
    },
    changeSelectedPicture (index) {
      this.selectedPictureIndex = index
    },
    addSelectedPicture (picture) {
      this.pictures.push(picture)
      this.uploadPictureDialogVisible = false
    },
    deletePicture (picture) {
      this.$confirm(`Are you sure you want to create this picture?`,
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'Warning'
      }).then(() => {
        let index = this.pictures.indexOf(picture)
        if (index >= 0) {
          this.pictures.splice(index, 1)
        }
      })
    }
  }
}
</script>
<style scoped>
.el-col-5{
  width: 20%;
}
.el-card-selected *{
  border-color: red;
}
.main-card{
  overflow-y: auto;
  margin: 8px;
  height: 100%;
}
.title-text{
  margin: 0 0 8px 0;
}
.main-image{
  max-height: 200px;
  min-height: 100px;
}
.mini-image{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  padding: auto;
  max-height: 50px;
  max-width: 50px;
}
.selected-image{
  border-color: red;
  border-width: 1px;
}
.add-image{
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  width: 50px;
}
.delete-button{
  position: absolute;
  color: red;
}
  .delete-button:hover{
    background-color: rgba(0,0,0,0.1);
  }
  .warning-text{
    color: orange;
  }
</style>
