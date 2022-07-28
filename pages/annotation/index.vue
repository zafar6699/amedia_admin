<template>
    <div class="table-data">
        <el-dialog
            title="
                    Annotatsiya qo'shish
                "
            v-if="editdata != null"
            :visible.sync="isEditModal"
        >
            <el-tabs type="card" @tab-click="handleClick">
                <el-tab-pane label="O'zbekcha">
                    <el-form :model="editdata" class="demo-ruleForm">
                        <div class="form">
                            <div class="col-12">
                                <el-form-item label="Nomi(uz)" prop="name">
                                    <el-input
                                        v-model="editdata.name.uz"
                                        placeholder="Nomi(uz)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-3">
                                <el-form-item
                                    label="Malumot(uz)"
                                    prop="description"
                                >
                                    <el-input
                                        type="textarea"
                                        v-model="editdata.description.uz"
                                        placeholder="Malumot(uz)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-12">
                                <el-form-item label="Video linki" prop="video">
                                    <el-input
                                        v-model="editdata.video"
                                        placeholder="Video linki"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Русский">
                    <el-form :model="editdata" class="demo-ruleForm">
                        <div class="form">
                            <div class="col-12">
                                <el-form-item label="Nomi(ru)" prop="name">
                                    <el-input
                                        v-model="editdata.name.ru"
                                        placeholder="Nomi(ru)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-3">
                                <el-form-item label="Malumot(ru)" prop="amount">
                                    <el-input
                                        type="textarea"
                                        v-model="editdata.description.ru"
                                        placeholder="Malumot(ru)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-12">
                                <el-form-item label="Video linki" prop="nameru">
                                    <el-input
                                        v-model="editdata.video"
                                        placeholder="Video linki"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

            <div class="title-box-top">
                <div class="title-top-left"></div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="update(editdata)"
                        >Saqlash</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="
                    Annotatsiya qo'shish
                "
            :visible.sync="isAddModal"
        >
            <el-tabs type="card" @tab-click="handleClick">
                <el-tab-pane label="O'zbekcha">
                    <el-form :model="category" class="demo-ruleForm">
                        <div class="form">
                            <div class="col-12">
                                <el-form-item label="Nomi(uz)" prop="name">
                                    <el-input
                                        v-model="category.name.uz"
                                        placeholder="Nomi(uz)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-3">
                                <el-form-item
                                    label="Malumot(uz)"
                                    prop="description"
                                >
                                    <el-input
                                        type="textarea"
                                        v-model="category.description.uz"
                                        placeholder="Malumot(uz)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-12">
                                <el-form-item label="Video linki" prop="video">
                                    <el-input
                                        v-model="category.video"
                                        placeholder="Video linki"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Русский">
                    <el-form :model="category" class="demo-ruleForm">
                        <div class="form">
                            <div class="col-12">
                                <el-form-item label="Nomi(ru)" prop="name">
                                    <el-input
                                        v-model="category.name.ru"
                                        placeholder="Nomi(ru)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-3">
                                <el-form-item label="Malumot(ru)" prop="amount">
                                    <el-input
                                        type="textarea"
                                        v-model="category.description.ru"
                                        placeholder="Malumot(ru)"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="col-12">
                                <el-form-item label="Video linki" prop="nameru">
                                    <el-input
                                        v-model="category.video"
                                        placeholder="Video linki"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

            <div class="title-box-top">
                <div class="title-top-left"></div>

                <div class="title-box-right flex">
                    <el-button type="success" @click="create(category)"
                        >Saqlash</el-button
                    >
                </div>
            </div>
        </el-dialog>

        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">Anotatsiyalar</h4>
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
        <div class="table" v-if="janrs != null">
            <table>
                <thead>
                    <tr>
                        <th>Annotatsiya nomi(uz)</th>
                        <th>Annotatsiya nomi(ru)</th>
                        <th>Yaratilgan sana</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style="border-bottom: 1px solid"
                        v-for="item in janrs"
                        :key="item"
                    >
                        <td>{{ item.name.uz }}</td>
                        <td>{{ item.name.ru }}</td>
                        <td>{{ item.createdAt.slice(0, 10) }}</td>
                        <td>
                            <div v-if="item.status" class="n">
                                <el-tag
                                    class="status"
                                    type="success"
                                    effect="dark"
                                    size="small"
                                    >Yoqilgan</el-tag
                                >
                            </div>
                            <div v-if="item.status == false" class="n">
                                <el-tag
                                    type="danger"
                                    class="status"
                                    effect="dark"
                                    size="small"
                                    >To`xtatilgan</el-tag
                                >
                            </div>
                        </td>
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
            category: {
                name: {
                    uz: "",
                    ru: "",
                },
                description: {
                    uz: "",
                    ru: "",
                },
                video: "",
                status: true,
            },
            rules: {
                name: [
                    {
                        min: 3,
                        message: "Maydon kamida 3ta belgi bo'lishi kerak",
                        trigger: "blur",
                    },
                    {
                        required: true,

                        message: "Maydon to'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
                amount: [
                    {
                        min: 3,
                        message: "Maydon nomi kamida 3ta belgi bo'lishi kerak",
                        trigger: "blur",
                    },
                    {
                        required: true,
                        message: "Maydon to'ldirilishi shart",
                        trigger: "blur",
                    },
                ],
            },
            editdata: null,
            isAddModal: false,
            isEditModal: false,
            janrs: null,
            page: 1,
            length: 100,
            limit: 20,
        };
    },
    async mounted() {
        this.getData();
    },

    methods: {
        openModalAdd() {
            this.isAddModal = true;
        },
        async openModalEdit(id) {
            this.isEditModal = true;
            let catEdit = await this.$axios.$get("/anotatsiya/" + id);
            this.editdata = catEdit.data;
            console.log("assaa", this.editdata);
        },
        async create() {
            let category = this.category;
            // await this.$axios.$post("/anotatsiya/add", category);

            await this.$axios
                .$post("anotatsiya/add", this.category)
                .then((res) => {
                    console.log(res);
                });
            this.isAddModal = false;
            console.log("true", this.category);
            this.getData();
        },
        async update() {
            this.editdata.status = true;
            let create = await this.$axios.$put(
                "/anotatsiya/" + this.editdata._id,
                this.editdata
            );
            this.isEditModal = false;
            this.getData();
            console.log("true");
        },
        async confirmDelete(id) {
            await this.$axios.$delete("/anotatsiya/" + id);
            this.getData();
        },
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        async getData() {
            let data = await this.$axios.$get(
                `anotatsiya/all?page=${this.page}`
            );

            this.janrs = data.data;

            this.length = data.count;
        },
    },
};
</script>

<style></style>
