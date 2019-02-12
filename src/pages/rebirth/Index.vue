<template>
  <div class="page" id="Rebirth">
    <h2>每天进步一点点</h2>
    <m-show-table-data :data="tableData" :dictionary="dictionary" :hasIndex="false" :spanMethod="spanMethod"/>
  </div>
</template>

<script>
import MShowTableData from '../../components/MShowTableData'
const dictionary = [
  'p2pName=网贷名称',
  'amount=待还金额（2019.2.8起算) (元）',
  'repaid=已还金额（元）',
  'remainAmount=剩余待还（元）',
  'status=状态',
  '60000remain=卖车60000使用情况（元）',
]
const tableData = [{
  'p2pName': '微现金',
  'amount':'1006.3',
  'repaid':'1006.3 (用)',
  'remainAmount':'0',
  'status':'结清',
  '60000remain':'已用：10955.5<br/>剩余：49044.5',
},{
  'p2pName': '钱包借',
  'amount':'750 + 逾期费150',
  'repaid':'750 (用)',
  'remainAmount':'0',
  'status':'结清（私发客服）'
},{
  'p2pName': '贷上钱',
  'amount':'2686',
  'repaid':'2686 (用)',
  'remainAmount':'0',
  'status':'结清'
},{
  'p2pName': '我是校花',
  'amount':'2489',
  'repaid':'2489 (用)',
  'remainAmount':'0',
  'status':'结清'
},{
  'p2pName': '捷信',
  'amount':'7500',
  'repaid':'1328.2 (用)',
  'remainAmount':'5508 (一次付清)',
  'status':'共30期，已还24期，剩6期'
},{
  'p2pName': '平安普惠',
  'amount':'10038',
  'repaid':'1157 (用)',
  'remainAmount':'5500 (一次付清)<br/>7734 (每期1289，剩6期)',
  'status':'共<b>xx</b>期，已还<b>xx</b>期，剩6期'
},{
  'p2pName': '平安氧气贷',
  'amount':'6100',
  'repaid':'1539 (用)',
  'remainAmount':'4561',
  'status':'共<b>xx</b>期，已还<b>xx</b>期，剩<b>xx</b>期'
},{
  'p2pName': '车贷',
  'amount':'46000',
  'repaid':'0',
  'remainAmount':'46000',
  'status':'共40期，已还16期，剩24期'
},{
  'p2pName': '玖富万卡',
  'amount':'4300',
  'repaid':'487',
  'remainAmount':'5357 (每期487，剩11期)',
  'status':'共12期，已还1期，剩11期',
  '60000remain':'',
}]
export default {
  name: 'Rebirth',
  data () {
    return {
      tableData,
      dictionary
    }
  },
  components: {
    MShowTableData
  },
  methods: {
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
          return {
            rowspan: 100,
            colspan: 1
          };
        }
    }
  }
}
</script>

<style lang="less">
.page {
  padding: 20px;
  .el-table .cell b {
    color: #f00;
  }
}
</style>

