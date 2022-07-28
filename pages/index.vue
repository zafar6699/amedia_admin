<template>
    <div>
        <div class="admin" v-if="tab != null">
            <div class="cards flex">
                <div class="card c1">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ tab.users }}</h1>
                            <span>Foydalanuvchilar</span>
                        </div>
                        <div class="icon">
                            <span class="el-icon-user-solid"></span>
                        </div>
                    </div>
                </div>
                <div class="card c2">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ tab.kino }}</h1>
                            <span>Kinolar</span>
                        </div>
                        <div class="icon">
                            <span class="el-icon-video-camera"></span>
                        </div>
                    </div>
                </div>
                <div class="card c3">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ tab.season }}</h1>
                            <span>Seriallar</span>
                        </div>
                        <div class="icon">
                            <span class="el-icon-film"></span>
                        </div>
                    </div>
                </div>
                <div class="card c4">
                    <div class="top flex">
                        <div class="stat">
                            <h1>{{ tab.member }}</h1>
                            <span>Hodimlar</span>
                        </div>
                        <div class="icon">
                            <span class="el-icon-user"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-data">
            <div class="title-box-top">
                <div class="title-top-left">
                    <h4 class="title-page">So`ngi foydalanuvchilar</h4>
                </div>

                <div class="title-box-right flex"></div>
            </div>
            <div class="table">
                <table v-if="user != null">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>F.I.O</th>
                            <th>Email</th>
                            <th>Sanasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            style="border-bottom: 1px solid"
                            v-for="(item, index) in user"
                            :key="item"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>
                                {{ item.name }}
                            </td>
                            <td>
                                {{ item.email }}
                            </td>
                            <td>
                                {{ item.createdAt.slice(0, 10) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
            user: null,
        };
    },
    async mounted() {
        const dat = await this.$axios.$get("/home/dashboard");
        this.tab = dat.data;
        this.user = dat.data.user;
        console.log(this.user);
    },
};
</script>

<style lang="scss" scoped>
.table-data {
    background: #fff;
    padding: 20px;
    box-shadow: 0 4px 10px hsl(0deg 0% 92% / 30%);
    border-radius: 10px;
}
.title-page {
    font-size: 22px;
    margin-bottom: 0;
    color: #333;
}

.admin {
    margin-bottom: 20px;
    .info {
        margin-bottom: 20px;
    }
    .card {
        border-radius: 5px;
        padding: 15px;
        width: calc((100% - 80px) / 4);
        .top {
            .stat {
                h1 {
                    margin: 0 !important;
                    color: #fff;
                    font-size: 38px;
                }
                span {
                    color: #fff;
                }
            }
            .icon {
                // padding-right: 15px;
                span {
                    color: #fff;
                    font-size: 70px;
                }
            }
        }
    }
    .c1 {
        background-color: #00c0ef !important;
    }
    .c2 {
        background-color: #00a65a !important;
    }
    .c3 {
        background-color: #f39c12 !important;
    }
    .c4 {
        background-color: #dd4b39 !important;
    }
}
</style>
