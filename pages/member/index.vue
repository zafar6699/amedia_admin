<template>
    <div class="table-data">
        <el-dialog title="
                    Ishtirokchi qo'shish
                " :visible.sync="isAddModal">
            <el-form :model="category" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <div class="form">
                    <div class="col-12">
                        <el-form-item label="Ishtirokchi FIO" prop="nameuz">
                            <el-input v-model="member.name" placeholder="Ishtirokchi FIO"></el-input>
                        </el-form-item>
                    </div>
                    <div class="col-3">
                        <el-form-item label="Ishtirokchi rasmi" prop="nameru">
                            <el-col :span="8">
                                <label for="image2" class="upload-button">
                                    <input @change="changeImage($event)" type="file" id="image2" />
                                    <img :src="$cdn + member.image" onerror="this.style.display='none'"
                                        onload="this.style.display=''" />
                                    <i class="el-icon-picture-outline img-icon"></i>

                                    <div class="opacity">
                                        <i class="el-icon-upload2 upload-icon"></i>
                                    </div>
                                </label>
                            </el-col>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div class="title-box-top">
                <div class="title-top-left"></div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="create()">Saqlash</el-button>
                </div>
            </div>
        </el-dialog>
        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">Hodimlar</h4>
            </div>

            <div class="title-box-right flex">
                <div class="export">
                    <el-button size="medium" type="success" @click="openModalAdd">
                        <i class="el-icon-plus"></i> Qo'shish
                    </el-button>
                </div>
            </div>
        </div>
        <div class="table" v-if="datas != null">
            <table>
                <thead>
                    <tr>
                        <th>Rasm</th>
                        <th>F.I.O</th>
                        <th>Yaratilgan sana</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid" v-for="item in datas" :key="item">
                        <td>
                            <img class="user-img" :src="$cdn + item.image" />
                        </td>
                        <td>
                            <div class="name"></div>
                            {{ item.name }}
                        </td>
                        <td>
                            <div class="name"></div>
                            {{ item.createdAt.slice(0, 10) }}
                        </td>
                        <td>
                            <div class="table-actions">
                                <el-button @click="openModalEdit(item._id)" type="primary" icon="el-icon-edit"
                                    size="mini" plain class="edit"></el-button>

                                <el-popconfirm title="Ma`lumotni o'chirmoqchimisiz?" confirm-button-text="Ha"
                                    cancel-button-text="Yo'q" cancel-button-type="danger"
                                    @confirm="confirmDelete(item._id)">
                                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" plain>
                                    </el-button>
                                </el-popconfirm>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :total="length" :page-size="limit"
                    :current-page="page" @current-change="changePagination"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            member: {
                image: "",
                name: ""
            },
            isAddModal: false,
            datas: null,
            page: 1,
            length: 100,
            limit: 20
        };
    },
    async mounted() {
        this.getData();
    },

    methods: {
        openModalAdd() {
            this.isAddModal = true;
        },

        async changeImage(event) {
            let fd = new FormData();
            fd.append("image", event.target.files[0]);

            this.$axios({
                url: "file/create",
                method: "POST",
                data: fd
            }).then(res => {
                this.member.image = res.data.data.path;
            });
        },
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        async confirmDelete(id) {
            await this.$axios.$delete("/member/" + id).then(res => {
                this.$message({
                    message: "Ma'lumot o'chirildi",
                    type: "success",
                });
            });
            this.getData();
        },
        create() {
            this.$axios.$post("/member", this.member).then(res => {
                this.$message({
                    message: "Qo'shildi",
                    type: "success",
                    showClose: true
                });
                this.isAddModal = false
                this.getData();
            });
        },
        async getData() {
            let data = await this.$axios.$get(`member?page=${this.page}`);
            this.datas = data.data;
            console.log(this.datas);
            this.length = data.count;
        }
    }
};
</script>

<style>
.user-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
