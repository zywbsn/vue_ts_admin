<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img style="width:50px;height:50px;" src="@/assets/logo.png" />
          </el-col>
          <el-col :span="16">
            <span>vue + ts 后台管理系统</span>
          </el-col>
          <el-col :span="4">
            <span>头像</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            :default-active="active" text-color="#fff" router>
            <div v-for="item in routerList" :key="item.path">
              <div v-if="item.children">
                <el-sub-menu>
                  <template #title>{{ item.meta!.title }}</template>

                  <el-menu-item v-for="i in item.children" :index="i.path">
                    {{ i.meta!.title }}
                  </el-menu-item>
                </el-sub-menu>
              </div>

              <el-menu-item v-else :index="item.path">
                <span>{{ item.meta!.title }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from "vue-router";

const active = ref('');

const router = useRouter();
const route = useRoute();
const routerList: any = ref([]);

onMounted(() => {
  let routes = router.options.routes.filter((item) => {
    return item.name == "layout";
  });




  routes[0].children?.forEach((item) => {
    if (item.children) {
      item.children = item.children.filter((val) => val.meta?.isShow);
    }
    routerList.value.push(item);
  });

  active.value = route.path;

});
</script>

<style>
.el-menu-vertical-demo {
  height: calc(100vh - 60px);
}

.el-header {
  background-color: #ccc;
  height: 60px;

  .el-row {
    display: flex;
    align-items: center;

    .el-col {
      text-align: center;
    }
  }
}
</style>
