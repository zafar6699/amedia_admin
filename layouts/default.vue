<template>
    <div>
        <Navbar />
        <div class="admin-content">
            <Nuxt />
        </div>
        <div v-loading.fullscreen.lock="isLoading">></div>
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
    components: { Navbar },
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        },
    },
    mounted() {
        // const loading = this.$loading({
        //     lock: true,
        //     text: "Yuklanmoqda",
        //     spinner: "el-icon-loading",
        //     background: "rgba(0, 0, 0, 0.7)",
        // });
        // if (!this.isLoading) {
        //     loading.close();
        // }
    },
};
</script>

<style lang="scss" scoped>
div.admin-content {
    margin-left: 250px;
    margin-top: 72px;
    padding: 20px 20px;
    min-height: calc(100vh - 72px);
}
</style>
