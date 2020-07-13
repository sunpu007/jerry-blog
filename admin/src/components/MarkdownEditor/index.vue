<template>
  <div>
    <div :id="id" />
    <el-upload ref="files" class="avatar-uploader" action="http://up-z2.qiniup.com" :data="uploadForm" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" />
  </div>
</template>

<script>
// deps for editor
import 'codemirror/lib/codemirror.css' // codemirror
import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content

import Editor from 'tui-editor'
import defaultOptions from './default-options'

import { uptoken, url } from '@/api/qiniu'
export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    mode: {
      type: String,
      default: 'markdown'
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    },
    language: {
      type: String,
      required: false,
      default: 'en_US' // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    }
  },
  data() {
    return {
      editor: null,
      uploadForm: {
        token: ''
      }
    }
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)
      options.initialEditType = this.mode
      options.height = this.height
      options.language = this.language
      return options
    }
  },
  watch: {
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue)
      }
    },
    language(val) {
      this.destroyEditor()
      this.initEditor()
    },
    height(newValue) {
      this.editor.height(newValue)
    },
    mode(newValue) {
      this.editor.changeMode(newValue)
    }
  },
  mounted() {
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions
      })
      if (this.value) {
        this.editor.setValue(this.value)
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getValue())
      })
      /**
       * 添加自定义按钮
       */
      // 获取编辑器上的功能条
      const toolbar = this.editor.getUI().getToolbar()
      const fileDom = this.$refs.files
      // 添加事件
      this.editor.eventManager.addEventType('uploadEvent')
      this.editor.eventManager.listen('uploadEvent', () => {
        // 模拟点击事件
        fileDom.$el.childNodes[0].childNodes[0].click()
      })
      // 插入图片按钮
      toolbar.insertItem(15, {
        type: 'button',
        options: {
          name: 'customize',
          // 自定义按钮的类名
          className: 'tui-image',
          // 对应上文的eventManager添加的监听事件类型，通过点击触发
          event: 'uploadEvent',
          // 鼠标hover自定义按钮的提示信息
          tooltip: 'insert image'
        }
      })
    },
    destroyEditor() {
      if (!this.editor) return
      this.editor.off('change')
      this.editor.remove()
    },
    setValue(value) {
      this.editor.setValue(value)
    },
    getValue() {
      return this.editor.getValue()
    },
    setHtml(value) {
      this.editor.setHtml(value)
    },
    getHtml() {
      return this.editor.getHtml()
    },
    async beforeAvatarUpload() {
      // 获取七牛token
      const { code, data } = await uptoken()
      if (code === 0) {
        this.uploadForm.token = data.token
      }
    },
    async handleAvatarSuccess(res, file) {
      // 上传成功，获取url
      const { code, data } = await url({ key: res.key })
      if (code === 0) {
        const editor = this.editor.getCodeMirror()
        const editorHtml = this.editor.getCurrentModeEditor()
        const isMarkdownMode = this.editor.isMarkdownMode()
        if (isMarkdownMode) {
          editor.replaceSelection(`![${file.name}](${data.url})`)
        } else {
          const range = editorHtml.getRange()
          const img = document.createElement('img')
          img.src = `${data.url}`
          img.alt = 'img'
          range.insertNode(img)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  display: none;
}
</style>
