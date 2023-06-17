<template>
    <div class="bg-register">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm" hide-required-asterisk=false>
            <div class="login-title">欢迎使用账号管理系统</div>
            <el-form-item label="用户名" prop="username" class="line">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" class="line">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="line">
                <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="againPassword" class="line">
                <el-input type="password" v-model="ruleForm.againPassword" placeholder="请再次输入密码" show-password auto-complete="off"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="button-line">注册</el-button>
            <el-button @click="resetForm('ruleForm')" class="button-line">重置</el-button>
        </el-form>
        <router-link to="/login" class="change">点击登录</router-link>
    </div>
</template>

<script>
export default {
    data() {
        var checkPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('确认密码不能为空'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                phone: '',
                password: '',
                againPassword: ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 1, max: 12, message: '用户名字数过长', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)(?![a-zA-Z0-9]+$)(?![a-zA-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9\\W_!@#$%^&*`~()-+=]+$)(?![0-9A-Z\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,18}$/, message: '密码格式不正确', trigger: 'blur' }
                ],
                againPassword: [
                    { validator: checkPass, trigger: 'blur' },
                    { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)(?![a-zA-Z0-9]+$)(?![a-zA-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9\\W_!@#$%^&*`~()-+=]+$)(?![0-9A-Z\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,18}$/, message: '密码格式不正确', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log('error submit!!');
            return false;
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
    .bg-register {
        width: 30%;
        height: 60%;
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
    .line {
        width: 80%;
        transform: translate(10%,10%);
    }
    .button-line {
        transform: translate(0,50%);
    }
    .bg-register .change {
        /* font-size: 1.1em; */
        position: absolute;
        right: 3%;
        bottom: 2%;
        color: blue;
    }
</style>