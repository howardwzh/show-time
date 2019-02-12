<template>
  <div class="m-table-for-array">
    <el-button v-if="!firstTable && foldName && tableData.length" class="table-box-btn-show" type="info" @click="togglerPopShow">查看 {{ tableData.length }} 个{{ foldName }}</el-button>
    <span v-if="!firstTable && foldName && !tableData.length">{{ tableData.length }} 个{{ foldName }}</span>
    <div v-if="firstTable || !foldName || isPopShow" :class="{'m-table-for-array-pop-show': isPopShow}">
      <el-button v-if="!firstTable && foldName" size="mini" class="table-box-btn-hide" @click="togglerPopShow">关闭</el-button>
      <div class="table-box">
        <el-table
          :data="tableData"
          :show-header="showHeader"
          :span-method="spanMethod"
          :show-summary="showSummary"
          border
          fit
          highlight-current-row
        >
          <el-table-column v-if="hasIndex && tableData.length" :index="offsetIndex" label="序号" type="index" width="50" align="center"/>
          <el-table-column v-for="(value, index) in getRealDictionary(tableData[tableData.length - 1], dictionary)" :key="index" :label="getTableLabel(value)" :width="getTableKey(value) === 'tableLabel' ? '300' : ''" align="center">
            <template slot-scope="scope">
              <MShowTableData v-if="/array|object/.test(getType(scope.row[getTableKey(value)]))" :data.sync="scope.row[getTableKey(value)]" :dictionary="dictionary" :fold-name="foldName" />
              <a v-else-if="checkIsPicture(scope.row[getTableKey(value)])" :href="scope.row[getTableKey(value)]" class="photo" target="_blank">
                <img :src="scope.row[getTableKey(value)]" alt="" >
              </a>
              <span v-else v-html="getTableDesc(value, scope.row[getTableKey(value)])"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getRealDictionary, getType, objectToArrayForTable, getTableLabel, getTableDesc, getTableKey, checkIsPicture } from '../../assets/utils/common'

export default {
  name: 'MShowTableData',
  components: {
  },
  filters: {},
  props: {
    foldName: {
      type: String,
      default: ''
    },
    dictionary: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array | Object,
      default: () => []
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    offsetIndex: {
      type: Number,
      default: 1
    },
    firstTable: {
      type: Boolean,
      default: false
    },
    spanMethod: {
      type: Function,
      default: () => {}
    },
    showSummary: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      getRealDictionary,
      getType,
      getTableLabel,
      getTableDesc,
      getTableKey,
      checkIsPicture,
      isPopShow: false
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          this.initData()
        }
      },
      deep: true
    }
  },
  created() {
    this.initData()
  },
  methods: {
    togglerPopShow() {
      this.isPopShow = !this.isPopShow
    },
    initData() {
      if (!this.data) return
      this.tableData = objectToArrayForTable(this.data, this.dictionary) || []
    }
  }
}
</script>
<style lang="less">
.m-table-for-array {
  .table-box-btn-show {
    padding: 10px;
    white-space: normal;
    line-height: 20px;
  }
  .table-label {
    width: 100px;
  }
  .photo {
    img {
      height: 160px;
      max-width: 100%;
    }
    b {
      display: block;
      text-align: center;
    }
  }
  &-pop-show {
    background-color: rgba(0, 0, 0, .6);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100000;
    overflow: hidden;
    display: flex;
    align-items: center;
    .table-box {
      width: 90%;
      margin: 0 auto;
      max-height: 90%;
      overflow: auto;
    }
    .table-box-btn-hide {
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
