<template>
  <div class="page" id="Rebirth">
    <h2>每天进步一点点</h2>
    <m-show-table-data :data="tableData" :dictionary="dictionary" :hasIndex="false"/>
  </div>
</template>

<script>
import MShowTableData from '../../components/MShowTableData'
const dictionary = [
  'p2pName=网贷名称',
  'amount=待还金额（元）',
  'repaid=已还金额（元）',
  'status=状态',
  'remain=卖车60000剩余（元）',
]
const tableData = [{
  'p2pName': '微现金',
  'amount':'1006.3',
  'repaid':'1006.3',
  'status':'结清',
  'remain':'58993.7',
},{
  'p2pName': '钱包借',
  'amount':'750 + 逾期费150',
  'repaid':'750（私发客服）',
  'status':'私发客服，等待客服操作还款',
  'remain':'58243.7',
},{
  'p2pName': '贷上钱',
  'amount':'2686',
  'repaid':'2686',
  'status':'结清',
  'remain':'55557.7',
},{
  'p2pName': '我是校花',
  'amount':'2489',
  'repaid':'2489',
  'status':'结清',
  'remain':'53068.7',
},{
  'p2pName': '捷信',
  'amount':'7500',
  'repaid':'第24期 xxxx',
  'status':'已还24期，剩6期',
  'remain':'',
},{
  'p2pName': '平安信用卡',
  'amount':'10038',
  'repaid':'第xx期 1157<br/>第xx期 1539<br/>',
  'status':'已还xx期，剩xx期',
  'remain':'',
},{
  'p2pName': '车贷',
  'amount':'46000',
  'repaid':'',
  'status':'待还款',
  'remain':'',
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
  }
}
</script>

<style lang="less">
.page {
  padding: 20px;
}
</style>

