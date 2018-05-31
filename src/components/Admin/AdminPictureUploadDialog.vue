<template>
  <el-dialog title="Upload picture"
    :visible="true"
    :before-close="close">
    <el-row>
      <el-col :span="12">
        <span>URL: </span>
        <el-input placeholder="URL" v-model="photoURL" @input="pictureUrlChanged" size="small"></el-input>
      </el-col>
      <el-col :span="12">
        <span>Upload: </span>
        <el-upload
          action=""
          :before-upload="pictureUploadChanged">
          <el-button size="small" type="primary" class="upload-button">Click to upload</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png/bmp files with a size less than 5MB</div>
        </el-upload>
      </el-col>
    </el-row>
    <div class="preview-slot">
      <img class="preview-image" :src="picture" v-if="picture"/>
      <span class="preview-text" v-else>Picture preview</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">Cancel</el-button>
      <el-button :disabled="!picture" type="primary" @click="uploadPicture">Confirm</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default{
  data () {
    return {
      photoURL: '',
      picture: null,
      currentFile: null,
      allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/bmp'
      ]
    }
  },
  methods: {
    pictureUrlChanged () {
      this.picture = this.photoURL
      this.currentFile = null
    },
    pictureUploadChanged (file) {
      const isGoodType = this.allowedTypes.indexOf(file.type) >= 0
      const isSmallerThan5MB = file.size / 1024 / 1024 < 5

      if (!isGoodType) {
        this.$message.error('Picture must be JPG, BMP or PNG format!')
      }
      if (!isSmallerThan5MB) {
        this.$message.error('Picture size can not exceed 5MB!')
      }
      if (!isGoodType || !isSmallerThan5MB) {
        return false
      }

      this.picture = URL.createObjectURL(file)
      this.currentFile = file

      return false
    },
    uploadPicture () {
      this.$emit('picture-selected', {url: this.picture, file: this.currentFile, isFile: !!this.currentFile})
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style>
.upload-button{
  margin-right: 8px;
}
.preview-slot{
  margin: 16px;
  height: 150px;
  align-items: center;
}
.preview-image{
  max-height: 150px;
  min-height: 100px;
}
.preview-text{
  text-align: center;
  vertical-align: center;
  line-height: 200px;
  font-size: 18px;
}
</style>
