<template>
    <div>
    <el-table
            :data="tableData"
            border
            style="width:50%;margin-bottom: 20px">
        <el-table-column
                fixed
                prop="id"
                label="编号"
                width="150">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="150">
        </el-table-column>
        <el-table-column
                prop="author"
                label="作者"
                width="150">
        </el-table-column>
        <el-table-column
                prop="manager"
                label="操作">
            <template slot-scope="scope">
                <el-button @click="edit(scope.row)" type="button" size="small">修改</el-button>
                <el-button @click="deleteById(scope.row)" type="button" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
            background
            layout="prev, pager, next"
            page-size="6"
            :total="total"
    @current-change="page">
    </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            deleteById(row) {
                const _this = this;
                axios.delete('http://localhost:8181/book/deleteById/' + row.id).then(function () {
                    _this.$alert('书籍《' + row.name + '》删除成功！', '通知消息', {
                        confirmButtonText: '确定',
                        callback: action => {
                            //_this.$router.push('/pageOne');
                            //设置动态刷新
                            window.location.reload();
                        }
                    });
                })
            },
            edit(row) {
                this.$router.push({
                    path: '/pageThree',
                    query: {
                        id:row.id
                    }
                })
            },
            page(currentPage){
                const _this = this;
                axios.get('http://localhost:8181/book/findAll/'+currentPage+'/6').then(function (resp) {
                    //console.log(resp)
                    _this.tableData = resp.data.content,
                    _this.total = resp.data.totalElements
                })
            }
        },
        created(){
            const _this = this;
            axios.get('http://localhost:8181/book/findAll/1/6').then(function (resp) {
                //console.log(resp)
                _this.tableData = resp.data.content,
                _this.total = resp.data.totalElements
            })
        },
        data() {
            return {
                total: null,
                tableData: null
            }
        }
    }
</script>
