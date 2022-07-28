<template>
    <div class="table-data">
        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">Sliders</h4>
            </div>

            <div class="title-box-right flex">
                <div class="export">
                    <el-button
                        size="medium"
                        type="success"
                        @click="openModalAdd"
                    >
                        <i class="el-icon-plus"></i> Qo'shish</el-button
                    >
                </div>
            </div>
        </div>
        <div class="table" v-if="datas != null">
            <table>
                <thead>
                    <tr>
                        <th>Rasm</th>
                        <th>Mahsulot nomi</th>
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
                            <img
                                class="user-img"
                                :src="$cdn + item.serial.image"
                            />
                        </td>
                        <td>
                            {{ item.serial.name.uz }}
                        </td>

                        <td>
                            <div class="table-actions">
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
            datas: null,
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
            this.$router.push("/serial");
        },
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        async getData() {
            let data = await this.$axios.$get(`slider/admin`);
            this.datas = data.data;
            this.length = data.count;
        },
        async confirmDelete(id) {
            let create = await this.$axios.$delete("slider/" + id);
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
