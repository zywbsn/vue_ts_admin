<template>
  <div>
    <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <!-- <el-form-item label="Approved by">
      <el-input v-model="listQuery.status" placeholder="Approved by" clearable />
    </el-form-item> -->
      <el-form-item label="是否接单">
        <el-select v-model="listQuery.status" placeholder="Activity zone" clearable>
          <el-option label="是" :value="1" />
          <el-option label="否" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="data.list" style="width: 100%">
    <el-table-column prop="create_by" label="创建人" width="180" />
    <el-table-column prop="" label="商品图标" width="180">
      <template #default="scope">
        <img :src="'http://localhost:9090/api' + scope.row.good_img" />
      </template>
    </el-table-column>
    <el-table-column prop="price" label="价格" />
    <el-table-column prop="receive_code" label="取货码" />
    <el-table-column prop="code" label="快递单行" />
    <el-table-column prop="status" label="接单状态" />
  </el-table>

  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted,ref } from "vue";
import { ListQueryInt,InitData } from "@/type/order/index";
import { getOrderList } from "@/request/order/index";
import {useRouter} from "vue-router";

const router = useRouter();

//请求参数
const listQuery = reactive<ListQueryInt>({
  page: 1, size: 10
});

//代取订单列表
// const list = ref<ListInt>([]);
const data = reactive(new InitData());

//搜索
const onSubmit = () => {
  listQuery.page = 1;
  getList();

};

//重置查询条件
const reset = () => {
  listQuery.page = 1;
  delete listQuery.status;
  getList();
};

//获取快递订单列表
const getList = () => {
  getOrderList(listQuery).then((response)=>{
    data.list = response.data.list;
    
  });
};

onMounted(() => { 
  getList();
});

</script>

<style></style>