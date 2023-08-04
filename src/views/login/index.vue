<template>
  <div>
    <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="账号" prop="user_name">
        <el-input v-model="loginForm.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Submit
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">
          Reset
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from "@/request/login";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const ruleFormRef = ref<FormInstance>()

interface LoginInt {
  user_name: string,
  password: string
}

//登陆参数
const loginForm: LoginInt = reactive({
  user_name: '',
  password: '',
});


const rules = reactive<FormRules<typeof loginForm>>({
  user_name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3-5 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3-5 个字符', trigger: 'blur' }
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login(loginForm).then((respence) => {
        localStorage.setItem("token", respence.token);
        router.push('/home');
      }).catch((error) => {
        console.log(error);
        ElMessage.error('登陆失败');
      });
    } else {
      ElMessage.error('请输入账号密码');
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  loginForm.password = "";
  loginForm.user_name = "";
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped></style>
