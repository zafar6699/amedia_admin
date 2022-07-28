<template>
    <div class="table-data">
        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">Seriallar</h4>
            </div>

            <div class="title-box-right flex">
                <div style="margin-right: 20px">
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
                <div class="export">
                    <nuxt-link :to="{ name: `serial-add` }">
                        <el-button size="medium" type="success">
                            <i class="el-icon-plus"></i> Qo'shish
                        </el-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="table" v-if="datas != null">
            <table>
                <thead>
                    <tr>
                        <th>Rasm</th>
                        <th>Serial nomi (uz)</th>
                        <th>Kategoriya</th>
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
                            <img class="user-img" :src="$cdn + item.image" />
                        </td>
                        <td style="max-width: 400px">{{ item.name.uz }}</td>
                        <td>
                            <p v-for="cat in item.category" :key="cat">
                                {{ cat.nameuz }}
                            </p>
                        </td>

                        <td>
                            <div class="table-actions">
                                <nuxt-link
                                    style="margin-right: 5px"
                                    :to="{
                                        name: `serial-seria-id`,
                                        params: { id: item._id },
                                        query: { name: item.name.uz },
                                    }"
                                >
                                    <el-button size="medium" type="warning">
                                        <i class="el-icon-video-camera"></i>
                                        Seria
                                    </el-button>
                                </nuxt-link>
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="Sliderga qo'shish"
                                    placement="top"
                                >
                                    <el-button
                                        @click="sliderAdd(item._id)"
                                        type="primary"
                                        icon="el-icon-picture"
                                        size="mini"
                                        plain
                                        class="edit"
                                    ></el-button>
                                </el-tooltip>
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
            datas: null,
            page: 1,
            length: 100,
            limit: 20,
            search: "",
        };
    },
    async mounted() {
        this.getData();
    },

    methods: {
        async sliderAdd(id) {
            await this.$axios
                .$post("slider/add", {
                    serial: id,
                })
                .then((res) => {
                    this.$router.push("/sliders");
                });
        },
        searchClick() {
            this.getData();
        },
        openModalEdit(id) {
            this.$router.push({ name: "serial-edit-id", params: { id: id } });
        },
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        async confirmDelete(id) {
            await this.$axios.$delete("/season/" + id).then((res) => {
                this.$message({
                    message: "Ma'lumot o'chirildi",
                    type: "success",
                });
            });
            this.getData();
        },
        async getData() {
            let data = await this.$axios.$post(
                `season/admin?page=${this.page}`,
                {
                    search: this.search,
                }
            );
            this.datas = data.data;
            this.length = data.count;
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
