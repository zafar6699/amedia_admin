<template>
    <div class="table-data">
        <el-dialog
            title="
                    Seria o'zgartirish
                "
            :visible.sync="isEditModal"
        >
            <el-form
                :model="category"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
            >
                <div class="form" v-if="Editdata != null">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item label="Nomi (uz)" prop="name.uz">
                                <el-input v-model="Editdata.name.uz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item label="Nomi (ru)" prop="name.ru">
                                <el-input v-model="Editdata.name.ru"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item label="Video havola" prop="name.ru">
                                <el-input v-model="Editdata.video"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item
                                label="Video davomiyligi"
                                prop="name.ru"
                            >
                                <el-input v-model="Editdata.length"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <div class="grid-content"></div>
                            <el-form-item
                                label="Ko'chirish uchun havola"
                                prop="name.uz"
                            >
                                <el-input v-model="Editdata.url"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div class="title-box-top">
                <div class="title-top-left"></div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="update()"
                        >Saqlash</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="
                    Seria qo'shish
                "
            :visible.sync="isAddModal"
        >
            <el-form
                :model="category"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
            >
                <div class="form">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item label="Nomi (uz)" prop="name.uz">
                                <el-input v-model="seria.name.uz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item label="Nomi (ru)" prop="name.ru">
                                <el-input v-model="seria.name.ru"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item label="Video havola" prop="name.ru">
                                <el-input v-model="seria.video"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <div class="grid-content"></div>
                            <el-form-item
                                label="Video davomiyligi"
                                prop="name.ru"
                            >
                                <el-input v-model="seria.length"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <div class="grid-content"></div>
                            <el-form-item
                                label="Ko'chirish uchun havola"
                                prop="name.uz"
                            >
                                <el-input v-model="seria.url"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="Notification jo'natish">
                                <el-switch v-model="seria.isNot"> </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div class="title-box-top">
                <div class="title-top-left"></div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="create()"
                        >Saqlash</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <div class="title-box-top">
            <div class="title-top-left" v-if="datas != null">
                <h4 class="title-page">{{ $route.query.name }}</h4>
            </div>

            <div class="title-box-right flex">
                <div class="export">
                    <el-button
                        size="medium"
                        type="success"
                        @click="openModalAdd"
                    >
                        <i class="el-icon-plus"></i> Qo'shish
                    </el-button>
                </div>
            </div>
        </div>
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>Seria nomi (uz)</th>
                        <th>Davomiyligi</th>
                        <th>Yaratilgan sana</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style="border-bottom: 1px solid"
                        v-for="item in datas"
                        :key="item"
                    >
                        <td>{{ item.name.uz }}</td>

                        <td>{{ item.length }}</td>
                        <td>{{ item.date.slice(0, 10) }}</td>
                        <td>
                            <div class="table-actions">
                                <el-button
                                    @click="openModalEdit(item._id)"
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    plain
                                    class="edit"
                                ></el-button>

                                <el-popconfirm
                                    title="Ma`lumotni o'chirmoqchimisiz?"
                                    confirm-button-text="Ha"
                                    cancel-button-text="Yo'q"
                                    cancel-button-type="danger"
                                    @confirm="confirmDelete(item._id)"
                                >
                                    <el-button
                                        slot="reference"
                                        type="danger"
                                        icon="el-icon-delete"
                                        size="mini"
                                        plain
                                    ></el-button>
                                </el-popconfirm>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="length"
                    :page-size="limit"
                    :current-page="page"
                    @current-change="changePagination"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            seria: {
                name: {
                    uz: "",
                    ru: "",
                },
                video: "",
                season: "",
                url: "",
                length: "",
                date: "",
                isNot: false,
            },
            Editdata: null,
            isAddModal: false,
            isEditModal: false,
            datas: null,
            page: 1,
            length: 100,
            limit: 10,
        };
    },
    async mounted() {
        this.getData();
    },

    methods: {
        openModalAdd(id) {
            this.isAddModal = true;
        },
        async openModalEdit(id) {
            this.isEditModal = true;
            let ed = await this.$axios.$get("/season/seriya/one/" + id);
            this.Editdata = ed.data;
            console.log("edittt", this.Editdata);
        },
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        update() {
            this.$axios
                .$put("/season/seriya/" + this.Editdata._id, this.Editdata)
                .then((res) => {
                    this.$message({
                        message: "O'zgartirildi",
                        type: "success",
                        showClose: true,
                    });
                    this.isEditModal = false;
                    this.getData();

                    this.$router.push({
                        name: "serial-seria-id",
                        params: { id: this.$route.params.id },
                    });
                });
        },
        create() {
            let d = new Date();
            this.seria.date = d.toISOString();
            this.seria.season = this.$route.params.id;
            this.$axios.$post("/season/seriya/add", this.seria).then((res) => {
                this.$message({
                    message: "Qo'shildi",
                    type: "success",
                    showClose: true,
                });

                this.isAddModal = false;
                this.seria.name.uz = "";
                this.seria.name.ru = "";
                this.seria.video = "";
                this.seria.season = "";
                this.seria.url = "";
                this.seria.length = "";
                this.seria.date = "";
                this.seria.isNot = false;

                this.getData();

                this.$router.push({
                    name: "serial-seria-id",
                    params: { id: this.$route.params.id },
                });
            });
        },
        async confirmDelete(id) {
            await this.$axios.$delete("/season/seriya/" + id).then((res) => {
                this.$message({
                    message: "Ma'lumot o'chirildi",
                    type: "success",
                });
            });
            this.getData();
        },
        async getData() {
            let data = await this.$axios.$get(
                `season/seriya/${this.$route.params.id}?page=${this.page}`
            );
            this.datas = data.data;
            this.length = data.count;
            console.log("xaxa", this.datas);
        },
    },
};
</script>

<style>
.user-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
