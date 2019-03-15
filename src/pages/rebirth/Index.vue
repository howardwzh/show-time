<template>
  <div class="page" id="Rebirth">
    <h2>每天进步一点点</h2>
    <m-show-table-data :data="tableData" :dictionary="dictionary" :spanMethod="spanMethod"/>
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
  'totalRemainAmount=总计剩余待还（元）'
]
const tableData = [{
  'p2pName': '微现金',
  'amount':'1006.3',
  'repaid':'1006.3 (用)',
  'remainAmount':'0',
  'status':'结清',
  '60000remain':'已用: 60000<br/>剩余：0',
  'totalRemainAmount': '<b style="text-align:left">捷信: 1289 x 5 = 6445<br/>平安普惠: 1157 x 8 = 9256<br/>玖富万卡: 487 x 10 = 4870<br/><br/>总计: 20571<br/><br/><br/>每月还最大金额（前5月）: <br/> 1289 + 1157 + 487 = 2933</b>'
},{
  'p2pName': '钱包借',
  'amount':'750 + 逾期费150',
  'repaid':'750 (用)',
  'remainAmount':'0',
  'status':'结清（私发客服）',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '贷上钱',
  'amount':'2686',
  'repaid':'2686 (用)',
  'remainAmount':'0',
  'status':'结清',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '我是校花',
  'amount':'2489',
  'repaid':'2489 (用)',
  'remainAmount':'0',
  'status':'结清',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '平安信用卡',
  'amount':'1539',
  'repaid':'1539 (用)',
  'remainAmount':'0',
  'status':'结清',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '车贷',
  'amount':'43100',
  'repaid':'43100 (用)',
  'remainAmount':'0',
  'status':'结清',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '平安氧气贷',
  'amount':'6100',
  'repaid':'5944 (用) + 156 <b>(自付)</b>',
  'remainAmount':'0',
  'status':'结清',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '捷信',
  'amount':'7500',
  'repaid':'1328.2 (用)<br/>1298 (借)',
  'remainAmount':'<b>6445 (每期1289，剩5期)</b><br/>还款日：每月28号',
  'status':'共30期，已还25期，剩5期',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '平安普惠',
  'amount':'11570',
  'repaid':'1157 (用)<br/>1117 (借)',
  'remainAmount':'<b>9256 (每期1157，剩8期)</b><br/>还款日：每月12号',
  'status':'共12期，已还4期，剩8期',
  '60000remain':'',
  'totalRemainAmount': ''
},{
  'p2pName': '玖富万卡',
  'amount':'4300',
  'repaid':'487(借)<br/>487(借)',
  'remainAmount':'<b>4870 (每期487，剩10期)</b><br/>还款日：每月22号',
  'status':'共12期，已还2期，剩10期',
  '60000remain':'',
  'totalRemainAmount': ''
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
    spanMethod ({ columnIndex }) {
      if (columnIndex === 6 || columnIndex === 7) {
        return {
          rowspan: 11,
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

