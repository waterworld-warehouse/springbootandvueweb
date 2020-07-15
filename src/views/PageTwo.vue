<template>
    <div>
        <el-form
               style="width: 60%;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="书籍名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="书籍作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    author:""
                },
                rules: {
                    name: [
                        { required: true, message: '请输入书籍名称', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '请输入作者名称', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //alert('校验通过！');
                        axios.post('http://localhost:8181/book/save',this.ruleForm).then(function (resp) {
                            //console.log(resp);
                            if(resp.data == 'success'){
                                _this.$alert('书籍《'+_this.ruleForm.name+'》添加成功！', '通知消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/pageOne');
                                    }
                                });

                            }
                        })
                    }else{
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>
