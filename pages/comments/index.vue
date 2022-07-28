<template>
    <div class="table-data">
        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">Muhokamalar</h4>
            </div>
        </div>
        <div class="table" v-if="janrs != null">
            <table>
                <thead>
                    <tr>
                        <th>Muhokama</th>
                        <th>Foydalanuvchi</th>
                        <th>Roli</th>
                        <th>Vaqti</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid" v-for="(item, index) in janrs" :key="index">
                        <td>{{ item.message }}</td>
                        <td>{{ item.user.name }}</td>

                        <td>
                            {{ item.user.role }}
                        </td>
                        <td>{{ item.date.slice(0, 10) }}</td>
                        <td>

                            <el-switch v-model="item.status" @change="changeStatus($event, item._id)">
                            </el-switch>
                            <!-- <div v-if="item.status == false" class="n">
                                <el-tag class="status" type="success" effect="dark" size="small">Yoqilgan</el-tag>
                            </div>
                            <div v-if="item.status == true" class="n">
                                <el-tag type="danger" class="status" effect="dark" size="small">To`xtatilgan</el-tag>
                            </div> -->
                        </td>
                        <td>
                            <div class="table-actions">
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
                    :current-page="page" @current-change="changePagination">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
        changeStatus(status, id) {
            console.log("sttaus", status)
            console.log("id", id)
            this.$axios.$put(`comment/${id}`, { status }).then(res => {
                if (res.success) {
                    this.getData();
                }
            })
        },
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        async getData() {
            let data = await this.$axios.$get(`comment/all?page=${this.page}`);

            this.janrs = data.data;

            this.length = data.count;
        },
    },
};
</script>

<style>
</style>
