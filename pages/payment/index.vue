<template>
    <div class="table-data">
        <div class="title-box-top">
            <div class="title-top-left">
                <h4 class="title-page">To`lovlar</h4>
            </div>
        </div>
        <div class="table" v-if="janrs != null">
            <table>
                <thead>
                    <tr>
                        <th>Foydalanuvchi nomi</th>
                        <th>Summa</th>
                        <th>To`lov turi</th>
                        <th>Vaqti</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style="border-bottom: 1px solid"
                        v-for="item in janrs"
                        :key="item"
                    >
                        <td>{{ item.driver.name }}</td>
                        <td>
                            {{ item.amount }}
                        </td>
                        <td>{{ item.system }}</td>
                        <td>{{ item.createdAt.slice(0, 10) }}</td>
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
        changePagination(page) {
            this.page = page;

            this.getData();
        },
        async getData() {
            let data = await this.$axios.$get(`pay/paylist?page=${this.page}`);

            this.janrs = data.data;

            this.length = data.count;
        },
    },
};
</script>

<style></style>
