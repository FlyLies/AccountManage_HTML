<template>
    <!-- <div class="bg-img"> -->
        <el-container style="height: 100%; width: 100%; border: 1px soiled #FFFFFF">
            <el-header class="head">
                <span class="title">
                    账&emsp;号&emsp;管&emsp;理&emsp;系&emsp;统
                </span>
            </el-header>
            <el-container>
                <el-aside width="15%" style="height: 100%; margin: auto" class="bg-color">
                    <el-menu :default-openeds="['1']" default-active="/web" router="true">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>账号信息管理</template>
                            <el-menu-item index="/web">网站管理</el-menu-item>
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
                        <!-- 网站名查询 -->
                        <el-form :inline="true" :model="searchForm" class="demo-form-inline bg-color" style="width: 100%; border-radius: 20px 20px 0 0;">
                            <el-form-item label="网站名" class="search-line">
                                <el-input v-model="searchForm.webName" placeholder="请输入网站名"></el-input>
                            </el-form-item>
                            <el-form-item style="transform: translate(30%,25%)">
                                <el-button type="primary" @click="webNameSearch()" icon="el-icon-search">搜索</el-button>
                            </el-form-item>
                            <el-button type="primary" @click="addWebDialogVisible = true" style="transform: translate(-20%,29%); float: right" round>添加网站</el-button>
                        </el-form>
                        <!-- 添加账号对话框 -->
                        <el-dialog title="添加网站" :visible.sync="addWebDialogVisible" center append-to-body width="30%" @close="resetForm('addWebForm')">
                            <el-form :model="addWebForm" :rules="webRules" hide-required-asterisk=false ref="addWebForm">
                                <el-form-item label="网站名" :label-width="formLabelWidth" prop="webName">
                                    <el-input v-model="addWebForm.webName" autocomplete="off" placeholder="请输入网站名"></el-input>
                                </el-form-item>
                                <el-form-item label="网址" :label-width="formLabelWidth" prop="web">
                                    <el-input v-model="addWebForm.web" autocomplete="off" placeholder="请输入网址"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="addWebDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addWeb()">提 交</el-button>
                            </div>
                        </el-dialog>
                        <!-- 网站列表 -->
                        <el-table :data="tableData" border="true" height="80%" style="width: 100%">
                            <el-table-column prop="wid" label="网站ID" header-align="center" align="center"></el-table-column>
                            <el-table-column prop="webName" label="网站名" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-link v-if="scope.row.web != null" type="primary" :href="scope.row.web" target="_blank">{{scope.row.webName}}</el-link>
                                    <span v-else>{{scope.row.webName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="showAccount(scope.row.wid)">账号</el-button>
                                    <el-button type="info" size="small" @click="showModifyWebDialogVisible(scope.row)">修改</el-button>
                                    <el-button type="danger" size="small" @click="deleteWebDialogVisible = true">删除</el-button>
                                    <!-- 修改网站对话框 -->
                                    <el-dialog title="修改网站" :visible.sync="modifyWebDialogVisible" center append-to-body width="30%">
                                        <el-form :model="modifyWebForm" :rules="webRules" hide-required-asterisk=false>
                                            <el-form-item label="网站名" :label-width="formLabelWidth" prop="webName">
                                                <el-input v-model="modifyWebForm.webName" autocomplete="off" placeholder="请输入网站名"></el-input>
                                            </el-form-item>
                                            <el-form-item label="网址" :label-width="formLabelWidth" prop="web">
                                                <el-input v-model="modifyWebForm.web" autocomplete="off" placeholder="请输入网址"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="modifyWebDialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="modifyWeb(scope.row.wid)">提 交</el-button>
                                        </div>
                                    </el-dialog>
                                    <!-- 删除网站对话框 -->
                                    <el-dialog title="删除网站" :visible.sync="deleteWebDialogVisible" width="30%" append-to-body center>
                                        <span>确定删除吗?</span>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="deleteWebDialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="deleteWeb(scope.row.wid)">确 定</el-button>
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
                        @size-change="handleSizeChange()"
                        @current-change="handleCurrentChange(this.searchForm.webName, pageNum)"
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
            total: '',
            pageNum: 1,
            pageSize: 7,
            uid: '',
            searchForm: {
                webName: ''
            },
            addWebForm: {
                webName: '',
                web: ''
            },
            modifyWebForm: {
                webName: '',
                web: ''
            },
            webRules: {
                webName: [
                    { required: true, message: '网站名不能为空', trigger: 'blur' }
                ]
            },
            addWebDialogVisible: false,
            modifyWebDialogVisible: false,
            deleteWebDialogVisible: false,
        }
    },
    methods: {
        webNameSearch() {
            service.get("/web?webName="+this.searchForm.webName).then((result) => {
                this.tableData = result.data.data.rows;
                this.total = result.data.data.total;
            });
        },
        handleSizeChange(value) {
            alert("每页记录发生变化：" + value);
        },
        handleCurrentChange(webName, pageNum) {
            this.pageNum = pageNum;
            service.get("/web?webName="+webName+"&pageNum="+pageNum).then((result) => {
                this.tableData = result.data.data.rows;
                this.total = result.data.data.total;
            });
            console.log("页码发生变化：" + pageNum);
        },
        exit() {
            removeToken();
            this.$router.push('/login');
        },
        showAccount(wid) {
            this.$router.push({ path: '/account', query: { wid: wid } })
        },
        showModifyWebDialogVisible(row) {
            this.modifyWebDialogVisible = true;
            this.$set(this.modifyWebForm, 'webName', row.webName);
            this.$set(this.modifyWebForm, 'web', row.web);
        },
        modifyWeb(wid) {
            this.modifyWebDialogVisible = false;
            service.put("/web/"+wid).then((result) => {
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
            service.get("/web").then((result) => {
                this.total = result.data.data.total;
                this.tableData = result.data.data.rows;
            });
        },
        deleteWeb(wid) {
            this.deleteWebDialogVisible = false;
            service.delete("/web/"+wid).then((result) => {
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
            service.get("/web").then((result) => {
                this.total = result.data.data.total;
                this.tableData = result.data.data.rows;
            });
        },
        addWeb() {
            service.post("/web", this.addWebForm).then((result) => {
                this.addWebDialogVisible = false;
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
            service.get("/web").then((result) => {
                this.total = result.data.data.total;
                this.tableData = result.data.data.rows;
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    mounted() {
        service.get("http://yapi.smart-xwork.cn/mock/244559/web").then((result) => {
            this.total = result.data.data.total;
            this.tableData = result.data.data.rows;
        });
        // service.get("/web").then((result) => {
        //     this.total = result.data.data.total;
        //     this.tableData = result.data.data.rows;
        // });
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