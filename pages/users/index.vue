<template>
    <div class="table-data">
        <el-dialog
            title="
                    Foydalanuvchi rolini o'zgartirish
                "
            :visible.sync="isEditModal"
        >
            <el-form
                :model="Editdata"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
            >
                <div class="form">
                    <div class="col-12">
                        <el-form-item label=" Foydalanuvchi roli" prop="nameuz">
                            <el-select
                                v-model="value"
                                placeholder=" Foydalanuvchi roli"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    value-key="value"
                                    v-model="editUser.role"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <div class="title-box-top">
                <div class="title-top-left"></div>
                <div class="title-box-right flex">
                    <el-button type="success" @click="update(Editdata._id)"
                        >Saqlash</el-button
                    >
                </div>
            </div>
        </el-dialog>
        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">Foydalanuvchilar</h4>
            </div>

            <!-- <div class="title-box-right flex">
        <div class="export">
          <el-button size="medium" type="success" @click="openModalAdd">
            <i class="el-icon-plus"></i> Qo'shish</el-button
          >
        </div>
      </div> -->

            <div>
                <el-input
                    placeholder="Ism bo'yicha qidiirng"
                    class="input-with-select"
                    v-model="search"
                >
                    <el-button
                        @click="searchClick"
                        slot="append"
                        icon="el-icon-search"
                    ></el-button>
                </el-input>
            </div>
        </div>
        <div class="table" v-if="datas != null">
            <table>
                <thead>
                    <tr>
                        <th>Foydalanuvchi nomi</th>
                        <th>Email</th>
                        <th>Roli</th>
                        <th>Status</th>
                        <th>Balans</th>
                        <th>Vaqti</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style="border-bottom: 1px solid"
                        v-for="item in datas"
                        :key="item"
                    >
                        <td>
                            {{ item.name }}
                        </td>
                        <td>
                            {{ item.email }}
                        </td>
                        <td>
                            {{ item.role }}
                        </td>
                        <td>
                            <div v-if="item.status == 'user'" class="n">
                                <el-tag
                                    class="status"
                                    type="success"
                                    effect="dark"
                                    size="small"
                                    >Foydalanuvchi</el-tag
                                >
                            </div>
                            <div v-else class="n">
                                <el-tag
                                    type="warning"
                                    class="status"
                                    effect="dark"
                                    size="small"
                                    >VIP</el-tag
                                >
                            </div>
                        </td>
                        <td>
                            {{ item.balance }}
                        </td>
                        <td>
                            {{ item.createdAt.slice(0, 10) }}
                        </td>
                        <td>
                            <div class="table-actions">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="Rolini o'zgartirish"
                                    placement="top-start"
                                >
                                    <el-button>top-start</el-button>
                                    <el-button
                                        @click="openModalEdit(item)"
                                        type="primary"
                                        icon="el-icon-edit"
                                        size="mini"
                                        plain
                                        class="edit"
                                    ></el-button>
                                </el-tooltip>

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
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            options: [
                {
                    value: "admin",
                    label: "Admin",
                },
                {
                    value: "publisher",
                    label: "Ijrochi",
                },
                {
                    value: "user",
                    label: "User",
                },
            ],
            value: "",
            datas: null,
            isEditModal: false,
            page: 1,
            length: 100,
            limit: 20,
            editUser: {
                role: "",
            },
        };
    },
    async mounted() {
        this.getData();
    },

    methods: {
        searchClick() {
            this.page = 1;
            this.getData();
        },
        async openModalEdit(item) {
            this.editUser = item;

            this.isEditModal = true;
        },
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        async getData() {
            let data = await this.$axios.$post(`auth/all?page=${this.page}`, {
                search: this.search,
            });

            this.datas = data.data;
            console.log(this.datas);
            this.length = data.count;
        },
        async update() {
            let data = await this.$axios.$post(`auth?page=${this.page}`, {
                search: this.search,
            });

            this.datas = data.data;
            console.log(this.datas);
            this.length = data.count;
        },
        async confirmDelete(id) {
            let data = await this.$axios.$delete("auth/delete/" + id);
            this.getData();
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
