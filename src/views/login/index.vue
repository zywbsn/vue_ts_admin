<template>
  <div style="width: 100%;min-height: 100vh; ">
    <div class="container">
      <div class="bg">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="form-box">
        <el-form ref="ruleFormRef" :model="loginForm" status-icon :rules="rules" class="demo-ruleForm">
          <el-form-item label="账号" prop="user_name">
            <el-input v-model="loginForm.user_name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password" style="margin-top: 30px;">
            <el-input v-model="loginForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button class="btn" @click="submitForm(ruleFormRef)">
              →
            </el-button>
  
          </el-form-item>
        </el-form>
      </div>
    </div>
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
        login(loginForm).then((response) => {
          localStorage.setItem("token", response.token);
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
  
  <style lang="scss">
  .container {
    width: 800px;
    height: 800px;
    margin: 0 auto;
    position: relative;
  
    .bg {
      position: absolute;
      width: 800px;
      height: 800px;
      top: 0;
      left: 0;
  
      @keyframes am1 {
        0% { transform: translateY(0);}
        100% { transform: translateY(-30px);}
      }
  
      span {
        background: #fff;
        position: absolute;
        top: 117px;
        left: 143px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        box-shadow: 1px 1px 50px #000;
      }
  
      span:nth-child(1) {
        top: 117px;
        left: 143px;
        width: 120px;
        height: 120px;
        background: purple;
        animation: am1 ease-in-out 3s infinite alternate;
      }
  
      span:nth-child(2) {
        top: 518px;
        left: 443px;
        width: 220px;
        height: 200px;
        background: orange;
        animation: am1 ease-in-out 4s infinite alternate-reverse;
      }
    span:nth-child(3) {
      top: 196px;
      left: 483px;
      width: 60px;
      height: 60px;
      background: cyan;
      animation: am1 ease-in-out 2s infinite alternate;
  
    }
    }
  
  
    .form-box {
      position: absolute;
      width: 360px;
      height: 480px;
      top: 160px;
      left: 220px;
      border-radius: 20px;
      color: #eee;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      justify-content: center;
      padding: 100px 0 0 0;
      backdrop-filter: blur(4px);
      box-shadow: inset 1px 1px 6px rgba(255, 255, 255, .3),
        2px 2px 15px rgba(0, 0, 0, .5);
        .el-form-item__label{
          color: #000;
        }
  
      .btn {
        border: none;
        width: 70px;
        height: 70px;
        line-height: 70px;
        border-radius: 50%;
        color: #837d7d;
        font-size: 36px;
        font-weight: bolder;
        cursor: pointer;
        background: rgba(255,255,255,.1);
        box-shadow: 0px 2px 10px #111;
        margin: 50px auto 0;
      }
  
      .el-input__wrapper {
        background-color: transparent;
  
        input {
          color: #000;
          background: transparent;
          outline: none;
          border: none;
        }
      }
    }
  }
  </style>
  