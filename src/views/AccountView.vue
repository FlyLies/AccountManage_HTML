<template>
    <!-- <div> -->
        <el-container style="height: 100%; width: 100%; border: 1px soiled #FFFFFF">
            <el-header class="head">
                <span class="title">
                    账&emsp;号&emsp;管&emsp;理&emsp;系&emsp;统
                </span>
            </el-header>
            <el-container>
                <el-aside width="15%" style="height: 100%; margin: auto" class="bg-color">
                    <el-menu :default-openeds="['1']" default-active="/account" router="true">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>账号信息管理</template>
                            <el-menu-item index="/web">网站管理</el-menu-item>
                            <el-menu-item index="/account">账号管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
                            <el-menu-item index="2-1">个人信息管理</el-menu-item>
                            <el-menu-item index="2-2" @click="exit()">注销</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <!-- 网站账号查询 -->
                        <el-form :inline="true" :model="searchForm" class="demo-form-inline bg-color" style="width: 100%; border-radius: 20px 20px 0 0;">
                            <el-form-item label="网站账号" class="search-line">
                                <el-input v-model="searchForm.webAccount" placeholder="请输入网站账号"></el-input>
                            </el-form-item>
                            <el-form-item style="transform: translate(30%,25%)">
                                <el-button type="primary" @click="webAccountSearch()" icon="el-icon-search">搜索</el-button>
                            </el-form-item>
                            <el-button type="primary" @click="addAccountDialogVisible = true" style="transform: translate(-20%,29%); float: right" round>添加网站</el-button>
                        </el-form>
                        <!-- 添加账号对话框 -->
                        <el-dialog title="添加账号" :visible.sync="addAccountDialogVisible" center append-to-body width="30%">
                            <el-form :model="addAccountForm" :rules="accountRules" hide-required-asterisk=false>
                                <el-form-item label="网站账号" :label-width="formLabelWidth" prop="webAccount">
                                    <el-input v-model="addAccountForm.webAccount" autocomplete="off" placeholder="请输入网站账号"></el-input>
                                </el-form-item>
                                <el-form-item label="网站密码" :label-width="formLabelWidth" prop="webPassword">
                                    <el-input v-model="addAccountForm.webPassword" autocomplete="off" placeholder="请输入网站密码"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="addAccountDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addAccount()">提 交</el-button>
                            </div>
                        </el-dialog>
                        <!-- 网站列表 -->
                        <el-table :data="tableData" border="true" height="80%" style="width: 100%">
                            <el-table-column prop="aid" label="账号ID" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="webAccount" label="网站账号" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="webPassword" label="网站密码" header-align="center" align="center"></el-table-column>
                            <el-table-column label="操作" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="inputKeyDialogVisible = true">查看</el-button>
                                    <el-button type="info" size="small" @click="inputKeyDialogVisible2 = true">修改</el-button>
                                    <el-button type="danger" size="small" @click="inputKeyDialogVisible3 = true">删除</el-button>
                                    <!-- 输入密钥对话框-查看 -->
                                    <el-dialog title="密钥验证" :visible.sync="inputKeyDialogVisible" center append-to-body width="30%">
                                        <el-form :model="inputKeyForm" hide-required-asterisk=false>
                                            <el-form-item label="密钥" :label-width="formLabelWidth" prop="desKey">
                                                <el-input v-model="inputKeyForm.desKey" autocomplete="off" placeholder="请输入密钥"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="inputKeyDialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="checkKey('show', scope.row.aid)">提 交</el-button>
                                        </div>
                                    </el-dialog>
                                    <!-- 输入密钥对话框-修改 -->
                                    <el-dialog title="密钥验证" :visible.sync="inputKeyDialogVisible2" center append-to-body width="30%">
                                        <el-form :model="inputKeyForm" hide-required-asterisk=false>
                                            <el-form-item label="密钥" :label-width="formLabelWidth" prop="desKey">
                                                <el-input v-model="inputKeyForm.desKey" autocomplete="off" placeholder="请输入密钥"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="inputKeyDialogVisible2 = false">取 消</el-button>
                                            <el-button type="primary" @click="checkKey('modify', scope.row.aid)">提 交</el-button>
                                        </div>
                                    </el-dialog>
                                    <!-- 输入密钥对话框-删除 -->
                                    <el-dialog title="密钥验证" :visible.sync="inputKeyDialogVisible3" center append-to-body width="30%">
                                        <el-form :model="inputKeyForm" hide-required-asterisk=false>
                                            <el-form-item label="密钥" :label-width="formLabelWidth" prop="desKey">
                                                <el-input v-model="inputKeyForm.desKey" autocomplete="off" placeholder="请输入密钥"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="inputKeyDialogVisible3 = false">取 消</el-button>
                                            <el-button type="primary" @click="checkKey('delete', scope.row.aid)">提 交</el-button>
                                        </div>
                                    </el-dialog>
                                    <!-- 展示账号对话框 -->
                                    <el-dialog title="网络账号/密码" :visible.sync="showAccountDialogVisible" center append-to-body width="30%">
                                        <el-table :data="accountData" border="true">
                                            <el-table-column property="webAccount" label="网站账号" header-align="center" align="center"></el-table-column>
                                            <el-table-column property="webPassword" label="网站密码" header-align="center" align="center"></el-table-column>
                                        </el-table>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="showAccountDialogVisible = false">关 闭</el-button>
                                        </div>
                                    </el-dialog>
                                    <!-- 修改账号对话框 -->
                                    <el-dialog title="修改账号" :visible.sync="modifyAccountDialogVisible" center append-to-body width="30%">
                                        <el-form :model="modifyAccountForm" :rules="accountRules" hide-required-asterisk=false>
                                            <el-form-item label="网站账号" :label-width="formLabelWidth" prop="webAccount">
                                                <el-input v-model="modifyAccountForm.webAccount" autocomplete="off" placeholder="请输入网站账号"></el-input>
                                            </el-form-item>
                                            <el-form-item label="网址" :label-width="formLabelWidth" prop="webPassword">
                                                <el-input v-model="modifyAccountForm.webPassword" autocomplete="off" placeholder="请输入网站密码"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="modifyAccountDialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="modifyAccount(scope.row.aid)">提 交</el-button>
                                        </div>
                                    </el-dialog>
                                    <!-- 删除账号对话框 -->
                                    <el-dialog title="删除账号" :visible.sync="deleteAccountDialogVisible" width="30%" append-to-body center>
                                        <span>确定删除吗?</span>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="deleteAccountDialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="deleteAccount(scope.row.aid)">确 定</el-button>
                                        </span>
                                    </el-dialog>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="bg-color" style="color: Transparent">|</div>
                        <el-pagination background layout="total, prev, pager, next, jumper"
                        :total="total"
                        :current-page="pageNum"
                        :page-size="pageSize"
                        class="bg-color"
                        style="text-align: center; border-radius: 0 0 20px 20px;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        ></el-pagination>
                    </el-main>
                    <el-footer class="bg-color down">
                        <span class="bg-from">背景图来源：<el-link type="primary" href="https://www.pixiv.net/">pixiv</el-link><br>作者：<el-link type="primary" href="https://www.pixiv.net/users/9678597">Y_Y</el-link></span>
                        <span class="uid">UID:&emsp;{{uid}}</span>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    <!-- </div> -->
</template>

<script>
import service from '@/utils/request';
import { removeToken } from '@/utils/auth';

export default {
    data() {
        return {
            tableData: [],
            accountData: [],
            total: '',
            pageNum: 1,
            pageSize: 7,
            uid: '',
            searchForm: {
                webAccount: ''
            },
            addAccountForm: {
                webAccount: '',
                webPassword: ''
            },
            modifyAccountForm: {
                webAccount: '',
                webPassword: ''
            },
            accountRules: {
                webAccount: [
                    { required: true, message: '网站账号不能为空', trigger: 'blur' }
                ],
                webPassword: [
                    { required: true, message: '网站密码不能为空', trigger: 'blur' }
                ]
            },
            addAccountDialogVisible: false,
            modifyAccountDialogVisible: false,
            deleteAccountDialogVisible: false,
            inputKeyDialogVisible: false,
            inputKeyDialogVisible2: false,
            inputKeyDialogVisible3: false,
            showAccountDialogVisible: false
        }
    },
    methods: {
        webAccountSearch() {
            service.get("/account?wid="+this.$route.query.wid+"&webAccount="+this.searchForm.webAccount).then((result) => {
                this.tableData = result.data.data.rows;
                this.total = result.data.data.total;
            });
        },
        handleCurrentChange(value) {
            this.getAccount(value);
            this.pageNum = value;
            console.log("页码发生变化：" + value);
        },
        exit() {
            removeToken();
            this.$router.push('/login');
        },
        getAccount(pageNum) {
            service.get("/account?wid="+this.$route.query.wid+"&pageNum="+pageNum).then((result) => {
                this.tableData = result.data.data.rows;
                this.total = result.data.data.total;
            });
        },
        // inputKey(operation, aid) {
        //     inputKeyDialogVisible = true;
        // },
        checkKey(operation, value) {
            this.inputKeyDialogVisible = false;
            this.inputKeyDialogVisible2 = false;
            this.inputKeyDialogVisible3 = false;
            service.post("/account/key").then((result) => {
                if(result.data.code === 1) {
                    if(operation === 'show') {
                        this.showAccount(value);
                    }
                    if(operation === 'modify') {
                        this.showModifyAccountDialogVisible(value);
                    }
                    if(operation === 'delete') {
                        this.deleteAccountDialogVisible = true;
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
        },
        showAccount(aid) {
            this.showAccountDialogVisible = true;
            service.get("/account/"+aid).then((result) => {
                this.accountData = result.data.data;
            });
        },
        showModifyAccountDialogVisible(aid) {
            this.modifyAccountDialogVisible = true;
            service.get("/account/"+aid).then((result) => {
                this.$set(this.modifyAccountForm, 'webAccount', result.data.data.webAccount);
                this.$set(this.modifyAccountForm, 'webPassword', result.data.data.webPassword);
            });
        },
        modifyAccount(aid) {
            this.modifyAccountDialogVisible = false;
            service.put("/account/"+aid).then((result) => {
                if (result.data.code === 1) {
                        this.$message({
                        message: '修改成功',
                        type: 'success',
                        center: true
                    });
                }
                else {
                    this.$message({
                        message: '修改失败',
                        type: 'error',
                        center: true
                    });
                }
            });
        },
        deleteAccount(aid) {
            this.deleteAccountDialogVisible = false;
            service.delete("/account/"+aid).then((result) => {
                if (result.data.code === 1) {
                        this.$message({
                        message: '删除成功',
                        type: 'success',
                        center: true
                    });
                }
                else {
                    this.$message({
                        message: '删除失败',
                        type: 'error',
                        center: true
                    });
                }
            });
        },
        addAccount() {
            service.post("/account", {
                wid: this.$route.query.wid,
                webAccount: this.addAccountForm.webAccount,
                webPassword: this.addAccountForm.webPassword
            }).then((result) => {
                this.addAccountDialogVisible = false;
                if (result.data.code === 1) {
                        this.$message({
                        message: '添加成功',
                        type: 'success',
                        center: true
                    });
                }
                else {
                    this.$message({
                        message: '添加失败',
                        type: 'error',
                        center: true
                    });
                }
            });
        }
    },
    mounted() {
        // service.get("http://yapi.smart-xwork.cn/mock/244559/account").then((result) => {
        //     this.total = result.data.data.total;
        //     this.tableData = result.data.data.rows;
        // });
        service.get("/account?wid="+this.$route.query.wid).then((result) => {
            this.total = result.data.data.total;
            this.tableData = result.data.data.rows;
        });
    },
}
</script>

<style>
    .bg-color {
        background-color: rgba(255,255,255,0.8);
    }
    .head {
        background-color: rgba(0, 3, 54, 0.8);
        text-align: center;
        height: 10%;
        width: 100%;
        margin: auto;
    }
    .title {
        font-size: 2em;
        color: rgba(255,255,255,0.8);
        margin: auto;
        line-height: 200%;
        font-style: oblique;
    }
    .search-line {
        transform: translate(10%,25%);
    }
    .inline-block {
        display: inline-block;
    }
    .down {
        text-align: center;
        width: 97%;
        margin: auto;
        border-radius: 20px 20px 0 0;
    }
    .bg-from {
        line-height: 175%;
    }
    .uid {
        position: absolute;
        right: 1%;
        bottom: 1%;
        display: none;
    }
</style>