<template>
    <div class="bg-login">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="auto" class="demo-ruleForm" hide-required-asterisk="false">
            <div class="login-title">欢迎使用账号管理系统</div>
            <el-form-item label="手机号" prop="phone" class="phone-line">
                <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="pw-line">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password auto-complete="off"></el-input>
            </el-form-item>
            <el-button type="primary" @click="login('loginForm')" class="two-button">登录</el-button>
            <el-button @click="resetForm('loginForm')" class="two-button">重置</el-button>
        </el-form>
        <router-link to="/register" class="change">点击注册</router-link>
    </div>
</template>

<script>
import service from '@/utils/request'
import { setToken } from '@/utils/auth'
export default {
    data() {
        return {
            loginForm: {
                phone: '',
                password: ''
            },
            loginRules: {
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
            if (!valid) {
                this.$message({
                        message: '提交失败!!!',
                        type: 'error',
                        center: true
                    });
                return false;
            }
            else {
                service.post('/login', this.loginForm).then((result) => {
                    console.log(result);
                    if (result.data.code === 1) {
                        setToken(result.data.data.jwt);
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            center: true
                        });
                        if (result.data.data.identity === 'admin') {
                            this.$router.push('/user');
                        }
                        else {
                            this.$router.push('/web');
                        }
                    }
                    else {
                        this.$message({
                            message: result.data.msg,
                            type: 'error',
                            center: true
                        });
                    }
                });
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style>
    .bg-login {
        width: 30%;
        height: 55%;
        margin: auto;
        text-align: center;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255,255,255,0.8);
        border-radius: 20px 20px 20px 20px;
        box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.7);
    }
    .grid-content {
        min-height: 36px;
        width: 1/3;
    }
    .login-title {
        color: #1d1e20;
        font-size: 2em;
        line-height: 3em;
    }
    .phone-line {
        width: 80%;
        transform: translate(10%,30%);
    }
    .pw-line {
        width: 80%;
        transform: translate(10%,90%);
    }
    .two-button {
        transform: translate(0,180%);
    }
    .bg-login .change {
        /* font-size: 1.1em; */
        position: absolute;
        right: 3%;
        bottom: 2%;
        color: blue;
    }
</style>